import { SongsService } from './songs.service';
export declare class SongsController {
    private readonly songsService;
    constructor(songsService: SongsService);
    getSong(): string[];
}
