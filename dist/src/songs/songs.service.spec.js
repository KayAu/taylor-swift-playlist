"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const songs_service_1 = require("./songs.service");
const songs_schema_1 = require("../schema/songs.schema");
describe('SongsService', () => {
    let service;
    let mockSongModel;
    beforeEach(async () => {
        mockSongModel = {
            getSongsWithTotalPlays: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                songs_service_1.SongsService,
                {
                    provide: songs_schema_1.Song,
                    useValue: mockSongModel,
                },
            ],
        }).compile();
        service = module.get(songs_service_1.SongsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getSongsByYear', () => {
        it('should return an array of songs when successful', async () => {
            const year = 2015;
            const sortField = 'song';
            const ascOrder = true;
            const mockSongs = [
                {
                    "_id": "66c0acb151e49649fe960446",
                    "Song": "Bad Blood (remixed single version)",
                    "Artist": "Taylor Swift featuring Kendrick Lamar",
                    "Writers": [
                        "Taylor Swift",
                        "Max Martin",
                        "Shellback",
                        "Kendrick Lamar"
                    ],
                    "Album": "None[b]",
                    "Year": 2015,
                    "PlaysJune": 22,
                    "PlaysJuly": 71,
                    "PlaysAugust": 50,
                    "TotalPlays": 143
                }
            ];
            mockSongModel.getSongsWithTotalPlays.mockResolvedValue(mockSongs);
            const result = await service.getSongsByYear(year, sortField, ascOrder);
            expect(mockSongModel.getSongsWithTotalPlays).toHaveBeenCalledWith(sortField, ascOrder, 'Year', year);
            expect(result).toEqual(mockSongs);
        });
        it('should throw an error if getSongsWithTotalPlays fails', async () => {
            const year = 2024;
            const sortField = 'song';
            const ascOrder = true;
            const mockError = new Error('Failed to fetch songs');
            mockSongModel.getSongsWithTotalPlays.mockRejectedValue(mockError);
            await expect(service.getSongsByYear(year, sortField, ascOrder)).rejects.toThrow(mockError);
        });
    });
});
//# sourceMappingURL=songs.service.spec.js.map