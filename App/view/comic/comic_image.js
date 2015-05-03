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
    this.imageViewSize = 5;
    return {
      dataSource: []
    }
  },

  componentDidMount() {
    //this.props.navigator.setHidden(true)
    StatusBarIOS.setHidden(true, StatusBarIOS.Animation.slide);
    this.imageWidth = Dimensions.get('window').width;
    this.btnWidth = this.imageWidth / 2;
    this.imageHeight = Dimensions.get('window').height - 44;
    this.comicService.addListener('imageList', this._onComicHandler.bind(this));
    this._load();
  },

  componentWillUnmount() {
    //this.props.navigator.setHidden(false)
    StatusBarIOS.setHidden(false, StatusBarIOS.Animation.slide);
    this.comicService.removeListener('imageList');
    this.comicService.resetImageList();
  },

  render() {
    var imageViews = [];
    for(var i = 0; i < this.imageViewSize; i++){
      imageViews.push(this._renderImage(i));
    }
    return (
      <View>

        {imageViews}


        <TouchableHighlight underlayColor="rgba(210, 247, 255, 0)" style={[styles.leftBtn, {width: this.btnWidth, height: this.imageHeight}]} onPress={() => this._loadMore(true)}>
          <Text></Text>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="rgba(210, 247, 255, 0)" style={[styles.rightBtn, {width: this.btnWidth, height: this.imageHeight}]} onPress={() => this._loadMore(false)}>
          <Text></Text>
        </TouchableHighlight>
     </View>
    );
  },

  _renderImage(index) {
    var imageViewIndex = this.pageIndex < 0 || !this.startTouch ? 0 : this.pageIndex % this.imageViewSize,
        left = index != imageViewIndex ? this.imageWidth : 0,
        refName = `imageViewIndex${index}`;

    if(left == 0){
      console.info(`正在显示第${index}张图`)
    }

    return (
      <Image
          ref={refName}
          resizeMode="stretch"
          style={[styles.image, {left: left, width: this.imageWidth, height: this.imageHeight}]}
          source={{uri: this.state.dataSource[index]}}
          onLoadingFinish={(event) => {
            this.isLoadding = false;
          }}
          >
      </Image>
    );
  },

  _load() {
    for(var i = 0; i < this.imageViewSize; i++){
      this.pageIndex++;
      this.comicService.doImageList(this.props.vol.url, this.pageIndex);
    }
  },

  _loadMore(isPre) {
    this.startTouch = true;
    this.pageIndex = this.pageIndex + (isPre ? -1 : 1);
    this.comicService.doImageList(this.props.vol.url, this.pageIndex);
  },

  _onComicHandler(imageUrl) {
    var i = imageUrl.i,
        u = imageUrl.u;
    this.state.dataSource[i % this.imageViewSize] = u;
    this.setState({dataSource: this.state.dataSource});
  },

  _onComicPress(rowData) {
  }

});

var styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 64
  },
  leftBtn: {
    //backgroundColor: '#ff0000',
    position: 'absolute',
    left: 0,
    top: 64
  },
  rightBtn: {
    //backgroundColor: '#00ff00',
    position: 'absolute',
    right: 0,
    top: 64
  }
});


module.exports = ComicImageView;
