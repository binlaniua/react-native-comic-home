var React = require('react-native'),
  Css = require('../../css/css');

var {
  Image,
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight,
  AlertIOS
} = React;


var ComicListView = React.createClass({

  getInitialState() {
    this.comicService = this.props.comicService;
    this.pageIndex = -1;
    return {
      dataSource: this.comicService.getComicList()
    }
  },

  componentDidMount() {
    this.comicService.addListener('comicList', this._onComicHandler.bind(this));
    this._loadMore();
  },

  componentDidUnmount() {
    this.comicService.removeListener('comicList');
    this.comicService.resetComicList();
  },

  render() {
    return (
      <View style={styles.listCell}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderFooter={this._renderFooter}
          >
        </ListView>
      </View>
    );
  },

  _loadMore() {
    this.pageIndex++;
    this.comicService.doCategory(this.props.url, this.pageIndex);
  },

  _renderFooter(){
    return (
      <TouchableHighlight underlayColor="#cff4ff" style={[styles.btnMore]} onPress={this._loadMore.bind(this)}>
        <Text style={styles.btnMoreText}>{'更多'}</Text>
      </TouchableHighlight>
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
  btnMore: {
    backgroundColor: '#25b9e5',
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnMoreText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  listRow: {
    flex: 1,
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
