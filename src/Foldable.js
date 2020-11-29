"use strict";

const {curry}=require("./curry")
const {fcomp,flip}=require("./Functional")

const {monoidFunction,monoidString,monoidArray,empty,append}=require("./Monoid.js")
monoidFunction(Function().__proto__)
monoidString(String().__proto__)
monoidArray(Array().__proto__)

//Foldable typeclass methods mapping
const {head,tail}=require("./List")

const foldr1=curry((f,ta)=>ta.tail().foldr(f)(ta.head()))
const foldl1=curry((f,ta)=>ta.tail().foldl(f)(ta.head()))

exports.foldable=o=>{
  o.foldr=function(f) {return b=>this.length?tail(this).foldr(f)(f(head(this))(b)):b}
  o.foldl=function(f) {return this.foldr(flip(f))}
  o.foldMap=function(f) {return foldr1(a=>b=>b.append(a))(this.map(f))}
}

exports.foldable(String().__proto__)
exports.foldable(Array().__proto__)

//foldr::(a->b->b)->b->t a->b
exports.foldr=curry((f,b,ta)=>ta.foldr(f)(b))
exports.foldl=curry((f,b,ta)=>ta.foldl(f)(b))

//foldMap::Monoid m=>(a->m)->t a->m
exports.foldMap=curry((f,ta)=>ta.foldMap(f))
exports.foldr1=foldr1
exports.foldl1=foldl1
