import attributesJson from '../../../assets/attributes.json';
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Dynamic API requests
 * @example http://localhost:3001/api/attribute/stroke
 * @returns JSON containing single object that matched the request query
 */
function handle(req: NextApiRequest, res: NextApiResponse) {
  console.log('API /[attribute] - find single SVG attribute, req.query =>', req.query);

  if (req.query && req.query.attribute) {
    const foundAttribute = attributesJson.filter((a) => a.attribute === req.query.attribute);

    if (foundAttribute.length) {
      return res.status(200).json(foundAttribute);
    } else {
      return res.status(404).json({ error: 'No such attribute with name' + req.query.attribute });
    }
  } else {
    return res.status(400);
  }
}

export default handle;
