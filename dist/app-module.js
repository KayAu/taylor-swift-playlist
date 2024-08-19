"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const songs_controller_1 = require("./songs/songs.controller");
const songs_service_1 = require("./songs/songs.service");
const songs_schema_1 = require("./schema/songs.schema");
const album_service_1 = require("./album/album.service");
const album_controller_1 = require("./album/album.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb+srv://kytest:Yb5hZbDLMV2rm3a2@kycluster.hybkf.mongodb.net/', { dbName: 'taylor_swift' }),
            mongoose_1.MongooseModule.forFeature([{ name: 'Song', schema: songs_schema_1.SongSchema }])
        ],
        controllers: [app_controller_1.AppController, songs_controller_1.SongsController, album_controller_1.AlbumController],
        providers: [app_service_1.AppService, songs_service_1.SongsService, album_service_1.AlbumService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map