import { SongsService } from './songs.service';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    getSongs(searchText: string, sortBy: string, ascOrder: boolean): Promise<import("../schema/songs.schema").Song[] | import("express").Response<any, Record<string, any>>>;
    getSongsByYear(year: number, sortBy: string, ascOrder: boolean): Promise<any[] | import("express").Response<any, Record<string, any>>>;
    getSongsByAlbum(album: string, sortBy: string, ascOrder: boolean): Promise<any[] | import("express").Response<any, Record<string, any>>>;
    getMostPopular(month?: string, limit?: number): Promise<any[] | import("express").Response<any, Record<string, any>>>;
    getSongsByWriter(writer: string, sortBy: string, ascOrder: boolean): Promise<any[] | import("express").Response<any, Record<string, any>>>;
    getMonthlySummary(month: any): Promise<any>;
}
