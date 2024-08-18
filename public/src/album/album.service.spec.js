"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const album_service_1 = require("./album.service");
describe('AlbumService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [album_service_1.AlbumService],
        }).compile();
        service = module.get(album_service_1.AlbumService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=album.service.spec.js.map