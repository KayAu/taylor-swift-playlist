"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const album_service_1 = require("./album.service");
const songs_schema_1 = require("../schema/songs.schema");
describe('AlbumsService', () => {
    let service;
    let mockSongModel;
    beforeEach(async () => {
        mockSongModel = {
            distinct: jest.fn(),
        };
        const module = await testing_1.Test.createTestingModule({
            providers: [
                album_service_1.AlbumService,
                {
                    provide: songs_schema_1.Song,
                    useValue: mockSongModel,
                },
            ],
        }).compile();
        service = module.get(album_service_1.AlbumService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('getAlbumByYear', () => {
        it('should return a sorted array of albums when successful', async () => {
            const year = 2018;
            const mockAlbums = ['Bigger', 'Spotify Singles'];
            mockSongModel.distinct.mockReturnValueOnce({
                exec: jest.fn().mockResolvedValue(mockAlbums),
            });
            const result = await service.getAlbumByYear(year);
            expect(mockSongModel.distinct).toHaveBeenCalledWith('Album', { Year: year });
            expect(result).toEqual(['Bigger', 'Spotify Singles']);
        });
        it('should throw an error if distinct fails', async () => {
            const year = 2024;
            const mockError = new Error('Failed to fetch albums');
            mockSongModel.distinct.mockReturnValueOnce({
                exec: jest.fn().mockRejectedValue(mockError),
            });
            await expect(service.getAlbumByYear(year)).rejects.toThrow(mockError);
        });
    });
});
//# sourceMappingURL=album.service.spec.js.map