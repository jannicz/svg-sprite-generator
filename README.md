# SVG Sprite Generator

**[Visit the SVG Generator](https://svg-sprite-generator.vercel.app/)**

## What it does

 - creates SVG symbols files from uploaded SVG icons
 - modifies the attributes so that the icons can be used from a sprite file
 - concatenates all files into a symbol file (actually the sprite file)

## Usage

 - drop (upload) your files
 - set modifiers (i.e. whether fill/stroke should be stripped)
 - click `TRANSFORM` to trigger the generation
 - copy and paste the generated markup into a your `sprite.svg` file

# Development notes

## Used libraries and scripts

 - material-ui for complex UI components and icons
 - Typescript for compiling *.tsx files
