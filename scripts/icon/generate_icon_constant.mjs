// FILEPATH: /Users/admin/workspace/livein_app/src/views/AppIcon/generate_icon_constant.mjs
import fs from 'fs-extra';
import path from 'path';
import {exec} from 'child_process';

const PROJECT_PATH = './';
const ICON_SOURCE_FOLDER = path.join(PROJECT_PATH, 'src/assets/icons');

if (!fs.existsSync(ICON_SOURCE_FOLDER)) {
  fs.mkdirSync(ICON_SOURCE_FOLDER, {recursive: true});
}

const MAP_ICON_NAME = {};

const ICON_SOURCES = fs
  .readdirSync(ICON_SOURCE_FOLDER)
  .filter(file => file.endsWith('.svg'))
  .map(file => path.join(ICON_SOURCE_FOLDER, file));

ICON_SOURCES.forEach(fontSourcePath => {
  const fileOriginName = path.basename(fontSourcePath);
  const fileComponents = fileOriginName.split('.');
  const fileExtension = fileComponents.pop();
  const fileName = fileComponents.join('');
  console.log(fileComponents, fileExtension, fileName);
  //
  const relativePath = './icons/' + fileOriginName;

  //
  MAP_ICON_NAME[fileName] = `() => require('${relativePath}')`;
});
const content = `export const MAP_ICON_TYPE = {\n${Object.entries(MAP_ICON_NAME)
  .map(([key, value]) => `'${key}': ${value},\n`)
  .join('')}} as const\n`;
const ICON_CONSTANT_PATH = path.join(
  ICON_SOURCE_FOLDER,
  '..',
  'icon_constant.ts',
);
fs.writeFileSync(ICON_CONSTANT_PATH, content);
// format constant js
exec(
  `npx --no-install eslint ${ICON_CONSTANT_PATH} --fix`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  },
);
console.log('Generate icon constant successfully.');
