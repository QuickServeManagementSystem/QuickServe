// https://github.com/react-native-community/cli/blob/main/docs/plugins.md
/** @type import("@react-native-community/cli-types").Config */
module.exports = {
  // https://github.com/react-native-community/cli/blob/main/docs/projects.md#projectiosautomaticpodsinstallation
  //
  project: {
    android: {
      watchModeCommandParams: ['--tasks', 'clean,installVinovaDebug'],
    },
    ios: {
      watchModeCommandParams: ['--scheme', 'cisgenics_app'],
    },
  },
  commands: [],
  assets: ['./src/assets/fonts', './src/assets/icons'], // stays the same
};
