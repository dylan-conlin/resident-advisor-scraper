import assert from 'assert';
import ResidentAdvisor from '../lib';


var api = new ResidentAdvisor();

describe('resident-advisor-scrape-api', () => {

  describe('getTrackList', () => {
    it('should find a tracklist', () => {
      api.getCompleteTracksFor('A Guy Called Gerald').then(console.log)
    });
    // api.getTopArtists().then(console.log);
  })
  
  // it('should get an djs tracks', () => {
  //   api.getTracks().then((stuff) => {
  //     console.log(stuff)
  //   })
  //   // assert(api.square(2), 4);
  // });
});


