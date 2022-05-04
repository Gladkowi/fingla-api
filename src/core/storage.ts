import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ConfigService } from '../services/config/config.service';

const configService = new ConfigService();

export const saveFileToStorage = {
  limits: {
    fileSize: configService.get('storage.maxFileSizeBytes')
  },
  storage: diskStorage({
    destination: async (req: any, file: any, callback: any) => {
      callback(null, configService.get('storage.store'));
    },
    filename: (req: any, file: any, callback: any) => {
      callback(null, `${uuid()}${extname(file.originalname)}`);
    }
  }),
  fileFilter: (req: any, file: any, callback: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST), false);
    }
  }
};
