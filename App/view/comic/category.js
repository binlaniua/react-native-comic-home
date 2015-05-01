var React = require('react-native'),
  Route = require('../../route/route'),
  Css = require('../../css/css');

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
      dataSource: this.comicService.getCatagoryList()
    }
  },

  componentDidMount() {
    this.comicService.addListener('category', (data) => {this._onCategoryHandler(data)});
    this.comicService.doCategoryList();
  },

	componentWillUnmount() {
		this.comicService.removeListener('category');
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

  _onCategoryHandler(data) {
    this.setState({
      dataSource: data
    });
  },

  _onCategoryPress(rowData) {
    this.props.navigator.push(Route.CategoryComicList(rowData, this.comicService));
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
