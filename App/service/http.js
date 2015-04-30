var Q = require('q'),
    Parse = require('react-native-htmlview').parse;

class HttpClient {

  static parseInternal(dom, select) {
    if(dom.children){
      dom = dom.children;
    }
    var bs = select.split(':'),
        finalName = bs[1],
        selects = bs[0].split('/');
    for(var i = 0; i < selects.length; i++){
      let select = selects[i],
          hasIndex = select.indexOf('['),
          index = hasIndex != -1 ? parseInt(select.substring(hasIndex + 1, select.length - 1)) -1 : 0,
          hit = -1;

      if(hasIndex != -1){
        select = select.substring(0, hasIndex);
      }

      for(var j = 0; j < dom.length; j++){
        if(dom[j].name && dom[j].name.toLowerCase() == select){
          hit++;
          if(hit == index){
            if(i != selects.length - 1){
              dom = dom[j].children;
            }
            else{
              dom = dom[j];
            }
            break;
          }
        }
      }
    }

    if(finalName){
        var result = [];
        dom = dom.children;
        for(var k = 0; k < dom.length; k++){
          if(dom[k].name && dom[k].name.toLowerCase() == finalName){
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

  static getSelect(url, data, select) {
    return HttpClient.get(url, data)
        .then((body) => {
          return body.text();
        })
        .then((h) => {
          return HttpClient.parse(h, select);
        })
  }

  static get(url, data) {
    return fetch(url + (url.indexOf('?') != -1 ? '' : '?')).catch((err) => {
      var a = 1;
    });
  }

  static post(url, data) {
    return fetch(url, {
      method: 'POST'
    });
  }
}

module.exports = HttpClient;
