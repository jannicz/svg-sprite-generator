import { NextApiRequest, NextApiResponse } from 'next';
import processSvgSprite from '../../server/transform-sprite';
import { SvgFileModel } from '../../models/svgFile.model';

// Disable automatic body parser
export const config = {
  api: {
    bodyParser: false
  }
}

type expressFile = {
  name: string
  data: Buffer
  size: number
  encoding: string
  tempFilePath: string
  truncated: boolean
  mimetype: 'image/svg+xml'
  md5: string
  mv: () => void
}

type NextApiRequestWithFiles = NextApiRequest & {
  files: expressFile[]
}

/**
 * Receives, transforms and returns a fileList into a SVG sprite
 */
function handleUploadReq(req: NextApiRequestWithFiles, res: NextApiResponse): void {
  console.log('API /upload (pages/api) files =>', req.files);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded');
  }

  const files = req.files['file'];
  let decodedFiles: SvgFileModel[] = [];
  let svgSprite: string;

  if (files) {
    try {
      decodedFiles = files.map((file) => {
        return {
          name: file.name,
          svg: file.data.toString('utf8')
        }
      });

      console.log('Decoded files =>', decodedFiles);

      svgSprite = processSvgSprite(decodedFiles);

      return res.status(200).json({
        svgSymbol: svgSprite
      });
    } catch (e) {
      console.error('Error during decoding of files', e);
      return res.status(405).end();
    }
  }

  return res.status(405).end();
}

export default handleUploadReq;
