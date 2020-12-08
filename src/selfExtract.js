"use strict";

//neu-rah Dec2020

//need not be a function
// const SelfExtractClass=class SelfExtract {
//   constructor(o) {this.valueOf=()=>o}
// }

//but if it is we have a nicer show
const SelfExtractClass=class SelfExtract extends Function {
  constructor(o) {
    super('o', 'return o')
    return this.bind(this,o)
  }
  valueOf() {return this()}
}

const SelfExtract=(...o)=>new SelfExtractClass(...o)

exports.SelfExtractClass=SelfExtractClass
exports.SelfExtract=SelfExtract//you should not need this
