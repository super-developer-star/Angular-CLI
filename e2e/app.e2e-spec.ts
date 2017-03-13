import { TF1ConsoSitePage } from './app.po';

describe('tf1-conso-site App', function() {
  let page: TF1ConsoSitePage;

  beforeEach(() => {
    page = new TF1ConsoSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
