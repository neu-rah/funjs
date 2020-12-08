"use strict";

//because Monoids are Semigroups
const {
  semigroupFunction,
  semigroupString,
  semigroupArray,
  semigroupObject,
  append,
  // sconcat
}=require("./Semigroup.js")

semigroupFunction(Function().__proto__)
semigroupString(String().__proto__)
semigroupArray(Array().__proto__)
semigroupObject(Object().__proto__)

const {id}=require("./Functional");

exports.monoidFunction=o=>{
  semigroupFunction(o)
  o.empty=id
}

exports.monoidString=o=>{
  semigroupString(o)
  o.empty=""
}

exports.monoidArray=o=>{
  semigroupArray(o)
  o.empty=[]
}

exports.monoidObject=o=>{
  semigroupObject(o)
  o.empty={}
}

exports.monoidFunction(Function().__proto__)
exports.monoidString(String().__proto__)
exports.monoidArray(Array().__proto__)

exports.empty=o=>o.empty
exports.append=o=>o.append
