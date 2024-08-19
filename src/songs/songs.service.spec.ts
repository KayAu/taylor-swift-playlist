import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from './songs.service';
import { Song, SongModel } from '../schema/songs.schema'; // Adjust import based on your structure

describe('SongsService', () => {
  let service: SongsService;
  let mockSongModel: Partial<SongModel>;

  beforeEach(async () => {
    mockSongModel = {
      getSongsWithTotalPlays: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        {
          provide: Song,
          useValue: mockSongModel,
        },
      ],
    }).compile();

    service = module.get<SongsService>(SongsService);
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

      // Mock the getSongsWithTotalPlays method
      (mockSongModel.getSongsWithTotalPlays as jest.Mock).mockResolvedValue(mockSongs);

      // Call the getSongsByYear method
      const result = await service.getSongsByYear(year, sortField, ascOrder);

      // Check if the service method was called with correct arguments
      expect(mockSongModel.getSongsWithTotalPlays).toHaveBeenCalledWith(sortField, ascOrder, 'Year', year);

      // Check if the result matches the expected data
      expect(result).toEqual(mockSongs);
    });

    it('should throw an error if getSongsWithTotalPlays fails', async () => {
      const year = 2024;
      const sortField = 'song';
      const ascOrder = true;
      const mockError = new Error('Failed to fetch songs');

      // Mock the getSongsWithTotalPlays method to throw an error
      (mockSongModel.getSongsWithTotalPlays as jest.Mock).mockRejectedValue(mockError);

      // Call the getSongsByYear method and expect it to throw an error
      await expect(service.getSongsByYear(year, sortField, ascOrder)).rejects.toThrow(mockError);
    });
  });
});
