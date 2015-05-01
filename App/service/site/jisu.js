var React = require('react-native'),
    Http = require('../http'),
    BaseSiteService = require('./base');


class ComicService extends BaseSiteService {

  constructor() {
    super();
  }

  doImageList(url, pageIndex){
    var cid = /ch\d+-([^\/]+)/.exec(url)[1],
        url = `${url}chapterfun.ashx?cid=${cid}&page=${pageIndex + 1}&key=&maxcount=10`;
    Http.getText(url, {}, {Referer: url})
      .then((text) => {
        var r = eval(text);
        if(r){
          this.imageList.push(r[0]);
        }
        else{
          console.error(url + '读取失败');
        }
        this.emit('imageList', this.imageList);
      });
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
              this.categoryComicList.push(r);
            }
            r.push({
              icon: domImg.attribs.src,
              title: domA.children[3].data,
              url: 'http://www.1kkk.com' + domA.attribs.href,
              count: domCount.children[0].data.replace(/\[|\]/g, ''),
              updateTime: domP.children[3].data.trim().replace('更新时间', '').replace(/:|：/g, ''),
              auth: ''
            });
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
          var doms = Http.parseInternal(dom, 'html/body/div/div/div[1]/div[2]/div[4]/ul[3]:li');
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
}

module.exports = ComicService;
