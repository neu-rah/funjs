"use strict";

const {curry}=require("./curry")

//some pure functional utilities
exports.id=o=>o
exports.constant=curry((o,_)=>o)
exports.flip=curry((f,a,b)=>f(b)(a))
const arrayCons=curry((o,oo)=>(oo.unshift(o),oo))
const stringCons=curry((o,oo)=>o+oo)
const cons=curry((o,oo)=>oo.unshift?arrayCons(o,oo):stringCons(o,oo))
exports.cons=curry((o,oo)=>typeof oo==="undefined"?oos=>cons(o,oos):cons(o,oo))

//function composition in js style (multiple arguments)
function fc(fs) {
  return function(o) {return fs.length?fs.shift()(fc(fs)(o)):o}
}

exports.fcomp=curry((f,g,o)=>f(g(o)))
exports.fchain=(...fs)=>fc(fs)
