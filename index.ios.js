/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native'),
    Route = require('./App/route/route');
var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;

var ComicHome = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        initialRoute={Route.Index()}
        >
      </NavigatorIOS>
    );
  }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('ComicHome', () => ComicHome);
