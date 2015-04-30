

class Route {

  static Index() {
    return {
      component: require('../view/index/index'),
      title: '请选择站点'
    }
  }

  static SiteIndex(siteInfo) {
    return {
      component: siteInfo.component,
      title: siteInfo.title
    }
  }

  static Category(component, category, site) {
    return {
      component: component,
      title: category.title,
      passProps: {site: site, url: category.url, comicService: site.comicService}
    }
  }

}

module.exports = Route;
