import attributesJson from '../../../assets/attributes.json';
import { NextApiRequest, NextApiResponse } from 'next';
import { AttributeTableModel } from '../../../models/attributeTable.model';

/**
 * Dynamic API requests
 * @example http://localhost:3001/api/attribute/stroke
 * @returns JSON containing single object that matched the request query
 */
function handle(req: NextApiRequest, res: NextApiResponse<AttributeTableModel[] | { error: string}>): void {
  console.log('API /[attribute] - find single SVG attribute, req.query =>', req.query);

  if (req.query && req.query.attribute) {
    const foundAttribute: AttributeTableModel[] = attributesJson.filter((a) => a.name === req.query.attribute);

    if (foundAttribute.length) {
      return res.status(200).json(foundAttribute);
    } else {
      return res.status(404).json({ error: 'No such attribute with name ' + req.query.attribute });
    }
  } else {
    return res.status(400).end();
  }
}

export default handle;
