/**
 * @fileoverview pattern
 * @author dengfuping_develop@163.com
 */

import { uniqueId } from '@antv/util';

const regexPR = /^p\s*\(\s*([axyn])\s*\)\s*(.*)/i;

class Pattern {
  el: SVGPatternElement;
  id: string;
  cfg: {
    [key: string]: any;
  } = {};

  constructor(cfg) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'pattern');
    el.setAttribute('patternUnits', 'userSpaceOnUse');
    const child = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    el.appendChild(child);
    const id = uniqueId('pattern_');
    el.id = id;
    this.el = el;
    this.id = id;
    this.cfg = cfg;
    const arr = regexPR.exec(cfg);
    const source = arr[2];
    child.setAttribute('href', source);
    const img = new Image();
    if (!source.match(/^data:/i)) {
      img.crossOrigin = 'Anonymous';
    }
    img.src = source;
    function onload() {
      el.setAttribute('width', `${img.width}`);
      el.setAttribute('height', `${img.height}`);
    }
    if (img.complete) {
      onload();
    } else {
      img.onload = onload;
      // Fix onload() bug in IE9
      img.src = img.src;
    }

    return this;
  }

  match(type, attr) {
    return this.cfg === attr;
  }
}

export default Pattern;
