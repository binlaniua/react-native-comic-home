var React = require('react-native'),
  Css = require('../../../css/css');

var {
  Image,
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight
} = React;


var CategoryView = React.createClass({

  getInitialState() {
    this.comicService = this.props.comicService;
    return {
      dataSource: this.comicService.getComicList()
    }
  },

  componentDidMount() {
    this.comicService.addListener('comicList', this._onComicHandler.bind(this));
    this.comicService.doCategory(this.props.url);
  },

  componentDidUnMount() {
    this.comicService.removeListener('comicList', this._onComicHandler);
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
        <TouchableHighlight underlayColor="#cff4ff" onPress={() => this._onCategoryPress(rowData)}>
          <View style={styles.listRow}>
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

  _onComicHandler(data) {
    this.setState({
      dataSource: data
    });
  },

  _onCategoryPress(rowData) {

  }

});

var styles = StyleSheet.create({
  listRow: {
    flexDirection: 'row',
    padding: 16,
    height: 80
  },
  listRowTxtView: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center'
  },
  listRowTxt: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});


module.exports = CategoryView;
