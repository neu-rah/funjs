"use strict";

const {curry}=require("./curry")
const {fcomp,id}=require("./Functional.js")

const succ=curry((n,f)=>fcomp(f)(n(f)))
const peano=n=>n>1?succ(peano(n-1)):id

exports.peano=peano
exports.succ=succ
