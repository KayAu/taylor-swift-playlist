import { ISong } from 'src/interface/song.interface';
import { Model } from "mongoose";
export declare class AlbumService {
    private songModel;
    constructor(songModel: Model<ISong>);
    getAllAlbums(): Promise<ISong[]>;
    getYearlyProducedAlbums(): Promise<any[]>;
    getAlbumByYear(year: number): Promise<string[]>;
    findAlbum(searchText: string): Promise<ISong[]>;
    getMostPopular(month: string, limit: number): Promise<ISong[]>;
}
