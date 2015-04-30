class Route {

	static Index() {
		return {
			component: require('../view/index/index'),
			title: '请选择站点'
		}
	}

	static Category(siteInfo) {
		return {
			component: require('../view/comic/category'),
			title: siteInfo.title,
			passProps: {
				comicService: new siteInfo.service()
			}
		}
	}

	static ComicList(category, comicService) {
		return {
			component: require('../view/comic/list'),
			title: category.title,
			passProps: {
				url: category.url,
				comicService: comicService
			}
		}
	}

}

module.exports = Route;
