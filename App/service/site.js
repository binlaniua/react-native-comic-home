var React = require('react-native');


class SiteService {

  constructor() {
    this.dataSource = new React.ListView.DataSource({rowHasChanged: this._rowHasChanged});
  }

  getDataSource() {
    return this.dataSource.cloneWithRows(this.getSiteList());
  }

  getSiteList() {
    return [
      {
        title: '极速漫画',
        service: require('./site/jisu'),
        uri: 'http://css57.cnc.cdndm.com/blue/img/logo.png'
      },
      {
        title: 'KuKu漫画',
        service: require('./site/kuku'),
        uri: 'http://comic.kukudm.com/images/logo.gif'
      },
      {
        title: '动漫之家',
        site: '',
        uri: 'http://manhua.dmzj.com/css/img/mh_logo_dmzj.png?t=20131122'
      },
      {
        title: '吹雪动漫',
        site: '',
        uri: 'http://www.chuixue.com/template/skin4_20110501/images/logo.gif'
      },
      {
        title: '新动漫网',
        site: '',
        uri: 'http://www.xindm.cn/image/top/logo.jpg'
      }
    ];
  }

  _rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }
}

module.exports = SiteService;
