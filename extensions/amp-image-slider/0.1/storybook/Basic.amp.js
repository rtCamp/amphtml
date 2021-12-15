import {withAmp} from '@ampproject/storybook-addon';
import {text, withKnobs} from '@storybook/addon-knobs';

import * as Preact from '#preact';

export default {
  title: 'Image Slider',
  decorators: [withKnobs, withAmp],

  parameters: {
    extensions: [{name: 'amp-image-slider', version: 0.1}],
  },
};

export const Default = () => {
  const first = text(
    'First image',
    'https://amp.dev/static/samples/img/canoe_900x600.jpg'
  );
  const second = text(
    'Second image',
    'https://amp.dev/static/samples/img/canoe_900x600_blur.jpg'
  );

  return (
    <>
      <amp-image-slider width="600" height="300" layout="fixed">
        <amp-img src={first} alt={'First image'} layout="fill"></amp-img>
        <amp-img src={second} alt={'Second iamge'} layout="fill"></amp-img>
        <div first class="label label-left-center">
          Red
        </div>
        <div second class="label label-right-center">
          Green
        </div>
      </amp-image-slider>
      <style amp-custom>
        {`
    .label {
      color: white;
      background-color: rgba(0, 0, 0, 0.4);
      width: 5rem;
      padding: 1rem 0;
      text-align: center;
      font-weight: bold;
    }
    .label-left-center {
      top: 50%;
      left: 1rem;
      transform: translateY(-50%);
    }
    .label-right-center {
      top: 50%;
      right: 1rem;
      transform: translateY(-50%);
    }
    .triangle-hint .amp-image-slider-hint-left {
      width: 10px;
      height: 20px;
      background-size: 10px 20px;
      margin-right: 10px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='20' viewBox='0 0 10 20'%3e%3cpolygon points='10,0 0,10 10,20' style='fill:white' /%3e%3c/svg%3e");
    }
    .triangle-hint .amp-image-slider-hint-right {
      width: 10px;
      height: 20px;
      background-size: 10px 20px;
      margin-left: 10px;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='20' viewBox='0 0 10 20'%3e%3cpolygon points='0,0 10,10 0,20' style='fill:white' /%3e%3c/svg%3e");
    }
    .slider-no-display .amp-image-slider-hint-left, .slider-no-display .amp-image-slider-hint-right {
      display: none;
    }
    .seek-button-container {
      display: flex;
      justify-content: space-around;
      padding: 1rem;
    }
  `}
      </style>
    </>
  );
};

Default.storyName = 'default';

export const CustomHints = () => {
  const first = text(
    'First image',
    'https://amp.dev/static/samples/img/canoe_900x600.jpg'
  );
  const second = text(
    'Second image',
    'https://amp.dev/static/samples/img/canoe_900x600_blur.jpg'
  );

  return (
    <amp-image-slider width="600" height="300" layout="fixed">
      <amp-img src={first} alt={'First image'} layout="fill"></amp-img>
      <amp-img src={second} alt={'Second image'} layout="fill"></amp-img>
      <style jsx global>
        {`
          .amp-image-slider-hint-right {
            width: 10px;
            height: 20px;
            background-size: 10px 20px;
            margin-left: 10px;
            background-image: url("data:image/svg+xml;charset=utf-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='20' viewBox='0 0 10 20'%3e%3cpolygon points='0,0 10,10 0,20' style='fill:white;stroke:black;stroke-width:1' /%3e%3c/svg%3e");
          }
        `}
      </style>
      <style jsx global>
        {`
          .amp-image-slider-hint-left {
            width: 10px;
            height: 20px;
            background-size: 10px 20px;
            margin-right: 10px;
            background-image: url("data:image/svg+xml;charset=utf-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='10' height='20' viewBox='0 0 10 20'%3e%3cpolygon points='10,0 0,10 10,20' style='fill:white;stroke:black;stroke-width:1' /%3e%3c/svg%3e");
          }
        `}
      </style>
    </amp-image-slider>
  );
};

CustomHints.storyName = 'custom-hints';
