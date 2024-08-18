import { AlbumService } from './album.service';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    getAlbums(): Promise<import("express").Response<any, Record<string, any>> | import("../interface/song.interface").ISong[]>;
    getAlbumsByYear(year: number): Promise<import("express").Response<any, Record<string, any>> | string[]>;
    findAlbum(searchText: string): Promise<import("express").Response<any, Record<string, any>> | import("../interface/song.interface").ISong[]>;
    getMostPopular(month?: string, limit?: number): Promise<import("express").Response<any, Record<string, any>> | import("../interface/song.interface").ISong[]>;
}
