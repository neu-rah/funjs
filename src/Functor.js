"use strict";

const {curry}=require("./curry")
const { cons } = require("./Functional");

//Functor typeclass methods mapping
const _map=curry((f,o)=>(o.length?cons(f(o.head()),_map(f)(o.tail())):o))
exports.map=curry((f,o)=>o.map?o.map(f):_map(f)(o))
// exports.drop=curry((n,o)=>n?this.drop(n-1)(o.tail()):o)
