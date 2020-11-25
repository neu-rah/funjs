"use strict";
//should be available throwgh Monoid also
// const {append,semigroupFunction,semigroupString,semigroupArray}=require("./src/Semigroup")
// semigroupFunction(Function().__proto__)
// semigroupString(String().__proto__)
// semigroupArray(Array().__proto__)

const func=require("./src/Functional")
const {id,fcomp,fchain,constant,flip,cons}=func

const monoid=require("./src/Monoid")
const {empty,append,mconcat,monoidFunction,monoidString,monoidArray}=monoid
monoidFunction(Function().__proto__)
monoidString(String().__proto__)
monoidArray(Array().__proto__)

const list=require("./src/List")
const {head,tail,listString,listArray}=list
listString(String().__proto__)
listArray(Array().__proto__)

const functor=require("./src/Functor")
const {map,drop}=functor

const pair=require("./src/Pair")
const {Pair,fst,snd,mbind}=pair

const maybe=require("./src/Maybe")
const {Maybe,isMaybe,Nothing,isNothing,Just,isJust,fromJust}=maybe

const either=require("./src/Either")
const {isEither,Left,isLeft,fromLeft,Right,isRight,fromRight}=either

const fold=require("./src/Foldable")
const {foldable,foldr,foldl,foldr1,foldl1,foldMap}=fold
foldable(String().__proto__)
foldable(Array().__proto__)

//republish imported modules
const pub=o=>Object.keys(o).forEach(k=>exports[k]=o[k])

pub(func)
pub(monoid)
pub(list)
pub(functor)
pub(pair)
pub(maybe)
pub(either)
pub(fold)
