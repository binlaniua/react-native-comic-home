var React = require('react-native'),
    Http = require('../http'),
    BaseSiteService = require('./base');


class ComicService extends BaseSiteService {

  constructor() {
    this.baseUrl = 'http://www.1kkk.com/';
    super();
  }

  doSearch(keyword, pageIndex){
    pageIndex++;
    var url = `http://www.1kkk.com/search?page=${pageIndex}&title=${keyword}&language=1`;
    Http.getSelect(url, {}, 'html/body/div/div/div[1]/div[2]/div[2]/div:ul')
      .then((doms) => {
        for(var i = 1; i < doms.length; i++){
          var domUl = doms[i],
              domLis = Http.parseInternal(domUl, ':li'),
              domLiComic = domLis[0],
              domLiImage = Http.parseInternal(domLiComic, 'dl/dt/img'),
              domLiTitleContainer = Http.parseInternal(domLiComic, 'dl/dd/span'),
              domLiAuth = domLis[1],
              domLiCategory = domLis[2],
              domUpdateTtime = domLis[4];

          //
          var domTitle = Http.parseInternal(domLiTitleContainer, 'a').children,
              domCount = Http.parseInternal(domLiTitleContainer, 'span');

          //
          var title = '';
          for(var j = 0; j < domTitle.length; j++){
            if(domTitle[j].name){
              title += domTitle[j].children[0].data;
            }
            else{
              title += domTitle[j].data;
            }
          }

          //
          var comic = {
            title: title,
            icon: domLiImage.attribs.src,
            auth: domLiAuth.children[1].children[0].data,
            updateTime: domUpdateTtime.children[0].children[0].data,
            count: domCount.children[1].children[0].data.replace(/\s+/g, ''),
            category: {
              title: domLiCategory.children[1].children[0].data,
              url: this.baseUrl + domLiCategory.children[1].attribs.href
            }
          };
          this.searchList.push(comic);
          this.emit('search', this.getSearchList());
        }
      });
  }

  doImageList(volUrl, pageIndex){
    pageIndex = pageIndex < 0 ? 0 : pageIndex;
    var imageUrl = super(volUrl, pageIndex);
    if(imageUrl){
      if(imageUrl != -1)
        this.emit('imageList', {i: pageIndex, u: imageUrl});
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
            this.emit('imageList', {i: pageIndex, u: imageUrl});
          }
          else{
            console.error(url + '读取失败');
          }

        });
    }

    if(this.maxImageSize == Number.MAX_VALUE){
      this.maxImageSize--;
      Http.getSelect(volUrl, {}, 'html/body/div[3]:a')
        .then((doms) => {
          this.maxImageSize = parseInt(doms.pop().children[0].data);
        });
    }
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
