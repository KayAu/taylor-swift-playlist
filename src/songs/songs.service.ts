import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
//import { ISong } from 'src/interface/song.interface';
import { Song , SongModel } from '../schema/songs.schema';
import { Model } from "mongoose";

@Injectable()
export class SongsService {

  constructor(@InjectModel('Song') private songModel:SongModel) { }

  async getAllSongs(sortField: string, ascOrder: boolean): Promise<Song[]> {
      const songs =  await this.songModel.getSongsWithTotalPlays(sortField, ascOrder);
      return songs;
  }

  async getSongsByYear(year: number, sortField: string, ascOrder: boolean): Promise<any[]> {
    try 
    {
      const rawSongs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder,  'Year', year);
  
      const songs = rawSongs.map(song => ({
        Song: song.Song,
        Writers: song.Writers,
        Album: song.Album,
        Year: song.Year,
        TotalPlays: song.TotalPlays,
      }));

      return songs;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getSongsByAlbum(album: string, sortField: string, ascOrder: boolean): Promise<any[]>
  {
    try
    {
      const rawSongs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Album', album);
  
      const songs = rawSongs.map(song => ({
        Song: song.Song,
        Writers: song.Writers,
        Year: song.Year,
        Album: song.Album,
        PlaysJune: song.PlaysJune,
        PlaysJuly: song.PlaysJuly,
        PlaysAugust: song.PlaysAugust,
        TotalPlays: song.TotalPlays,
      }));

      return songs;
    }
    catch (err) 
    {
        console.error(err);
        throw err;  
    }  
  }

  async findSong(searchText: string, sortField: string, ascOrder: boolean): Promise<any[]>
  {
    try
    {
        const regex = new RegExp(searchText, 'i');
        const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Song', regex);
        return songs;
    }
    catch (err) 
    {
        console.error(err);
        throw err;  
    }  
  }

  async getMostPopular(month: string, limit: number): Promise<any[]>
  {
    try
    {
      const albums = await this.songModel.aggregate([
        {
          $addFields: {
            Month: !month ? 'All Months' : month,
            TotalPlays: !month ? { $add: ['$PlaysJune', '$PlaysJuly', '$PlaysAugust']} : `$Plays${month}`          
          }
        },
        {
          $project: {
            _id: 0,
            Song:1,
            Writers:1,
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
    catch (err) 
    {
        console.error(err);
        throw err;  
    }    
  }

  async getSongsByWriter(writer: string, sortField: string, ascOrder: boolean): Promise<any[]>
  {
    try
    {
      const rawSongs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Writers', writer);
  
      const songs = rawSongs.map(song => ({
        Song: song.Song,
        Writers: song.Writers,
        Year: song.Year,
        Album: song.Album,
        PlaysJune: song.PlaysJune,
        PlaysJuly: song.PlaysJuly,
        PlaysAugust: song.PlaysAugust,
        TotalPlays: song.TotalPlays,
      }));

      return songs;
    }
    catch (err) 
    {
        console.error(err);
        throw err;  
    } 
  } 
}
