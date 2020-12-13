"use strict";

var it=exports?global:this
if(!exports) var exports={}

const pub=o=>Object.assign(exports,o)
const use=o=>pub(Object.assign(it,require(o)))
const using=(...oo)=>oo.map(use)

using(
  "./src/curry",
  "./src/Functional",
  "./src/Peano.js",
  "./src/Monoid",
  "./src/List",
  "./src/Functor",
  "./src/Applicative",
  "./src/Monad",
  "./src/Pair",
  "./src/Maybe",
  "./src/Either",
  "./src/Foldable",
)

monoidFunction(Function().__proto__)
monoidString(String().__proto__)
monoidArray(Array().__proto__)
monoidObject(Object().__proto__)

listString(String().__proto__)
listArray(Array().__proto__)

foldable(String().__proto__)
foldable(Array().__proto__)

exports.patchPrimitives=function(f,s,a,o) {
  //patch primitive data types for Monoid (and Semigroup)
  monoidFunction(f)
  monoidString(s)
  monoidArray(a)
  monoidObject(o)

  //patch primitive data types for List
  listString(s)
  listArray(a)

  //patch primitive data types for Foldable
  foldable(s)
  foldable(a)
}