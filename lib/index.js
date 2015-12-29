var cheerio = require('cheerio');
var request = require('request');
var Q = require('Q');
var _ = require('underscore');
var Youtube = require('youtube-node');
var youtube = new Youtube();
youtube.setKey('AIzaSyC7WXxtGETz-AjA-x_mQwU3iReG7R1iARY');

module.exports = class ResidentAdvisor {


  getYoutubeFor(track) {
    var dfd = Q.defer();
    youtube.search(track.title, 1, (err, result) => {
      if (err) {
        dfd.reject(err);
      } else {
        var id = result.items[0].id.videoId;
        track.youtube = `https://www.youtube.com/watch?v=${id}`;
        dfd.resolve(track);
      }
    });
    return dfd.promise;
  }

  addYoutubeToTracks(tracks) {
    var tracksWithYoutubes = _.map(tracks, (track) => {
      return this.getYoutubeFor(track).then((newTrack) => { return newTrack; });
    });

    Q.all(tracksWithYoutubes).then((results) => {
      console.log(results);
      console.log(results.length);
    });
  }

  getYoutubes(dj) {
    this.getChartedTracksFor(dj).then((chartedTracks) => {
      this.addYoutubeToTracks(chartedTracks);
    });
  }

  getChartedTracksFor(dj) {
    var dfd = Q.defer();
    var DjName = dj.replace(/\s/g, '').toLowerCase();
    request(`http://www.residentadvisor.net/dj/${DjName}/tracks?sort=mostcharted`, (err, resp, html) => {
      if (!err && resp.statusCode === 200) {
        var $ = cheerio.load(html);
        var $tracks = $('#tracks li');
        var tracks = [];
        _.each($tracks, (track) => {
          var chartCount = $(track).find('.chartings a').text().replace('chartings', '').trim();
          if (chartCount && chartCount.length > 0) {
            var song = {};
            song.title = $(track).find('.title a[href*=track]').eq(0).text();
            song.artist = $(track).find('.title a[href*=dj]').eq(0).text();
            song.image = $(track).find('.image img').eq(0).attr('src');
            song.label = $(track).find('.title a[href*=label]').text();
            song.chartCount = chartCount;
            tracks.push(song);
          }
        });
        if (tracks && tracks.length > 0) {
          dfd.resolve(tracks);
        } else {
          dfd.reject('There is no tracklist found at that url');
        }
      } else {
        dfd.reject(err);
      }
    });
    return dfd.promise;
  }

  getTopArtists() {
    var dfd = Q.defer();
    request('http://www.residentadvisor.net/dj.aspx', (err, resp, html) => {
      if (!err && resp.statusCode === 200) {
        var $ = cheerio.load(html);
        var $artists = $('.content a[href*=dj]');
        var artists = [];
        _.each($artists, (artist) => {
          var name = $(artist).text();
          if (name && name.length > 0) {
            artists.push(name);
          }
        });
        dfd.resolve(artists);
      } else {
        dfd.reject(err);
      }
    });
    return dfd.promise;
  }
};
