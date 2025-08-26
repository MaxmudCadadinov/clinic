import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileService {
  async downloadAndSavePhoto(photoUrl: string): Promise<string> {
    // создаём имя файла
    console.log('функция отработала')
    const fileName = Date.now() + path.extname(photoUrl);
    const filePath = path.join(__dirname, '..', '..', 'uploads', fileName);

    // скачиваем картинку
    const response = await axios.get(photoUrl, { responseType: 'arraybuffer' });
    fs.writeFileSync(filePath, response.data);
    console.log(`uploads/${fileName}`);
    // возвращаем путь до файла (для сохранения в БД)
    return `uploads/${fileName}`;
  }
}
