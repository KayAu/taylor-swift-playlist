import { Song, SongModel } from '../schema/songs.schema';
export declare class SongsService {
    private songModel;
    constructor(songModel: SongModel);
    getAllSongs(searchText: string, sortField: string, ascOrder: boolean): Promise<Song[]>;
    getSongsByYear(year: number, sortField: string, ascOrder: boolean): Promise<any[]>;
    getSongsByAlbum(album: string, sortField: string, ascOrder: boolean): Promise<any[]>;
    getMostPopular(month: string, limit: number): Promise<any[]>;
    getSongsByWriter(writer: string, sortField: string, ascOrder: boolean): Promise<any[]>;
    getMonthlySummary(month: string): Promise<any>;
}
