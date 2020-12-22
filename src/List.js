"use strict";

const {curry}=require("./curry")
const {cons}=require("./Functional.js")
const {peano}=require("./Peano.js")
const {monoidString,monoidArray,empty,append}=require("./Monoid.js")
//because Lists are Monoids
//patch primitive data types
monoidString(String().__proto__)
monoidArray(Array().__proto__)

exports.listArray=o=>{
  o.head=function() {return this[0]}
  o.tail=function() {return this.slice(1)}
  o.last=function() {return this.slice(-1)[0]}
  o.init=function() {return this.slice(0,-1)}
  o.mconcat=function(){
    if(this.length==0) return [] //throw new Error("<funjs> mconcat of empty list")
    return this.length==1?this.head():this.head().append(this.tail().mconcat())
  }
  o.pure=o=>[o]
  o.app=function(p) {//applicative instance
    return (this.length&&p.length)?cons(this.head()(p.head()),this.tail().app(p.tail())):this.empty
  }
  o.drop=function(n) {return peano(n)(i=>i.tail())(this)}
  o.take=function(n) {return n?cons(this.head())(this.tail().take(n-1)):[]}
  o.elem=function(e) {return this.indexOf(e)!==-1}
  o.unique=function(){
    console.log("unique",this)
    const u=o=>oo=>oo.elem(o)?oo.unique():cons(o,oo.unique())
    return this.length?u(this.head())(this.tail()):[]
  }
  o.isEmpty=function() {return !this.length}
  o.partition=function(f) {
    return this.foldr(
      x=>o=>f(x)?
        Pair(o.fst().append(x),o.snd()):
        Pair(o.fst(),o.snd().append(x))
      )(Pair([],[]))
  }
  o.zipWith=function(f) {return zipWith(f)(this)}
}

exports.listString=o=>{
  o.head=function() {return this[0]}
  o.tail=function() {return this.substr(1)}
  o.last=function() {return this[this.length-1]}
  o.init=function() {return this.substr(0,this.length-1)}
  o.drop=function(n) {return this.substr(n)}
  o.take=function(n) {return this.substr(0,n)}
  o.elem=function(e) {return this.indexOf(e)!==-1}
  o.pure=o=>o.toString()
  o.unique=function() {
    const u=o=>oo=>oo.elem(o)?oo.unique():cons(o,oo.unique())
    return this.length?u(this.head())(this.tail()):""
  }
  o.filter=function(f) {return this.split("").filter(f).join("")}
  o.isEmpty=function() {return !this.length}
}

exports.listString(String().__proto__)
exports.listArray(Array().__proto__)

exports.head=o=>o.head()
exports.tail=o=>o.tail()
exports.init=o=>o.init()
exports.last=o=>o.last()
exports.elem=curry((o,oo)=>oo.elem(o))
exports.drop=curry((n,o)=>o.drop(n))
exports.take=curry((n,o)=>o.take(n))
exports.mconcat=o=>o.mconcat()
exports.unique=o=>o.unique()
exports.filter=curry((o,f)=>o.filter(f))
exports.isEmpty=o=>o.isEmpty()
exports.partition=o=>f=>o.partition(f)
