"use strict";

//based from https://javascript.info/currying-partials
const curry=f=>function curried(...a) {
  return a.length >= f.length?
    f.apply(this, a):
    function(...b) {return curried.apply(this, a.concat(b));}
};

exports.curry=curry

