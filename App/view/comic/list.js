var React = require('react-native'),
  Css = require('../../css/css');

var {
  Image,
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight
} = React;


var ComicListView = React.createClass({

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

  componentDidUnmount() {
    this.comicService.removeListener('comicList');
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

        <View style={styles.listRow}>
          {this._renderCell(rowData[0], true)}
          <View style={Css.collectionSeparator}></View>
          {this._renderCell(rowData[1], false)}
        </View>

        <View style={Css.tableSeparator}></View>
      </View>
    )
  },

  _renderCell(rowData, isLeft) {
    return (
      <View style={[styles.listCell]}>
        <TouchableHighlight style={isLeft ? Css.paddingLeft : Css.paddingRight} underlayColor="#cff4ff" onPress={() => this._onCategoryPress(rowData)}>
          <View>
            <Image
              resizeMode="stretch"
              style={[styles.listCellImage]}
              source={{uri: rowData.icon}}
              />

            <View style={[styles.listCellView]}>
              <Text style={styles.listCellTxtBold}>
                {rowData.title}
              </Text>
              <Text style={[styles.listCellTxt]}>
                {rowData.count}
              </Text>
            </View>

            <View style={[styles.listCellView]}>
              <Text style={styles.listCellTxt}>
                {rowData.auth}
              </Text>
              <Text style={[styles.listCellTxt]}>
                {rowData.updateTime}
              </Text>
            </View>
          </View>
        </TouchableHighlight>

      </View>
    );
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
  },
  listCell: {
    flex: 1,
    flexDirection: 'column'
  },
  listCellImage: {
    flex: 1,
    height: 150
  },
  listCellView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 4
  },
  listCellTxtBold: {
    fontWeight: 'bold'
  },
  listCellTxt: {
  }
});


module.exports = ComicListView;
