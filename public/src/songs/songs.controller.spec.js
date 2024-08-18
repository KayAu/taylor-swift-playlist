"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const songs_controller_1 = require("./songs.controller");
describe('SongsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [songs_controller_1.SongsController],
        }).compile();
        controller = module.get(songs_controller_1.SongsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=songs.controller.spec.js.map