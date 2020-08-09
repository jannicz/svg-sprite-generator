import { SvgFileModel } from '../../models/svgFile.model';

/**
 * Reads multiple files and returns them as string
 */
export const readFiles = (files) => {
  return new Promise<SvgFileModel[]>((resolve, reject) => {
    const reader = new FileReader();
    const textFiles: SvgFileModel[] = [];

    const readFile = (i) => {
      if (i >= files.length) {
        return;
      }

      const file = files[i];

      reader.onload = (e) => {
        textFiles[i] = {
          name: file.name,
          svg: e.target.result as string
        };

        if (i === files.length - 1) {
          resolve(textFiles);
        } else {
          readFile(i + 1);
        }
      }

      reader.onerror = (e) => {
        console.error('FileReader could not read file', e);
        reject(e);
      }

      reader.readAsText(file);
    }

    readFile(0);
  });
}
