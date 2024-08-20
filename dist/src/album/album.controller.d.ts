import { AlbumService } from './album.service';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    getAlbums(): Promise<import("../interface/song.interface").ISong[] | import("express").Response<any, Record<string, any>>>;
    getYearlyProducedAlbums(): Promise<any[] | import("express").Response<any, Record<string, any>>>;
    getAlbumsByYear(year: number): Promise<import("express").Response<any, Record<string, any>> | string[]>;
    findAlbum(searchText: string): Promise<import("../interface/song.interface").ISong[] | import("express").Response<any, Record<string, any>>>;
    getMostPopular(month?: string, limit?: number): Promise<import("../interface/song.interface").ISong[] | import("express").Response<any, Record<string, any>>>;
}
