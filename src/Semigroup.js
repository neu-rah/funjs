"use strict";

const {curry}=require("./curry")
const {fcomp}=require("./Functional")

exports.semigroupFunction=o=>{
  o.append=function(p) {return fcomp(this,p)}
}

exports.semigroupString=function(o) {
  o.append=function(p) {return this+p}
}

exports.semigroupArray=o=>{
  o.append=function(p) {return this.concat(p)}
}

exports.semigroupObject=o=>{
  o.append=function(p) {return Object.assign(Object.assign({},this),p)}
}

exports.semigroupFunction(Function().__proto__)
exports.semigroupString(String().__proto__)
exports.semigroupArray(Array().__proto__)
exports.semigroupObject(Object().__proto__)

exports.append=curry((a,b)=>a.append(b))

