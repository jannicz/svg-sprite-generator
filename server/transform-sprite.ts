import { SvgFileModel } from '../models/svgFile.model';
// import SvgIconSpriteGenerator from 'svg-icon-sprite/scripts/generate-sprite';

export default function processSvgSprite(svgArray: SvgFileModel[]) {
  let svgElement = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="0" height="0">\n`;

  svgArray.forEach((el, i) => {
    console.log('iterate svgArray', i);
    svgElement += appendSymbol(el.svg, el.name);
  });

  svgElement += '</svg>';

  return svgElement;
}

/**
 * TODO refactor svg-icon-sprite so that all transformer functions are exposed
 */
function appendSymbol(file, name) {

  if (!file || !name) {
    throw new Error('No file found at ' + file);
  } else if (!file.includes('<svg')) {
    throw new Error('No SVG node found in ' + file);
  }

  const symbolEl = file
    .replace(/<\?xml.*?\?>/, '')
    .replace(/ id=".*?"/, '')
    .replace(/ version=".*?"/, '')
    .replace(/ xmlns=".*?"/, '')
    .replace(/ xmlns:xlink=".*?"/, '')
    .replace('<svg', `<symbol id="${name}"`)
    .replace('</svg>', '</symbol>\n');

  // console.log('\nProcessing SVG file', symbolEl, '\n');

  return symbolEl;
}
