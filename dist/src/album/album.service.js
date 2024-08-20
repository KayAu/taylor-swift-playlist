"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_validator_1 = require("../utils/schema.validator");
const songs_schema_1 = require("../schema/songs.schema");
let AlbumService = class AlbumService {
    constructor(songModel) {
        this.songModel = songModel;
    }
    async getAllAlbums() {
        try {
            const albums = await this.songModel.aggregate([
                {
                    $group: {
                        _id: { Album: "$Album", Year: "$Year" },
                        Album: { $first: "$Album" },
                        Year: { $first: "$Year" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        Album: 1,
                        Year: 1
                    }
                },
                {
                    $sort: { Year: -1 }
                }
            ]).exec();
            return albums;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getYearlyProducedAlbums() {
        try {
            const albunms = await this.songModel.aggregate([
                {
                    $group: {
                        _id: { Year: "$Year", Album: "$Album" },
                    },
                },
                {
                    $group: {
                        _id: "$_id.Year",
                        TotalAlbums: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        Year: "$_id",
                        TotalAlbums: 1,
                    },
                },
                {
                    $sort: { Year: 1 },
                },
            ]);
            return albunms;
        }
        catch (err) {
            console.error('Error fetching unique albums per year:', err);
            throw err;
        }
    }
    async getAlbumByYear(year) {
        try {
            const albums = await this.songModel
                .distinct('Album', { Year: year })
                .exec();
            return albums.sort();
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async findAlbum(searchText) {
        try {
            const regex = new RegExp(searchText, 'i');
            const albumns = await this.songModel.aggregate([
                {
                    $match: {
                        Album: regex
                    }
                },
                {
                    $group: {
                        _id: { Album: "$Album", Year: "$Year" },
                        Album: { $first: "$Album" },
                        Song: { $first: "$Song" },
                        Year: { $first: "$Year" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        Album: 1,
                        Song: 1,
                        Year: 1
                    }
                },
                {
                    $sort: { Year: -1 }
                }
            ]);
            return albumns;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getMostPopular(month, limit) {
        try {
            if (month) {
                if (!(0, schema_validator_1.checkFieldExists)(songs_schema_1.SongSchema, `Plays${month}`))
                    return [];
            }
            const monthField = `$Plays${month}`;
            const albums = await this.songModel.aggregate([
                {
                    $group: {
                        _id: { Album: "$Album", Year: "$Year" },
                        Album: { $first: "$Album" },
                        Year: { $first: "$Year" },
                        TotalPlays: month === '' ? { $sum: { $add: ['$PlaysJune', '$PlaysJuly', '$PlaysAugust'] } } : { $sum: monthField }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        Album: 1,
                        Year: 1,
                        Month: month === '' ? 'All months' : month,
                        TotalPlays: 1
                    }
                },
                {
                    $sort: { TotalPlays: -1 },
                },
                {
                    $limit: Number(limit),
                },
            ]);
            return albums;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
};
exports.AlbumService = AlbumService;
exports.AlbumService = AlbumService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Song')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AlbumService);
//# sourceMappingURL=album.service.js.map