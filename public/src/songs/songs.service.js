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
exports.SongsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const songs_schema_1 = require("../schema/songs.schema");
let SongsService = class SongsService {
    constructor(songModel) {
        this.songModel = songModel;
    }
    async getAllSongs(searchText, sortField, ascOrder) {
        const regex = new RegExp(searchText, 'i');
        const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Song', regex);
        return songs;
    }
    async getSongsByYear(year, sortField, ascOrder) {
        try {
            const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Year', year);
            return songs;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getSongsByAlbum(album, sortField, ascOrder) {
        try {
            const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Album', album);
            return songs;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getMostPopular(month, limit) {
        try {
            if (!this.checkFieldExists(songs_schema_1.SongSchema, `Plays${month}`))
                return [];
            const albums = await this.songModel.aggregate([
                {
                    $addFields: {
                        Month: !month ? 'All Months' : month,
                        TotalPlays: !month ? { $add: ['$PlaysJune', '$PlaysJuly', '$PlaysAugust'] } : `$Plays${month}`
                    }
                },
                {
                    $project: {
                        _id: 0,
                        Song: 1,
                        Writers: 1,
                        Album: 1,
                        Year: 1,
                        Month: 1,
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
    async getSongsByWriter(writer, sortField, ascOrder) {
        try {
            const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Writers', writer);
            return songs;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
    }
    async getMonthlySummary(month) {
        const monthField = `Plays${month}`;
        if (!this.checkFieldExists(songs_schema_1.SongSchema, `Plays${month}`))
            return [];
        const pipeline = [
            {
                $project: {
                    Song: 1,
                    Artist: 1,
                    Album: 1,
                    Year: 1,
                    [monthField]: 1,
                },
            },
            {
                $group: {
                    _id: null,
                    totalPlays: { $sum: `$${monthField}` },
                    songs: {
                        $push: {
                            song: '$Song',
                            artist: '$Artist',
                            album: '$Album',
                            year: '$Year',
                            totalPlays: `$${monthField}`,
                        },
                    },
                },
            },
            {
                $project: {
                    month: { $literal: month },
                    totalPlays: 1,
                    songs: 1,
                    _id: 0,
                },
            },
        ];
        const [summary] = await this.songModel.aggregate(pipeline);
        if (summary) {
            const { month, totalPlays, songs } = summary;
            return {
                month,
                totalPlays,
                songs,
            };
        }
    }
    ;
    checkFieldExists(schema, fieldName) {
        return schema.paths[fieldName] !== undefined;
    }
};
exports.SongsService = SongsService;
exports.SongsService = SongsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Song')),
    __metadata("design:paramtypes", [Object])
], SongsService);
//# sourceMappingURL=songs.service.js.map