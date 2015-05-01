var React = require('react-native'),
	Route = require('../../route/route'),
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

  componentWillUnmount() {
    this.comicService.removeListener('comicList');
    this.comicService.resetComicList();
  },

  render() {
    return (
      <View style={styles.listCell}>
        <ListView
					renderHeader={this._renderHeader}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          >
        </ListView>
      </View>
    );
  },

  _loadMore() {
    this.pageIndex++;
    this.comicService.doComicList(this.props.comic, this.pageIndex);
  },

	_renderHeader(){
		return (
			<View style={[Css.flexRow]}>
				<Image
					style={styles.listHeaderImage}
					resizeMode="stretch"
					source={{uri: this.props.comic.icon}}
					>
				</Image>

				<View style={[Css.flexColumn, Css.flexItem, {height: 240, paddingLeft: 8}]}>
					<Text style={styles.listCellTxtBold}>状态:{'    '}
						<Text style={styles.listCellTxt}>{this.props.comic.state}</Text>
					</Text>

					<Text style={styles.listCellTxtBold}>作者:{'    '}
						<Text style={styles.listCellTxt}>{this.props.comic.auth}</Text>
					</Text>

					<Text style={styles.listCellTxtBold}>简介:{'    '}
						<Text style={styles.listCellTxt}>{this.props.comic.info}</Text>
					</Text>
				</View>
			</View>
		);
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

				<View style={[styles.listCell]}>
	        <TouchableHighlight underlayColor="#cff4ff" onPress={() => this._onComicPress(rowData)}>
            <View style={[styles.listCellView]}>
              <Text style={styles.listCellTxtBold}>
                {rowData.title}
              </Text>
              <Text>
                {rowData.desc}
              </Text>
            </View>
	        </TouchableHighlight>
	      </View>

        <View style={Css.tableSeparator}></View>
      </View>
    )
  },

  _onComicHandler(data) {
    this.setState({
      dataSource: data
    });
  },

  _onComicPress(rowData) {
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
	listHeaderImage: {
		width: 180,
		height: 240,
		flex: 1
	},
  listRow: {
    flex: 1,
    flexDirection: 'row',
  },
  listCell: {
    flex: 1,
		padding: 8,
    flexDirection: 'column',
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
		fontWeight: 'normal',
		paddingLeft: 8
	}
});


module.exports = ComicListView;
