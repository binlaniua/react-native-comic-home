var React = require('react-native');


var styles = React.StyleSheet.create({
  tableSeparator: {
    height: 2,
    backgroundColor: '#cccccc'
  },

  collectionSeparator: {
    width: 2,
    backgroundColor: '#cccccc'
  },

  flexRow: {
    flexDirection: 'row'
  },

  flexColumn: {
    flexDirection: 'column'
  },

  flexItem: {
    flex: 1
  },

  vTop: {
    alignItems: 'flex-start'
  },

  vBottom: {
    alignItems: 'flex-end'
  },

  hLeft: {
    justifyContent: 'flex-start'
  },

  hCenter: {
    justifyContent: 'center'
  },

  hRight: {
    justifyContent: 'flex-end'
  },

  debugBg1: {
    backgroundColor: '#ff0000'
  },

  debugBg2: {
    backgroundColor: '#00ff00'
  },

  paddingLeft: {
    paddingLeft: 8,
    paddingBottom: 8,
    paddingTop: 8,
    paddingRight: 4
  },

  paddingRight: {
    paddingRight: 8,
    paddingBottom: 8,
    paddingTop: 8,
    paddingLeft: 4
  },

  paddingAll: {
    padding: 8
  }
});


module.exports = styles;
