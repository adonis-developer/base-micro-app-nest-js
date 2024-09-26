import * as fs from 'fs';
import * as path from 'path';

export class LocalFileHelper {
  public static read(file: string) {
    const _path = path.join(process.cwd(), 'public', file);
    try {
      return fs.readFileSync(_path, { encoding: 'utf-8' });
    } catch (e) {
      throw new Error(`Read file error: ${e.message}`);
    }
  }
}
