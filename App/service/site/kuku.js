var React = require('react-native'),
    Http = require('../http'),
    BaseSiteService = require('./base');


class ComicService extends BaseSiteService {

  constructor() {
    super();
    this.baseUrl = 'http://comic2.kukudm.com';
    this.otherComicList = [];
  }

  doImageList(volUrl, pageIndex){
    pageIndex = pageIndex < 0 ? 0 : pageIndex;
    var imageUrl = super(volUrl, pageIndex);
    if(imageUrl){
      this.emit('imageList', imageUrl);
    }
    else{
      var cid = /-(\d+)\/$/.exec(volUrl)[1],
          url = `${volUrl}chapterfun.ashx?cid=${cid}&page=${pageIndex + 1}&key=&maxcount=10`;
      Http.getText(url, {}, {Referer: url})
        .then((text) => {
          var r = eval(text);
          if(r){
            var hasO = r[0].indexOf('?') != -1;
            imageUrl = r[0] + (hasO ? '&' : '?') + `refer=${volUrl}`;
            this.imageList.push(imageUrl);
            this.emit('imageList', imageUrl);
          }
          else{
            console.error(url + '读取失败');
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
          var doms2 = Http.parseInternal(dom, '/html/body/div/div/div[1]/div[2]/div[1]/div[2]/ul:li');
          comic.state = doms2[1].children[1].children[0].data;
          comic.auth = doms2[2].children[1].children[0].data;
          comic.info = doms2[7].children[1].data;

          //读取多少话
          var doms = [];
          try{
            doms = Http.parseInternal(dom, 'html/body/div/div/div[1]/div[2]/div[4]/ul[3]:li');
          }
          catch(e){
            doms = Http.parseInternal(dom, 'html/body/div/div/div[1]/div[2]/div[4]/ul[2]:li');
          }
          for(var i = 0; i < doms.length; i++){
            var domA = Http.parseInternal(doms[i], 'a');
            this.comicList.push({
              title: domA.children[0].data,
              url: 'http://www.1kkk.com' + domA.attribs.href,
              desc: doms[i].children[1].data
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
