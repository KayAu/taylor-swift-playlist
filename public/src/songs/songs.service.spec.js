"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const songs_service_1 = require("./songs.service");
describe('SongsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [songs_service_1.SongsService],
        }).compile();
        service = module.get(songs_service_1.SongsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=songs.service.spec.js.map