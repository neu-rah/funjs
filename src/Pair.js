"use strict";

//patch primitive data types
const {monoidString,monoidArray,empty,append}=require("./Monoid.js")
monoidString(String().__proto__)
monoidArray(Array().__proto__)
const {head,tail,listArray,listString}=require("./List")
listArray(Array().__proto__)
listString(String().__proto__)
const {foldr,foldl,foldMap, foldable}=require("./Foldable")
foldable(Array().__proto__)
foldable(String().__proto__)

const PairClass=class Pair {
  constructor(a,b) {
    this.a=a
    this.b=b
    // this.fst=()=>a
    // this.snd=()=>b
  }
  fst() {return this.a}
  snd() {return this.b}
  map(f) {return new Pair(this.fst(),f(this.snd()))}
  append(o) {return new Pair(this.fst(),this.snd().append(o))}
  swap() {return new Pair(this.snd(),this.fst())}
  mbind(f) {return f(this)}//monad instance
  // pure(o) {return Pair(empty,o)}//<-empty of what?
  app(p) {//applicative instance
    return new Pair(this.fst().append(p.fst()),this.snd()(p.snd()))
  }
}

const Pair=curry((a,b)=>new PairClass(a,b))

exports.Pair=Pair
exports.PairClass=PairClass
exports.fst=o=>o.fst()
exports.snd=o=>o.snd()
// exports.mbind=o=>o.mbind
