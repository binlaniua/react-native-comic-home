var React = require('react-native'),
  Dimensions = require('Dimensions'),
  Css = require('../../css/css');

var {
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableHighlight,
  StatusBarIOS
} = React;


var ComicImageView = React.createClass({

  getInitialState() {
    this.comicService = this.props.comicService;
    this.pageIndex = -1;
    return {
      dataSource: []
    }
  },

  componentDidMount() {
    //this.props.navigator.setHidden(true)
    StatusBarIOS.setHidden(true, StatusBarIOS.Animation.slide);
    this.imageWidth = Dimensions.get('window').width;
    this.imageHeight = Dimensions.get('window').height;
    this.comicService.addListener('imageList', this._onComicHandler.bind(this));
    this._loadMore();
  },

  componentWillUnmount() {
    //this.props.navigator.setHidden(false)
    StatusBarIOS.setHidden(false, StatusBarIOS.Animation.slide);
    this.comicService.removeListener('imageList');
    this.comicService.resetImageList();
  },

  render() {
    var imageViews = this.state.dataSource.map((rowData) => this._renderRow(rowData));
    return (
      <ScrollView
        ref="scrollView"
        horizontal={true}
        paginEnabled={true}
        contentInset={{top: 0}}
        onScroll={() => { console.log('onScroll!'); }}
        style={{}}
        >

        {imageViews}

     </ScrollView>
    );
  },

  _renderRow(rowData) {
    return (
      <View style={{backgroundColor: '#ff0000'}}>
        <Image
            resizeMode="stretch"
            style={[{flex:1, width: this.imageWidth, height: this.imageHeight}]}
            source={{uri: rowData}}
            >
        </Image>
      </View>
    );
  },

  _loadMore() {
    this.pageIndex++;
    this.comicService.doImageList(this.props.vol.url, this.pageIndex);
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
});


module.exports = ComicImageView;
