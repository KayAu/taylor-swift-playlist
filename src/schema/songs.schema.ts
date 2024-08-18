import {  Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory  } from "@nestjs/mongoose"

@Schema()
export class Song {
   @Prop()
   Song: string;
   
   @Prop()
   Artist: string;

   @Prop()
   Writers: string[];

   @Prop()
   Album: string;

   @Prop()
   Year: number;

   @Prop()
   PlaysJune: number;

   @Prop()
   PlaysJuly: number;

   @Prop()
   PlaysAugust: number;
}

export const SongSchema = SchemaFactory.createForClass(Song);

SongSchema.statics.getSongsWithTotalPlays = async function (sortField: string = 'Song', ascOrder: boolean = true, fieldName?: string, matchValue?: any) {
   const pipeline: any[] = [
      // Add TotalPlays field
      {
        $addFields: {
          TotalPlays: {
            $add: ['$PlaysJune', '$PlaysJuly', '$PlaysAugust'], // Sum up the plays fields
          },
        },
      },
      // Conditionally add the $match stage if year is provided
      ...(fieldName !== undefined ? [{ $match: { [fieldName]: typeof matchValue === 'string' ? { $regex: new RegExp(matchValue, 'i') } : matchValue 
       } }] : []),
      {
        $sort: {
          [sortField]: ascOrder ? 1 : -1, // Use sortDirection determined above
        },
      },
   ];

   return this.aggregate(pipeline);
 };



 export interface SongModel extends Model<Song> {
   getSongsWithTotalPlays(sortField: string, ascOrder: boolean, fieldName?: string, matchValue?: any): Promise<any[]>;
 }

 