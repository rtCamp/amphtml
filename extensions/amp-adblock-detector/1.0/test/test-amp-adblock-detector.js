import '../amp-adblock-detector';
import {htmlFor} from '#core/dom/static-template';

import {toggleExperiment} from '#experiments';

import {waitFor} from '#testing/helpers/service';

describes.realWin(
  'amp-adblock-detector-v1.0',
  {
    amp: {
      extensions: ['amp-adblock-detector:1.0', 'amp-ad:0.1'],
      //mockFetch: true,
    },
    //mockFetch: true,
  },
  (env) => {
    let win;
    let doc;
    let html;

    beforeEach(async () => {
      win = env.win;
      doc = win.document;
      html = htmlFor(doc);
      toggleExperiment(win, 'bento-adblock-detector', true, true);
    });

    it('should show fallback', async () => {
      env.fetchMock.mock('https://doubleclick.net', 503);
      debugger;
      // win
      //   .fetch('https://doubleclick.net')
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      const element = html`
        <amp-adblock-detector
          layout="fixed"
          width="120"
          height="600"
          style="margin: 10px"
        >
          <amp-ad
            width="120"
            height="600"
            type="doubleclick"
            data-slot="/21730346048/test-skyscraper"
          >
            <div fallback>
              <p>Error while loading Ad</p>
            </div>
          </amp-ad>
          <div
            status="blocked"
            style="border: 2px solid red; border-radius: 10px; padding: 5px;"
          >
            <h2>Ad Blocker Detected</h2>
            <p>Please allow ads to run on this page.</p>
          </div>
        </amp-adblock-detector>
      `;
      doc.body.appendChild(element);
      await waitFor(() => element.isConnected, 'element connected');
      await element.buildInternal();
      await element.layoutCallback();
      //console.log(element);
      //debugger;
      expect(env.fetchMock.done()).to.equal('x');
      expect(element.parentNode).to.equal(doc.body);
    });
  }
);
