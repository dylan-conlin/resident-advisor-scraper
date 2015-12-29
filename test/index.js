import assert from 'assert';
import ResidentAdvisor from '../lib';


var api = new ResidentAdvisor();

describe('resident-advisor-scrape-api', () => {

  describe('getTrackList', () => {
    it('should find a tracklist', () => {
      api.getYoutubes('A Guy Called Gerald');
    })
    
    // it('should get an djs tracks', () => {
    //   api.getTracks().then((stuff) => {
    //     console.log(stuff)
    //   })
    //   // assert(api.square(2), 4);
    // });
  });


});
