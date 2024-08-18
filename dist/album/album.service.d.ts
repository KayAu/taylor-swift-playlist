import { ISong } from 'src/interface/song.interface';
import { Model } from "mongoose";
export declare class AlbumService {
    private songModel;
    constructor(songModel: Model<ISong>);
    getAllAlbums(): Promise<ISong[]>;
    getAlbumByYear(year: number): Promise<string[]>;
    findAlbum(searchText: string): Promise<ISong[]>;
    getMostPopular(month: string, limit: number): Promise<ISong[]>;
}
