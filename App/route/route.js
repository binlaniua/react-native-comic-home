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

	static CategoryComicList(category, comicService) {
		return {
			component: require('../view/comic/category_comic_list'),
			title: category.title,
			passProps: {
				url: category.url,
				comicService: comicService
			}
		}
	}

	static ComicList(comic, comicService) {
		return {
			component: require('../view/comic/comic_list'),
			title: comic.title,
			passProps: {
				comic: comic,
				comicService: comicService
			}
		}
	}

	static ComicImage(comic, vol, comicService) {
		return {
			component: require('../view/comic/comic_image'),
			title: vol.title,
			passProps: {
				comic: comic,
				vol: vol,
				comicService: comicService
			}
		}
	}

}

module.exports = Route;
