import { NextApiRequest, NextApiResponse } from 'next';
import { SvgFileModel } from '../../models/svgFile.model';
import processSvgSprite from '../../server/transform-sprite';

/**
 * Receives, transforms and returns a fileList into a SVG sprite
 * Expects JSON format in request body (stringified text files)
 */
function handleUploadReq(req: NextApiRequest, res: NextApiResponse): void {
  console.log('API /uploadJSON (pages/api) files =>', typeof req.body);

  if (!req.body || req.body.length === 0) {
    return res.status(400).send('No files were uploaded');
  }

  const files: SvgFileModel[] = req.body;
  let svgSprite: string;

  try {
    svgSprite = processSvgSprite(files);

    return res.status(200).json({
      svgSymbol: svgSprite
    });
  } catch (e) {
    console.error('Error during decoding of files', e);
    return res.status(405).end();
  }
}

export default handleUploadReq;
