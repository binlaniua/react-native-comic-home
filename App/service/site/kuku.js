var React = require('react-native'),
    Http = require('../http'),
    BaseSiteService = require('./base');


class ComicService extends BaseSiteService {

  constructor() {
    super();
    this.baseUrl = 'http://comic2.kukudm.com';
    this.baseImageUrl = 'http://n.kukudm.com/';
    this.otherComicList = [];
  }

  doImageList(volUrl, pageIndex){
    pageIndex = pageIndex < 0 ? 0 : pageIndex;
    var imageUrl = super(volUrl, pageIndex);
    if(imageUrl){
      this.emit('imageList', {i: pageIndex, u: imageUrl});
    }
    else{
      pageIndex++;
      var url = volUrl.replace(/\d+\.htm$/, `${pageIndex}.htm`);
      Http.getText(url, {}, {Referer: volUrl})
        .then((text) => {
          var m = /IMG\s+SRC='"[^"]+"([^']+)'/.exec(text);
          if(m){
            imageUrl = this.baseImageUrl + m[1];
            this.imageList.push(imageUrl);
            this.emit('imageList', {i: --pageIndex, u: imageUrl});
          }
          else{
            console.error(`${url}加载失败`);
          }
        });
    }
  }

  doCategory(url, pageIndex){
    pageIndex++;
    url = url.replace(/_\d+\.htm$/, `_${pageIndex}.htm`);
    Http.getSelect(url, {}, 'html/body/table[5]/tbody/tr/td[2]/dl:dd')
        .then((doms) => {
          var r;
          for(var i = 0; i < doms.length; i++){
            var domDD = doms[i],
                domImg = Http.parseInternal(domDD, 'a[1]/img'),
                domA = Http.parseInternal(domDD, 'a[2]');
            if(i % 2 == 0){
              r = [];
              this.categoryComicList.push(r);
            }
            var comic = {
              icon: this.baseUrl + domImg.attribs.src,
              title: domA.children[0].data,
              url: this.baseUrl + domA.attribs.href,
              count: '',
              updateTime: domDD.children[3].data,
              auth: ''
            };

            if(i != doms.length - 1){
              r.push(comic);
            }
            else{
              this.otherComicList.push(comic);
            }
          }

          if (this.otherComicList.length == 2){
            this.categoryComicList = this.categoryComicList.concat(this.otherComicList);
            this.otherComicList = [];
          }

          this.emit('categoryComicList', this.getCategoryComicList());
        });
  }

  doComicList(comic){
    Http.getSelect(comic.url, {})
        .then((dom) => {
          //读取状态，作者，简介
          var domTrs = Http.parseInternal(dom, 'html/body/table[5]/tr/td[2]/table/tr[1]/td/table:tr'),
              domTdOther = Http.parseInternal(domTrs[4], 'td'),
              domTdInfo = Http.parseInternal(domTrs[2], 'td');
          var other = domTdOther.children[0].data.split('|');
          comic.state = other[1].split('：')[1];
          comic.auth = other[1].split('：')[1];
          comic.info = domTdInfo.children[1].children[0].data;

          //读取多少话
          var doms = Http.parseInternal(dom, 'html/body/table[5]/tr/td[2]/table/tr[1]/td/table/tr[6]/td/dl:dd');
          for(var i = 0; i < doms.length; i++){
            var domA = Http.parseInternal(doms[i], 'a'),
                comicInfo = domA.children[0].data.split(/\s+/);
            this.comicList.push({
              title: comicInfo[comicInfo.length - 1],
              url: this.baseUrl + domA.attribs.href,
              desc: ''
            });
          }
          this.emit('comicList', this.getComicList());
        });
  }

  resetComicList() {
    super.resetComicList();
    this.otherComicList = [];
  }

  doCategoryList() {
    Http.getSelect('http://www.kukudm.com/', {}, 'html/body/table[3]/tbody/tr/td/table/tbody/tr/td[2]:a')
        .then((doms) => {
          var r = [];
          for(var i = 0; i < doms.length -2; i++){
            var domA = doms[i],
                title = domA.children[0].children[0].data,
                url = domA.attribs.href;
            r.push({
              title: title,
              url: this.baseUrl + url
            });
          }
          this.emit('category', this.getCatagoryList(r));
        });
  }
}

module.exports = ComicService;
