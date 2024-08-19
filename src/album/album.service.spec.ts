import { Test, TestingModule } from '@nestjs/testing';
import { AlbumService } from './album.service';
import { Song, SongModel } from '../schema/songs.schema'; // Adjust import based on your structure

describe('AlbumsService', () => {
  let service: AlbumService;
  let mockSongModel: Partial<SongModel>;

  beforeEach(async () => {
    mockSongModel = {
      distinct: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlbumService,
        {
          provide: Song,
          useValue: mockSongModel,
        },
      ],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAlbumByYear', () => {
    it('should return a sorted array of albums when successful', async () => {
      const year = 2018;
      const mockAlbums = ['Bigger', 'Spotify Singles'];

      // Mock the distinct method to return mockAlbums
      (mockSongModel.distinct as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(mockAlbums),
      });

      // Call the getAlbumByYear method
      const result = await service.getAlbumByYear(year);

      // Check if the distinct method was called with correct arguments
      expect(mockSongModel.distinct).toHaveBeenCalledWith('Album', { Year: year });

      // Check if the result is correctly sorted
      expect(result).toEqual(['Bigger', 'Spotify Singles']);
    });

    it('should throw an error if distinct fails', async () => {
      const year = 2024;
      const mockError = new Error('Failed to fetch albums');

      // Mock the distinct method to throw an error
      (mockSongModel.distinct as jest.Mock).mockReturnValueOnce({
        exec: jest.fn().mockRejectedValue(mockError),
      });

      // Call the getAlbumByYear method and expect it to throw an error
      await expect(service.getAlbumByYear(year)).rejects.toThrow(mockError);
    });
  });
});
