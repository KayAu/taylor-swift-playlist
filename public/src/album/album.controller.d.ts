import { AlbumService } from './album.service';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    getAlbums(): Promise<import("express").Response<any, Record<string, any>> | import("../interface/song.interface").ISong[]>;
    getYearlyProducedAlbums(): Promise<any[] | import("express").Response<any, Record<string, any>>>;
    getAlbumsByYear(year: number): Promise<string[] | import("express").Response<any, Record<string, any>>>;
    findAlbum(searchText: string): Promise<import("express").Response<any, Record<string, any>> | import("../interface/song.interface").ISong[]>;
    getMostPopular(month?: string, limit?: number): Promise<import("express").Response<any, Record<string, any>> | import("../interface/song.interface").ISong[]>;
}
