"use strict";

//Monad typeclass methods mapping
exports.pure=o=>o.pure
exports.mbind=o=>o.mbind
exports.liftM=f=>o=>o.map(f)
exports.liftM2=f=>a=>b=>b.map(x=>a.map(f).app(x))