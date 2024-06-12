// https://github.com/gregberge/svgr/issues/926
module.exports = {
  replaceAttrValues: {
    '#000': '{props.fill_color}',
    '#fff': '{props.stroke}',
    '@width': '{props.width}',
    '@height': '{props.height}',
  },
  native: true,
  typescript: true,
  expandProps: 'end',
  ref: true,
};
