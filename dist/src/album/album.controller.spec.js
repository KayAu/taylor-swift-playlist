"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const album_controller_1 = require("./album.controller");
describe('AlbumController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [album_controller_1.AlbumController],
        }).compile();
        controller = module.get(album_controller_1.AlbumController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=album.controller.spec.js.map