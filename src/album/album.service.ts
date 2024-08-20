import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ISong } from 'src/interface/song.interface';
import { Model } from "mongoose";
import { checkFieldExists } from '../utils/schema.validator';
import { SongSchema } from 'src/schema/songs.schema';

@Injectable()
export class AlbumService {
    constructor(@InjectModel('Song') private songModel:Model<ISong>) { }

    async getAllAlbums(): Promise<ISong[]> 
    {
        try 
        {
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
        catch (err) 
        {
            console.error(err);
            throw err;  
        }    
    }

    async getYearlyProducedAlbums(): Promise<any[]>
    {
        try {
            const albunms = await this.songModel.aggregate([
                {
                  $group: {
                    _id: { Year: "$Year", Album: "$Album" }, // Group by Year and Album
                  },
                },
                {
                  $group: {
                    _id: "$_id.Year", // Group by Year
                    TotalAlbums: { $sum: 1 }, // Count unique albums
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
                  $sort: { Year: 1 }, // Sort by Year in ascending order
                },
            ]);

            return albunms;
        } catch (err) {
            console.error('Error fetching unique albums per year:', err);
            throw err;
        }
    }

    async getAlbumByYear(year: number): Promise<string[]>
    {
        try 
        {
            // Get distinct albums
            const albums = await this.songModel
                                    .distinct('Album', { Year: year })
                                    .exec();
                                
            // Sort the albums
            return albums.sort();
        } 
        catch (err) 
        {
            console.error(err);
            throw err;  
        }    
    }

async findAlbum(searchText: string): Promise<ISong[]>
    {
        try
        {
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
        catch (err) 
        {
            console.error(err);
            throw err;  
        }  
    }

    async getMostPopular(month: string, limit: number): Promise<ISong[]>
    {
        try
        {
            if(month)
            {
                if (!checkFieldExists(SongSchema,`Plays${month}`)) return [];
            }
        
           // create the dynamic field selector for the specified month
            const monthField = `$Plays${month}`;
       
            const albums = await this.songModel.aggregate([
                {
                    $group: {
                        _id: { Album: "$Album", Year: "$Year" },
                        Album: { $first: "$Album" },
                        Year: { $first: "$Year" },
                        TotalPlays: month === '' ?  {$sum: { $add: ['$PlaysJune', '$PlaysJuly', '$PlaysAugust'] } } : { $sum: monthField }
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
        catch (err) 
        {
            console.error(err);
            throw err;  
        }  
    }

    
}
