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
exports.SongsController = void 0;
const common_1 = require("@nestjs/common");
const songs_service_1 = require("./songs.service");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const month_validation_pipe_1 = require("../pipe/month.validation.pipe");
const sortBy_validation_pipe_1 = require("../pipe/sortBy.validation.pipe");
let SongsController = class SongsController {
    constructor(songsService) {
        this.songsService = songsService;
    }
    async getSongs(searchText, sortBy, ascOrder) {
        try {
            const songs = await this.songsService.getAllSongs(searchText, sortBy, ascOrder);
            return songs;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async getSongsByYear(year, sortBy, ascOrder) {
        try {
            return this.songsService.getSongsByYear(year, sortBy, ascOrder);
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async getSongsByAlbum(album, sortBy, ascOrder) {
        try {
            const albums = await this.songsService.getSongsByAlbum(album, sortBy, ascOrder);
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async getMostPopular(month = '', limit = 5) {
        try {
            const albums = await this.songsService.getMostPopular(month, limit);
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.message);
        }
    }
    async getSongsByWriter(writer, sortBy, ascOrder) {
        try {
            const albums = await this.songsService.getSongsByWriter(writer, sortBy, ascOrder);
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async getMonthlySummary(month) {
        try {
            const albums = await this.songsService.getMonthlySummary(month);
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.message);
        }
    }
};
exports.SongsController = SongsController;
__decorate([
    (0, common_1.Get)('getSongs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all songs' }),
    (0, swagger_1.ApiQuery)({
        name: 'searchText',
        type: String,
        description: 'Song can be a full or partial name. All songs will be return if this field is empty ',
        required: false,
        example: '',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        type: String,
        description: 'Sort by field. The default sort by field is TotalPlays.',
        required: false,
        example: 'TotalPlays',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'ascOrder',
        type: Boolean,
        description: 'Sort in ascending direction. The default sort direction is True',
        required: false,
        example: false,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return all songs sorted by year is DESC order' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Query)('searchText')),
    __param(1, (0, common_1.Query)('sortBy', sortBy_validation_pipe_1.SortByValidationPipe)),
    __param(2, (0, common_1.Query)('ascOrder', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getSongs", null);
__decorate([
    (0, common_1.Get)('getSongsByYear'),
    (0, swagger_1.ApiOperation)({ summary: 'Get songs by year' }),
    (0, swagger_1.ApiQuery)({
        name: 'year',
        type: Number,
        description: 'Year for which the song is created',
        required: true,
        example: '2019'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        type: String,
        description: 'Sort by field. The default sort by field is TotalPlays.',
        required: false,
        example: 'TotalPlays',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'ascOrder',
        type: Boolean,
        description: 'Sort in ascending direction. The default sort direction is True',
        required: false,
        example: false,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return songs writen in a given year' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Query)('year', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('sortBy', sortBy_validation_pipe_1.SortByValidationPipe)),
    __param(2, (0, common_1.Query)('ascOrder', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Boolean]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getSongsByYear", null);
__decorate([
    (0, common_1.Get)('getSongsByAlbum'),
    (0, swagger_1.ApiOperation)({ summary: 'Get songs by album' }),
    (0, swagger_1.ApiQuery)({
        name: 'album',
        type: String,
        description: 'Album name',
        required: true,
        example: 'Red',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        type: String,
        description: 'Sort by field. The default sort by field is TotalPlays.',
        required: false,
        example: 'TotalPlays',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'ascOrder',
        type: Boolean,
        description: 'Sort in ascending direction. The default sort direction is True',
        required: false,
        example: false,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return songs for an album' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Query)('album')),
    __param(1, (0, common_1.Query)('sortBy', sortBy_validation_pipe_1.SortByValidationPipe)),
    __param(2, (0, common_1.Query)('ascOrder', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getSongsByAlbum", null);
__decorate([
    (0, common_1.Get)('getMostPopular'),
    (0, swagger_1.ApiOperation)({ summary: 'Get most popular songs' }),
    (0, swagger_1.ApiQuery)({
        name: 'month',
        type: String,
        description: 'Month for which to fetch the most popular songs. This field can be left empty to return most popular songs for all months',
        required: false,
        example: 'June'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: Number,
        description: 'Limit of albums to fetch. The default limit is 5.',
        required: false,
        example: 5,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return most popular items albums' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Query)('month', month_validation_pipe_1.MonthValidationPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getMostPopular", null);
__decorate([
    (0, common_1.Get)('getSongsByWriter'),
    (0, swagger_1.ApiOperation)({ summary: 'Find songs by title' }),
    (0, swagger_1.ApiQuery)({
        name: 'writer',
        type: String,
        description: 'Writer can be a full or partial name',
        required: true,
        example: 'Taylor Swift',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        type: String,
        description: 'Sort by field. The default sort by field is Song name.',
        required: false,
        example: 'Song',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'ascOrder',
        type: Boolean,
        description: 'Sort in ascending direction. The default sort direction is True',
        required: false,
        example: true,
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return songs' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Query)('writer')),
    __param(1, (0, common_1.Query)('sortBy', sortBy_validation_pipe_1.SortByValidationPipe)),
    __param(2, (0, common_1.Query)('ascOrder', common_1.ParseBoolPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getSongsByWriter", null);
__decorate([
    (0, common_1.Get)('getMonthlySummary'),
    (0, swagger_1.ApiOperation)({ summary: 'Get the total plays summary for a given month' }),
    (0, swagger_1.ApiQuery)({
        name: 'month',
        type: String,
        description: 'Month for the total play summary',
        required: true,
        example: 'June'
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return most popular items albums' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Query)('month', month_validation_pipe_1.MonthValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SongsController.prototype, "getMonthlySummary", null);
exports.SongsController = SongsController = __decorate([
    (0, swagger_1.ApiTags)('Songs'),
    (0, common_1.Controller)('songs'),
    __metadata("design:paramtypes", [songs_service_1.SongsService])
], SongsController);
//# sourceMappingURL=songs.controller.js.map