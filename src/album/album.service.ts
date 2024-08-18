import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ISong } from 'src/interface/song.interface';
import { Model } from "mongoose";

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
                        $or: [{ Album: regex },{ Song: regex }]
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
           // create the dynamic field selector for the specified month
            const monthField = `$Plays${month}`;
       
            const albums = await this.songModel.aggregate([
                {
                    $group: {
                        _id: { Album: "$Album", Year: "$Year" },
                        Album: { $first: "$Album" },
                        Year: { $first: "$Year" },
                        TotalPlays: month === ''?  {$sum: { $add: ['$PlaysJune', '$PlaysJuly', '$PlaysAugust'] } } : { $sum: monthField }
                    },
                },
                {
                    $project: {
                        _id: 0,
                        Album: 1,
                        Year: 1,
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
