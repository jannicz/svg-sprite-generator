import { NextApiRequest, NextApiResponse } from 'next';

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

  console.log('API /upload (pages/api)', req.method, 'query =>', req.query);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded');
    }

    const sampleFiles = req.files;
    console.log('SAMPLE FILES =>', sampleFiles);

    const files = req.files['file'];

    console.log('SAMPLE files =>', !!sampleFiles, '=>', files);

    const svg = files[0].data.toString('utf8');

    console.log('BUFFER TO STRING =>', svg);

    return res.status(200).json({ transformed: 'foo' });
}

export default handleUploadReq;
