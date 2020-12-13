"use strict";

const {curry}=require("./curry")

exports.mzero=o=>o.mzero
exports.mplus=curry((o,p)=>o.mplus(p))