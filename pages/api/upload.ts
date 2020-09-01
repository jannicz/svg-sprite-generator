import svgParserLib from 'svg-icon-sprite/scripts/svg-parser.lib';
import { NextApiRequest, NextApiResponse } from 'next';
import { SvgFileModel } from '../../models/svgFile.model';

// Dummy wait
async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

/**
 * Receives, transforms and returns a fileList into a SVG sprite
 * Expects JSON format in request body (stringified text files)
 */
async function handleUploadReq(req: NextApiRequest, res: NextApiResponse) {
  console.log('API /uploadJSON (pages/api) files =>', req.body.length, 'query', req.query);

  if (!req.body || req.body.length === 0) {
    return res.status(400).send('No files were uploaded');
  }

  const files: SvgFileModel[] = req.body;
  const trim = req.query.trim === 'true';
  const strip = req.query.strip === 'true';
  const retrieveFileName = obj => obj.svg;

  console.log('PARAMS trim =>', trim, 'strip =>', strip);

  try {
    const { svgElement, elementsChanged } = svgParserLib.iterateFiles(files, strip, trim, retrieveFileName);

    if (elementsChanged > 0) {
      const svgSprite = svgParserLib.wrapInSvgTag(svgElement);
      console.log('Successfully parsed =>', files.length, 'symbols into a sprite');

      // await wait(1000);
      return res.status(200).json({
        svgSymbol: svgSprite,
        amount: elementsChanged
      });
    } else {
      throw new Error('Amount of files was 0, empty response');
    }
  } catch (e) {
    console.error('Error during decoding of files', e);
    return res.status(405).end();
  }
}

export default handleUploadReq;
