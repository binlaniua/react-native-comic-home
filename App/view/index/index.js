var React = require('react-native'),
  Css = require('../../css/css'),
  Route = require('../../route/route'),
  SiteService = require('../../service/site');

var {
  Image,
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight
} = React;


var IndexView = React.createClass({

  getInitialState() {
    this.siteService = new SiteService();
    return {
      dataSource: this.siteService.getDataSource()
    }
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        >
      </ListView>
    );
  },

  _renderRow(rowData, sectionId, rowId) {
    return (
      <View>
        <TouchableHighlight underlayColor="#cff4ff" onPress={() => this._onSitePress(rowData)}>
          <View style={styles.listRow}>
            <Image
              resizeMode="stretch"
              source={rowData}
              style={styles.listRowImage}
            />
            <View style={styles.listRowTxtView}>
              <Text style={styles.listRowTxt}>
                {rowData.title}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
        <View style={Css.tableSeparator}></View>
      </View>
    )
  },

  _onSitePress(rowData) {
    this.props.navigator.push(Route.Category(rowData, this.props.navigator));
  }

});

var styles = StyleSheet.create({
  listRow: {
    flexDirection: 'row',
    padding: 16,
    height: 80
  },
  listRowImage: {
    flex: 3
  },
  listRowTxtView: {
    flex: 7,
    paddingLeft: 16,
    justifyContent: 'center'
  },
  listRowTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});


module.exports = IndexView;
