import fs from 'fs-extra';
import path from 'path';
import plist from 'plist';
import xcode from 'xcode';

export default (() => {
  // Read all font files in the source folder
  const exec = (pwd, fontResources) => {
    // Define the path to your Xcode project
    const PROJECT_PATH = path.join(pwd, 'ios');
    // add font to bundle resource
    // Add the font files to the Copy Bundle Resources build phase for all targets
    // Update the Info.plist file for each target
    const xcodeProjectPath = path.join(
      PROJECT_PATH,
      'cisgenics_app.xcodeproj',
      'project.pbxproj',
    );
    const project = xcode.project(xcodeProjectPath);
    project.parseSync();
    //
    const applicationTargetType = '"com.apple.product-type.application"';
    const pbxProjectPath = project.getFirstProject().uuid;
    const pbxProject = project.hash.project.objects.PBXProject[pbxProjectPath];
    const targetUUIDs = pbxProject.targets.map(target => target.value);
    //
    const processingPlist = [];
    targetUUIDs.forEach(targetUUID => {
      //
      const target = project.pbxNativeTargetSection()[targetUUID];
      if (
        !target ||
        !target.buildConfigurationList ||
        target.productType !== applicationTargetType
      ) {
        return;
      }
      // Retrieve the INFOPLIST_FILE path from build settings
      const buildConfigurations =
        project.pbxXCConfigurationList()[target.buildConfigurationList]
          .buildConfigurations;
      // edit plist from build setting of application target
      buildConfigurations.forEach(buildConfig => {
        const xcBuildConfiguration =
          project.pbxXCBuildConfigurationSection()[buildConfig.value];
        const infoPlistFile = xcBuildConfiguration.buildSettings.INFOPLIST_FILE;
        //
        if (processingPlist.includes(infoPlistFile)) {
          return;
        }
        processingPlist.unshift(infoPlistFile);
        const plistPath = path.join(PROJECT_PATH, infoPlistFile);
        // Update the Info.plist file
        const plistContent = fs.readFileSync(plistPath, 'utf8');
        const plistData = plist.parse(plistContent);

        if (!plistData.UIAppFonts) {
          plistData.UIAppFonts = [];
        }

        fontResources.forEach(fontSourcePath => {
          const fontFileName = path.basename(fontSourcePath);
          if (!plistData.UIAppFonts.includes(fontFileName)) {
            plistData.UIAppFonts.unshift(fontFileName);
            console.log(`${fontFileName} added to ${infoPlistFile}`);
          } else {
            console.log(
              `${fontFileName} is already present in ${infoPlistFile}`,
            );
          }
        });

        // Update the Info.plist file
        fs.writeFileSync(plistPath, plist.build(plistData));
        console.log(`${infoPlistFile} updated successfully.`);
      });

      // PBXResourcesBuildPhase
      const resourcesBuildPhase = project.pbxResourcesBuildPhaseObj(targetUUID);
      const relativePath = path.relative('src', PROJECT_PATH);

      // Add the font files to the Copy Bundle Resources build phase for the target
      fontResources.forEach(fontSourcePath => {
        const fontFileName = path.basename(fontSourcePath);
        if (!resourcesBuildPhase.files.includes(fontFileName)) {
          // PBXBuildFile
          // PBXResourcesBuildPhase
          // PBXFileReference
          // PBXGroup
          const fontFileRef = project.addResourceFile(`../${fontSourcePath}`, {
            target: targetUUID,
            lastKnownFileType: '"file"',
          });
          console.log(
            `${fontFileName} added to Copy Bundle Resources for target: ${fontFileRef.comment}`,
          );
        }
      });

      fs.writeFileSync(xcodeProjectPath, project.writeSync());
    });

    console.log('Font installation completed successfully for ios project.');
  };
  return {
    exec,
  };
})();
