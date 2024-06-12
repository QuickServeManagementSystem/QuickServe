import fs from 'fs-extra';
import path from 'path';

export default (() => {
  // Read all font files in the source folder
  const exec = (pwd, fontResources) => {
    const ANDROID_ASSETS_FOLDER = path.join(pwd, 'android/app/src/main/assets');
    const ANDROID_ASSETS_FONT_FOLDER = path.join(
      ANDROID_ASSETS_FOLDER,
      'fonts',
    );
    // copy font to android
    if (!fs.existsSync(ANDROID_ASSETS_FOLDER)) {
      fs.mkdirSync(ANDROID_ASSETS_FOLDER);
    }
    if (!fs.existsSync(ANDROID_ASSETS_FONT_FOLDER)) {
      fs.mkdirSync(ANDROID_ASSETS_FONT_FOLDER);
    }

    fontResources.forEach(fontSourcePath => {
      const fontFileName = path.basename(fontSourcePath);
      const fontDestPath = path.join(ANDROID_ASSETS_FONT_FOLDER, fontFileName);
      fs.copyFileSync(fontSourcePath, fontDestPath);
      console.log(`${fontFileName} copied to ${ANDROID_ASSETS_FONT_FOLDER}`);
    });

    console.log(
      'Font installation completed successfully for android project.',
    );
  };
  return {
    exec,
  };
})();
