import assert from 'assert';
import ResidentAdvisorScrapeApi from '../lib';


var api = new ResidentAdvisorScrapeApi();

describe('resident-advisor-scrape-api', () => {

  describe('getTracks', () => {
    it('should get an djs tracks', () => {
      api.getTracks().then((stuff) => {
        console.log(stuff)
      })
      // assert(api.square(2), 4);
    });
  });

  it('should return hi im here', () => {
    assert(api.mare(), 'hii i am mare');
  });
});
