var React = require('react-native'),
    Http = require('../http'),
    Event = require('../event');


class BaseSiteService extends Event {

  constructor() {
    super();
    this.categoryDataSource = new React.ListView.DataSource({rowHasChanged: this._rowHasChanged});
    this.categoryComicListDataSource = new React.ListView.DataSource({rowHasChanged: this._rowHasChanged});
    this.comicListDataSource = new React.ListView.DataSource({rowHasChanged: this._rowHasChanged});
    this.categoryComicList = [];
    this.comicList = [];
    this.imageList = [];
  }

  doCategory(url, pageIndex){
  }

  doComicList(url){
  }

  doCategoryList() {
  }

  doImageList(url, pageIndex){
    if(pageIndex < this.imageList.length){
      return this.imageList[pageIndex];
    }
  }

  getCategoryComicList() {
    return this.categoryComicListDataSource.cloneWithRows(this.categoryComicList);
  }

  getCatagoryList(data) {
    return this.categoryDataSource.cloneWithRows(data || []);
  }

  getComicList() {
    return this.comicListDataSource.cloneWithRows(this.comicList);
  }

  resetImageList() {
    this.imageList = [];
  }

  resetCategory() {
    this.categoryComicList = [];
    this.resetComicList();
  }

  resetComicList() {
    this.comicList = [];
    this.resetImageList();
  }

  _rowHasChanged(r1, r2) {
    return r1.title !== r2.title;
  }
}

module.exports = BaseSiteService;
