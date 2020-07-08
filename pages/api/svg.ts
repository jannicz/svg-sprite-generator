import attributesJson from '../../assets/attributes.json';
import { NextApiRequest, NextApiResponse } from 'next';
import { AttributeTableModel } from '../../models/attributeTable.model';

/**
 * Static API request
 * @example http://localhost:3001/api/svg
 * @see https://nextjs.org/blog/next-9#api-routes
 */
function handle(req: NextApiRequest, res: NextApiResponse<AttributeTableModel[]>): void {
  console.log('API /svg, method =>', req.method, 'query =>', req.query);

  switch (req.method) {
    case 'GET':
      return res.status(200).json(attributesJson);
    case 'POST':
      console.log('request body', req.body);
      return res.status(200).json(attributesJson);
    default:
      // Not allowed
      return res.status(405).end();
  }
}

export default handle;
