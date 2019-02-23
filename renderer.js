'use strict';

/* eslint-env browser */

const { webFrame } = require('electron');

const byt = document.getElementById('bimgyt');
const btw = document.getElementById('bimgtw');

webFrame.setZoomLevelLimits(1, 1);
/*
//POUR YOUTUBE
byt.onmousedown = () => {
  byt.style['width'] = '60px';
  byt.style['height'] = '60px';
}

byt.onmouseup = () => {
  byt.style['width'] = '50px';
  byt.style['height'] = '50px';
};
//POUR Twitter_Bird
btw.onmousedown = () => {
  btw.style['width'] = '60px';
  btw.style['height'] = '60px';
}

btw.onmouseup = () => {
  btw.style['width'] = '50px';
  btw.style['height'] = '50px';
};
*/
