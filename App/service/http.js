var Q = require('q'),
	Parse = require('react-native-htmlview').parse;

class HttpClient {

	static parseInternal(dom, select) {
		if (!select) {
			return dom;
		}
		if (dom.children) {
			dom = dom.children;
		}
		var bs = select.split(':'),
			finalName = bs[1],
			selects = bs[0].split('/');
		for (var i = 0; i < selects.length; i++) {
			var select = selects[i],
				hasIndex = select.indexOf('['),
				index = hasIndex != -1 ? parseInt(select.substring(hasIndex + 1,
					select.length -
					1)) - 1 : 0,
				hit = -1;

			if (hasIndex != -1) {
				select = select.substring(0, hasIndex);
			}

			for (var j = 0; j < dom.length; j++) {
				if (dom[j].name && dom[j].name.toLowerCase() == select) {
					hit++;
					if (hit == index) {
						if (i != selects.length - 1) {
							dom = dom[j].children;
						} else {
							dom = dom[j];
						}
						break;
					}
				}
			}
		}

		if (finalName) {
			var result = [];
			dom = dom.children;
			for (var k = 0; k < dom.length; k++) {
				if (dom[k].name && dom[k].name.toLowerCase() == finalName) {
					result.push(dom[k]);
				}
			}
			dom = result;
		}
		return dom;
	}

	static parse(html, select) {
		var defer = Q.defer();
		var result = null;
		var p = new Parse.Parser(new Parse.DomHandler((err, dom) => {
			result = HttpClient.parseInternal(dom, select);
		}));
		p.write(html);
		p.done();

		defer.resolve(result);
		return defer.promise;
	}

	static getSelect(url, data, select, header) {
		return HttpClient.getText(url, data, header)
			.then((h) => {
				return HttpClient.parse(h, select);
			})
	}


	static getText(url, data, header) {
		return HttpClient.get(url, data, header)
			.then((body) => {
				return body.text();
			});
	}

	static get(url, data, header) {
		return exec('GET', url, data, header);
	}

	static post(url, data) {
		return exec('POST', url, data, header);
	}
}

var defaultHeader = {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36',
		'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
		'Accept-Encoding': ''
	},
	exec = function(method, url, data, header) {
		data = data || [];
		header = header || {};

		//
		var body = [];
		for (var k in data) {
			if (data[k]) {
				body.push(`${k}=${encodeURIComponent(data[k])}`);
			};
		}
		body = body.join('&');

		//
		for (var v in defaultHeader) {
			if (!header[v]) {
				header[v] = defaultHeader[v];
			}
		}

		//
		if (method == 'GET') {
			url = url + (url.indexOf('?') == -1 ? '' : '?') + body;
		}

		//
		return fetch(url, {
			method: method,
			headers: header,
			body: method == 'POST' ? body : ''
		}).catch((e) => {
			console.error(e);
		});
	};

module.exports = HttpClient;
