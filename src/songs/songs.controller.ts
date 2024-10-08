import { Controller, Get, Query , Param, ParseIntPipe, ParseBoolPipe } from '@nestjs/common';
import { SongsService } from './songs.service';
import { response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import {MonthValidationPipe} from '../pipe/month.validation.pipe';
import {SortByValidationPipe} from '../pipe/sortBy.validation.pipe';

@ApiTags('Songs')
@Controller('songs')
export class SongsController {
 constructor (private readonly songsService:SongsService){}

  @Get('getSongs')
  @ApiOperation({ summary: 'Get all songs' })
  @ApiQuery({
    name: 'searchText',
    type: String,
    description: 'Song can be a full or partial name. All songs will be return if this field is empty ',
    required: false,
    example: '',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    description: 'Sort by field. The default sort by field is TotalPlays.',
    required: false,
    example: 'TotalPlays',
  })
  @ApiQuery({
    name: 'ascOrder',
    type: Boolean,
    description: 'Sort in ascending direction. The default sort direction is True',
    required: false,
    example: false,
  })
  @ApiResponse({ status: 201, description: 'Return all songs sorted by year is DESC order' })
  @ApiResponse({ status: 400, description: 'Bad Request which could due to invalid parameters' })
  async getSongs(@Query('searchText') searchText: string, @Query('sortBy', SortByValidationPipe) sortBy: string, @Query('ascOrder', ParseBoolPipe) ascOrder: boolean) {
    try
    {
        const songs = await this.songsService.getAllSongs(searchText, sortBy, ascOrder);
        return songs;
    }
    catch(err)
    {
        return response.status(err.status).json(err.response);
    }
  }

  @Get('getSongsByYear')
  @ApiOperation({ summary: 'Get songs by year' })
  @ApiQuery({
    name: 'year',
    type: Number,
    description: 'Year for which the song is created',
    required: true,
    example: '2019'
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    description: 'Sort by field. The default sort by field is TotalPlays.',
    required: false,
    example: 'TotalPlays',
  })
  @ApiQuery({
    name: 'ascOrder',
    type: Boolean,
    description: 'Sort in ascending direction. The default sort direction is True',
    required: false,
    example: false,
  })
  @ApiResponse({ status: 201, description: 'Return songs writen in a given year' })
  @ApiResponse({ status: 400, description: 'Bad Request which could due to invalid parameters' })
  async getSongsByYear(@Query('year', ParseIntPipe) year: number, @Query('sortBy', SortByValidationPipe) sortBy: string, @Query('ascOrder', ParseBoolPipe) ascOrder: boolean) {
    try
    {
      return this.songsService.getSongsByYear(year, sortBy, ascOrder);
    }
    catch(err)
    {
      return response.status(err.status).json(err.response);
    }
  }

  
  @Get('getSongsByAlbum')
  @ApiOperation({ summary: 'Get songs by album' })
  @ApiQuery({
    name: 'album',
    type: String,
    description: 'Album name',
    required: true,
    example: 'Red',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    description: 'Sort by field. The default sort by field is TotalPlays.',
    required: false,
    example: 'TotalPlays',
  })
  @ApiQuery({
    name: 'ascOrder',
    type: Boolean,
    description: 'Sort in ascending direction. The default sort direction is True',
    required: false,
    example: false,
  })
  @ApiResponse({ status: 201, description: 'Return songs for an album' })
  @ApiResponse({ status: 400, description: 'Bad Request which could due to invalid parameters' })
  async getSongsByAlbum(@Query('album') album: string, @Query('sortBy', SortByValidationPipe) sortBy: string, @Query('ascOrder', ParseBoolPipe) ascOrder: boolean) {
      try
      {
          const albums = await this.songsService.getSongsByAlbum(album, sortBy, ascOrder);
          return albums;
      }
      catch(err)
      {
          return response.status(err.status).json(err.response);
      }
  }

  @Get('getMostPopular')
  @ApiOperation({ summary: 'Get most popular songs' })
  @ApiQuery({
      name: 'month',
      type: String,
      description: 'Month for which to fetch the most popular songs. The month name, for instance which can be either "Jun" or "June". This field can be left empty to return most popular songs for all months',
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
  @ApiResponse({ status: 400, description: 'Bad Request which could due to invalid parameters' })
  async getMostPopular(@Query('month', MonthValidationPipe) month = '', @Query('limit', ParseIntPipe) limit = 5) {
      try
      {
          const albums = await this.songsService.getMostPopular(month,  limit);
          return albums;    
      }
      catch(err)
      {
          return response.status(err.status).json(err.message);
      }
  }

  @Get('getSongsByWriter')
  @ApiOperation({ summary: 'Find songs by title' })
  @ApiQuery({
    name: 'writer',
    type: String,
    description: 'Writer can be a full or partial name',
    required: true,
    example: 'Taylor Swift',
  })
  @ApiQuery({
    name: 'sortBy',
    type: String,
    description: 'Sort by field. The default sort by field is Song name.',
    required: false,
    example: 'Song',
  })
  @ApiQuery({
    name: 'ascOrder',
    type: Boolean,
    description: 'Sort in ascending direction. The default sort direction is True',
    required: false,
    example: true,
  })
  @ApiResponse({ status: 201, description: 'Return songs' })
  @ApiResponse({ status: 400, description: 'Bad Request which could due to invalid parameters' })
  async getSongsByWriter(@Query('writer') writer: string, @Query('sortBy', SortByValidationPipe) sortBy: string, @Query('ascOrder', ParseBoolPipe) ascOrder: boolean) {
      try
      {
          const albums = await this.songsService.getSongsByWriter(writer, sortBy, ascOrder);
          return albums;
      }
      catch(err)
      {
          return response.status(err.status).json(err.response);
      }
  }

  @Get('getMonthlySummary')
  @ApiOperation({ summary: 'Get the total plays summary for a given month. The month name, for instance which can be either "Jun" or "June"' })
  @ApiQuery({
      name: 'month',
      type: String,
      description: 'Month for the total play summary',
      required: true,
      example: 'June'
    })
  @ApiResponse({ status: 201, description: 'Return most popular items albums' })
  @ApiResponse({ status: 400, description: 'Bad Request which could due to invalid parameters' })
  async getMonthlySummary(@Query('month', MonthValidationPipe) month) {
      try
      {      
         const albums = await this.songsService.getMonthlySummary(month);
         return albums;    
      }
      catch(err)
      {
          return response.status(err.status).json(err.message);
      }
  }
}
