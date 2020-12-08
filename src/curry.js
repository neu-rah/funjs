"use strict";

// based from https://javascript.info/currying-partials
const curry=f=>function curried(...aa) {
  const a=aa.length?aa:[undefined]
  return a.length >= f.length?
    f.apply(this, a):
    function(...b) {return curried.apply(this, a.concat(b.length?b:undefined));}
};

exports.curry=curry

