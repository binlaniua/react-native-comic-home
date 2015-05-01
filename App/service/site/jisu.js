var React = require('react-native'),
    Http = require('../http'),
    Event = require('../event');


class ComicService extends Event {

  constructor() {
    super();
    this.categoryDataSource = new React.ListView.DataSource({rowHasChanged: this._rowHasChanged});
    this.comicListDataSource = new React.ListView.DataSource({rowHasChanged: this._rowHasChanged});
    this.comicList = [];
  }

  doCategory(url, pageIndex){
    pageIndex++;
    url = url.replace(/\/$/g, '-p' + pageIndex + '/');
    Http.getSelect(url, {}, 'html/body/div/div/div[1]/div[2]/div[2]/ul:li')
        .then((doms) => {
          var r;
          for(var i = 0; i < doms.length; i++){
            var domP = Http.parseInternal(doms[i], 'p'),
                domA = Http.parseInternal(domP, 'a'),
                domCount = Http.parseInternal(domP, 'span[1]/a'),
                domImg = Http.parseInternal(domA, 'img');
            if(i % 2 == 0){
              r = [];
              this.comicList.push(r);
            }
            r.push({
              icon: domImg.attribs.src,
              title: domA.children[3].data,
              url: domA.attribs.href,
              count: domCount.children[0].data.replace(/\[|\]/g, ''),
              updateTime: domP.children[3].data.trim().replace('更新时间', '').replace(/:|：/g, ''),
              auth: ''
            });
          }
          this.emit('comicList', this.getComicList());
        });
  }

  doCategoryList() {
    Http.getSelect('http://www.1kkk.com/manhua-list', {}, 'html/body/div/div/div[1]/div[2]/div[1]/div/ul[2]:li')
        .then((doms) => {
          var r = [];
          for(var i = 2; i < doms.length; i++){
            var domA = doms[i].children[0],
                title = domA.children[0].data,
                url = domA.attribs.href;
            r.push({
              title: title,
              url: 'http://www.1kkk.com' + url
            });
          }
          this.emit('category', this.getCatagoryList(r));
        });
  }

  getComicList() {
    return this.comicListDataSource.cloneWithRows(this.comicList);
  }

  getCatagoryList(data) {
    return this.categoryDataSource.cloneWithRows(data || []);
  }

  resetComicList() {
    this.comicList = [];
  }

  _rowHasChanged(r1, r2) {
    return r1.title !== r2.title;
  }
}

module.exports = ComicService;
