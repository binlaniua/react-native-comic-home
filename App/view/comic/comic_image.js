var React = require('react-native'),
  Dimensions = require('Dimensions'),
  Css = require('../../css/css');

var {
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animation,
  TouchableHighlight,
  StatusBarIOS
} = React;


var ComicImageView = React.createClass({

  getInitialState() {
    this.comicService = this.props.comicService;
    this.pageIndex = -1;
    return {
      source: ''
    }
  },

  componentDidMount() {
    //this.props.navigator.setHidden(true)
    StatusBarIOS.setHidden(true, StatusBarIOS.Animation.slide);
    this.imageWidth = Dimensions.get('window').width;
    this.btnWidth = this.imageWidth / 2;
    this.imageHeight = Dimensions.get('window').height - 44;
    this.comicService.addListener('imageList', this._onComicHandler.bind(this));
    this._loadMore(false);
  },

  componentWillUnmount() {
    //this.props.navigator.setHidden(false)
    StatusBarIOS.setHidden(false, StatusBarIOS.Animation.slide);
    this.comicService.removeListener('imageList');
    this.comicService.resetImageList();
  },

  render() {
    return (
      <View>

        <Image
            ref="imageView"
            resizeMode="stretch"
            style={[styles.image, {width: this.imageWidth, height: this.imageHeight}]}
            source={{uri: this.state.source}}
            onLoadingFinish={(event) => {
              this.isLoadding = false;
            }}

            >
        </Image>


        <TouchableHighlight underlayColor="rgba(210, 247, 255, 0)" style={[styles.leftBtn, {width: this.btnWidth, height: this.imageHeight}]} onPress={() => this._loadMore(true)}>
          <Text></Text>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="rgba(210, 247, 255, 0)" style={[styles.rightBtn, {width: this.btnWidth, height: this.imageHeight}]} onPress={() => this._loadMore(false)}>
          <Text></Text>
        </TouchableHighlight>
     </View>
    );
  },

  _loadMore(isPre) {
    if(!this.isLoadding){
      this.isLoading = true;
      this.pageIndex = this.pageIndex + (isPre ? -1 : 1);
      this.comicService.doImageList(this.props.vol.url, this.pageIndex);
      //console.error(`下一页${this.pageIndex}`);
    }
  },

  _onComicHandler(imageUrl) {
    this.setState({
      source: imageUrl
    });
  },

  _onComicPress(rowData) {
  }

});

var styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 0,
    top: 44
  },
  leftBtn: {
    //backgroundColor: '#ff0000',
    position: 'absolute',
    left: 0,
    top: 44
  },
  rightBtn: {
    //backgroundColor: '#00ff00',
    position: 'absolute',
    right: 0,
    top: 44
  }
});


module.exports = ComicImageView;
