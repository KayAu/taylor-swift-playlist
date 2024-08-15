import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {

    getCatSongs(): string[] {
        return ['Siamese', 'Persian', 'Maine Coon', 'Sphynx'];
      }
}
