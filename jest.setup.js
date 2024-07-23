// doing mock here
// __mocks__/svgMock.js
module.exports = 'SvgMock';
jest.mock('@react-native-community/geolocation', () => ({
  getCurrentPosition: jest.fn(),
}));
jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);
