import {createUseStyles} from 'react-jss';

// #carousel
const carousel = {
  'max-width': '1200px',
  'display': 'flex',
  'flex-direction': 'column',
  'margin': '0 auto',
  'position': 'relative',
}  

// .slide-indicators
const slideIndicators = {
  'display': 'flex',
  'justify-content': 'center',
}

// .slide-indicator
const slideIndicator = {
  'height': '44px',
  'width': '50px',
  'display': 'flex',
  'justify-items': 'center',
  'cursor': 'pointer',

  // .slide-indicator:after
  '&:after' : {
    'content': '',
    'background-color': '#878787',
    'height': '10px',
    'margin-top': '10px',
    'width': '40px',
  },

  // .slide-indicator.active:after,
  // .slide-indicator:hover:after
  '&.active:after, &:hover:after': {
    'background-color': '#000000',
  }
}

// .slide-banner
const slideBanner = {
  'background-color': '#000000',
  'color': '#ffffff',
  'position': 'absolute',
  'left': '0',
  'bottom': '20px',
  'padding': '15px',
  'font-size': '2.5vw',
  
  // .slide-banner a
  '& a': {
    'color': '#ffffff',
  }
}

// #slide-container
const slideContainer = {
  'scroll-snap-type': 'x mandatory',
  'overflow-x': 'scroll',
  'overflow-y': 'hidden',
  'display': 'flex',
  'align-items': 'center',
  'height': '100%',
  'gap': '10px',
  '-webkit-overflow-scrolling': 'touch',
  'scroll-behavior': 'smooth',
}

// .slide
const slide = {
  'scroll-snap-align': 'center',
  'position': 'relative',
  'min-width': '100%',
  'padding-top': '50%',

  // .slide img
  '& img': {
    'height': '100%',
    'width': 'auto',
    'position': 'absolute',
    'top': '0',
    'left': '0',
  }
}

// .arrow
const arrow = {
  'color': '#ffffff',
  'height': '20px',
  'width': '20px',
  'background-color': '#000000',
  'position': 'absolute',
  'padding': '10px',
  'opacity': '.3',
  'cursor': 'pointer',

  // .arrow.back
  '&.back': {
    'left': '10px',
    'top': '10px',
  },

  // .arrow.forward
  '& .forward': {
    'right': '10px',
    'top': '10px',
  },

  // .arrow:hover
  '&:hover': {
    'opacity': '1',
  }
}

const JSS = {
  arrow,
  carousel,
  slide,
  slideBanner,
  slideContainer,
  slideIndicator,
  slideIndicators
};

// useStyles gets replaced for AMP builds via `babel-plugin-transform-jss`.
// eslint-disable-next-line local/no-export-side-effect
export const useStyles = createUseStyles(JSS);
