import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsController } from './songs/songs.controller';
import { SongsService } from './songs/songs.service';
import {SongSchema} from './schema/songs.schema';
import { AlbumService } from './album/album.service';
import { AlbumController } from './album/album.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://kytest:Yb5hZbDLMV2rm3a2@kycluster.hybkf.mongodb.net/',{dbName: 'taylor_swift'}),
            MongooseModule.forFeature([{ name: 'Song', schema: SongSchema }])
  ],
  controllers: [AppController, SongsController, AlbumController],
  providers: [AppService, SongsService, AlbumService],
})

//mongodb+srv://kytest:Yb5hZbDLMV2rm3a2@kycluster.hybkf.mongodb.net/
export class AppModule {}
