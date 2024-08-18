import { Controller, Get, Query , Param, ParseIntPipe, Res } from '@nestjs/common';
import { AlbumService } from './album.service';
import { response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import {MonthValidationPipe} from '../pipe/month.validation.pipe';

@ApiTags('Album')
@Controller('album')
export class AlbumController {

    constructor (private readonly albumService:AlbumService){}
    
    @Get('getAlbums')
    @ApiOperation({ summary: 'Get all albums' })
    @ApiResponse({ status: 201, description: 'Return all albums sorted by year is DESC order' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getAlbums() {
        try
        {
            const albums = await this.albumService.getAllAlbums();
            return albums;
        }
        catch(err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('getAlbumsByYear/:year')
    @ApiOperation({ summary: 'Get albums by year' })
    @ApiResponse({ status: 201, description: 'Return albums produced in a given year' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getAlbumsByYear(@Param('year', ParseIntPipe) year: number) {
        try
        {
            const albums = await this.albumService.getAlbumByYear(year);
            return albums;
        }
        catch(err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('findAlbum/:searchText')
    @ApiOperation({ summary: 'Find album by album or song name' })
    @ApiResponse({ status: 201, description: 'Return albums' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async findAlbum(@Param('searchText') searchText: string) {
        try
        {
            const albums = await this.albumService.findAlbum(searchText);
            return albums;
        }
        catch(err)
        {
            return response.status(err.status).json(err.response);
        }
    }

    @Get('getMostPopular')
    @ApiOperation({ summary: 'Get most popular albums' })
    @ApiQuery({
        name: 'month',
        type: String,
        description: 'Month for which to fetch the most popular albums',
        required: false,
        example: 'June'
      })
      @ApiQuery({
        name: 'limit',
        type: Number,
        description: 'Limit of albums to fetch. The default limit is 5.',
        required: false,
        example: 5,
      })
    @ApiResponse({ status: 201, description: 'Return most popular items albums' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    async getMostPopular(@Query('month') month = '', @Query('limit', ParseIntPipe) limit = 5) {
        try
        {
            const validMonth = new MonthValidationPipe().transform(month);
            const albums = await this.albumService.getMostPopular(validMonth,  limit);
            return albums;    
        }
        catch(err)
        {
            return response.status(err.status).json(err.message);
        }
    }
}
