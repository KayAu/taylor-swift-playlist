"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongSchema = exports.Song = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Song = class Song {
};
exports.Song = Song;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Song.prototype, "Song", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Song.prototype, "Artist", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Song.prototype, "Writers", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Song.prototype, "Album", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Song.prototype, "Year", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Song.prototype, "PlaysJune", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Song.prototype, "PlaysJuly", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Song.prototype, "PlaysAugust", void 0);
exports.Song = Song = __decorate([
    (0, mongoose_1.Schema)()
], Song);
exports.SongSchema = mongoose_1.SchemaFactory.createForClass(Song);
exports.SongSchema.statics.getSongsWithTotalPlays = async function (sortField = 'Song', ascOrder = true, fieldName, matchValue) {
    const pipeline = [
        {
            $addFields: {
                TotalPlays: {
                    $add: ['$PlaysJune', '$PlaysJuly', '$PlaysAugust'],
                },
            },
        },
        ...(fieldName !== undefined ? [{ $match: { [fieldName]: typeof matchValue === 'string' ? { $regex: new RegExp(matchValue, 'i') } : matchValue
                } }] : []),
        {
            $sort: {
                [sortField]: ascOrder ? 1 : -1,
            },
        },
    ];
    return this.aggregate(pipeline);
};
//# sourceMappingURL=songs.schema.js.map