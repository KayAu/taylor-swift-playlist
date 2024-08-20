import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Song , SongModel, SongSchema } from '../schema/songs.schema';
import { checkFieldExists } from '../utils/schema.validator';

@Injectable()
export class SongsService {

  constructor(@InjectModel('Song') private songModel:SongModel) { }

  async getAllSongs(searchText: string, sortField: string, ascOrder: boolean): Promise<Song[]> {
    const regex = new RegExp(searchText, 'i');
    const songs =  await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Song', regex);
    return songs;
  }

  async getSongsByYear(year: number, sortField: string, ascOrder: boolean): Promise<any[]> {
    try 
    {
      const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder,  'Year', year);

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
      const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Album', album);
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
      if(month)
      {
        if (!checkFieldExists(SongSchema,`Plays${month}`)) return [];
      }

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
      const songs = await this.songModel.getSongsWithTotalPlays(sortField, ascOrder, 'Writers', writer);
      return songs;
    }
    catch (err) 
    {
        console.error(err);
        throw err;  
    } 
  } 

  async getMonthlySummary(month: string) : Promise<any>
  {
    try
    {
      const monthField = `Plays${month}`;

      if (!checkFieldExists(SongSchema,`Plays${month}`)) return [];

      // Create the aggregation pipeline
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
            month: { $literal: month }, // Include the month name
            totalPlays: 1,
            songs: 1,
            _id: 0,
          },
        },
      ];

      // Execute the aggregation pipeline
      const [summary] = await this.songModel.aggregate(pipeline);

      // Ensure the fields are in the desired order in the application logic
      if (summary) {
        // Reorder the fields as needed
        const { month, totalPlays, songs } = summary;
        return {
          month,
          totalPlays,
          songs,
        };
      }

    }
    catch (err) 
    {
        console.error(err);
        throw err;  
    } 
  };
}
