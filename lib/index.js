var cheerio = require('cheerio');
var request = require('request');
var Q = require('Q');
module.exports = class ResidentAdvisorScrapeApi {
  
  getTracks() {
    var dfd = Q.defer();
    request('http://www.residentadvisor.net/dj/aguycalledgerald/tracks', (err, resp, html) => {
      if (!err && resp.statusCode == 200) {
        var $ = cheerio.load(html);
        // dfd.resolve($('#tracks'));
        
        var tracks = []
        $('#tracks .title').each((i, element) => {
          tracks.push($(element).find('a').text());
        })
        dfd.resolve(tracks);
        
      } else {
        dfd.reject('no tracks');
      }
    });
    return dfd.promise;
  }
  
  mare() {
    return 'hii i am mare'
  }
  
}
