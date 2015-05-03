var React = require('react-native'),
  Route = require('../../route/route'),
  SearchView = require('../../component/search_view'),
  Css = require('../../css/css');

var {
  Image,
  StyleSheet,
  ListView,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  AlertIOS
} = React;


var CategoryComicListView = React.createClass({

  getInitialState() {
    this.comicService = this.props.comicService;
    this.keyword = '';
    this.lastKeyword = null;
    this.pageIndex = -1;
    return {
      dataSource: this.comicService.getSearchList()
    };
  },

  componentDidMount() {
    this.comicService.addListener('search', (data) => this._onSearchHandler(data));
  },

  componentWillUnmount() {
    this.comicService.removeListener('search');
    this.comicService.resetSearchList();
  },

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        renderHeader={this._renderHeader}
        renderFooter={this._renderFooter}
        >
      </ListView>
    );
  },

  _loadMore(isMore, kk) {
    if(kk){
      this.keyword = kk;
    }
    if(this.keyword && (this.keyword != this.lastKeyword || isMore)){
      if(this.keyword != this.lastKeyword){
        this.comicService.resetSearchList();
        this.pageIndex = -1;
      }
      this.pageIndex++;
      this.lastKeyword = this.keyword;
      this.comicService.doSearch(this.keyword, this.pageIndex);
    }
  },

  _renderHeader(){
    return (
      <SearchView onSubmit={(text) => {this._loadMore(false, text)}}></SearchView>
    )
  },

  _renderFooter(){
    return (
      <TouchableHighlight underlayColor="#cff4ff" style={[styles.btnMore]} onPress={() => {this._loadMore(true)}}>
        <Text style={styles.btnMoreText}>{'更多'}</Text>
      </TouchableHighlight>
    );
  },

  _renderRow(rowData, sectionId, rowId) {
    return (
      <View>

        {this._renderCell(rowData)}

        <View style={Css.tableSeparator}></View>
      </View>
    )
  },

  _renderCell(rowData, isLeft) {
    return (
      <View style={[styles.listCell]}>
        <Image
          resizeMode="stretch"
          style={[styles.listCellImage]}
          source={{uri: rowData.icon}}
          />

        <View style={[Css.flexColumn, {paddingLeft: 8}]}>
          <Text style={styles.listCellTxtBold}>名称:{'    '}
						<Text style={styles.listCellTxt}>{rowData.title}</Text>
					</Text>

          {rowData.category ? <Text style={styles.listCellTxtBold}>分类:{'    '}
						<Text style={styles.listCellTxt}>{rowData.category.title}</Text>
					</Text> : null}

					{rowData.auth ? <Text style={styles.listCellTxtBold}>作者:{'    '}
						<Text style={styles.listCellTxt}>{rowData.auth}</Text>
					</Text> : null}

					{rowData.count ? <Text style={styles.listCellTxtBold}>最新:{'    '}
						<Text style={styles.listCellTxt}>{rowData.count}</Text>
					</Text> : null}

          {rowData.updateTime ? <Text style={styles.listCellTxtBold}>日期:{'    '}
						<Text style={styles.listCellTxt}>{rowData.updateTime}</Text>
					</Text> : null}
        </View>
      </View>
    );
  },

  _onSearchHandler(data) {
    this.setState({
      dataSource: data
    });
  },

  _onCategoryPress(rowData) {
    //this.props.navigator.push(Route.ComicList(rowData, this.comicService));
  },

  _onComicPress(rowData){

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
    flexDirection: 'column'
  },
  listCell: {
    flex: 1,
    flexDirection: 'row',
    padding: 8
  },
  listCellImage: {
    width: 150,
    height: 150
  },
  listCellTxtBold: {
    fontWeight: 'bold'
  },
  listCellTxt: {
    fontWeight: 'normal'
  }
});


module.exports = CategoryComicListView;
