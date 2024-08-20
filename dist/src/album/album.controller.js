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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const album_service_1 = require("./album.service");
const express_1 = require("express");
const swagger_1 = require("@nestjs/swagger");
const month_validation_pipe_1 = require("../pipe/month.validation.pipe");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    async getAlbums() {
        try {
            const albums = await this.albumService.getAllAlbums();
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async getYearlyProducedAlbums() {
        try {
            const albums = await this.albumService.getYearlyProducedAlbums();
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async getAlbumsByYear(year) {
        try {
            const albums = await this.albumService.getAlbumByYear(year);
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async findAlbum(searchText) {
        try {
            const albums = await this.albumService.findAlbum(searchText);
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.response);
        }
    }
    async getMostPopular(month = '', limit = 5) {
        try {
            const albums = await this.albumService.getMostPopular(month, limit);
            return albums;
        }
        catch (err) {
            return express_1.response.status(err.status).json(err.message);
        }
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)('getAlbums'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all albums' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return all albums sorted by year is DESC order' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request which could due to invalid parameters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getAlbums", null);
__decorate([
    (0, common_1.Get)('getYearlyProducedAlbums'),
    (0, swagger_1.ApiOperation)({ summary: 'Get total albums produced for each year' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return total albums produced in each year' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request which could due to invalid parameters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getYearlyProducedAlbums", null);
__decorate([
    (0, common_1.Get)('getAlbumsByYear/:year'),
    (0, swagger_1.ApiOperation)({ summary: 'Get albums by year' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return albums produced in a given year' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request which could due to invalid parameters' }),
    __param(0, (0, common_1.Param)('year', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getAlbumsByYear", null);
__decorate([
    (0, common_1.Get)('findAlbum/:searchText'),
    (0, swagger_1.ApiOperation)({ summary: 'Find album by name' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return albums' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request which could due to invalid parameters' }),
    __param(0, (0, common_1.Param)('searchText')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findAlbum", null);
__decorate([
    (0, common_1.Get)('getMostPopular'),
    (0, swagger_1.ApiOperation)({ summary: 'Get most popular albums' }),
    (0, swagger_1.ApiQuery)({
        name: 'month',
        type: String,
        description: 'Month for which to fetch the most popular albums. This field can be left empty to return most popular songs for all months.',
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
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request which could due to invalid parameters' }),
    __param(0, (0, common_1.Query)('month', month_validation_pipe_1.MonthValidationPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "getMostPopular", null);
exports.AlbumController = AlbumController = __decorate([
    (0, swagger_1.ApiTags)('Album'),
    (0, common_1.Controller)('album'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map