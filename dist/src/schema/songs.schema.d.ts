import { Document, Model } from 'mongoose';
export declare class Song {
    Song: string;
    Artist: string;
    Writers: string[];
    Album: string;
    Year: number;
    PlaysJune: number;
    PlaysJuly: number;
    PlaysAugust: number;
}
export declare const SongSchema: import("mongoose").Schema<Song, Model<Song, any, any, any, Document<unknown, any, Song> & Song & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Song, Document<unknown, {}, import("mongoose").FlatRecord<Song>> & import("mongoose").FlatRecord<Song> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export interface SongModel extends Model<Song> {
    getSongsWithTotalPlays(sortField: string, ascOrder: boolean, fieldName?: string, matchValue?: any): Promise<any[]>;
}
