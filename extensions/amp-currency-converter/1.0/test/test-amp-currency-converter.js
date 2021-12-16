import '../amp-currency-converter';
import {htmlFor} from '#core/dom/static-template';
import {toggleExperiment} from '#experiments';
import {waitFor} from '#testing/helpers/service';

describes.realWin(
  'amp-currency-converter-v1.0',
  {
    amp: {
      extensions: ['amp-currency-converter:1.0'],
    },
  },
  (env) => {
    let win;
    let doc;
    let html;

    beforeEach(async () => {
      win = env.win;
      doc = win.document;
      html = htmlFor(doc);
      toggleExperiment(win, 'bento-currency-converter', true, true);
    });

    // DO NOT SUBMIT: This is example code only.
    it('example test renders', async () => {
      const element = html` <amp-currency-converter></amp-currency-converter> `;
      doc.body.appendChild(element);
      await waitFor(() => element.isConnected, 'element connected');
      expect(element.parentNode).to.equal(doc.body);
    });
  }
);
