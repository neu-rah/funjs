# funjs
functional javascript

ongoing work.

This package aims to help with my parser combinator stuff (just)

```javascript
const {
  patchPrimitives,//patch primitive data types
  curry,//js curry style
  id, fcomp, fchain, constant, flip, cons,//Functional
  empty, append, mconcat,//Monoid
  head, tail,//List
  map,//Functor
  pure, mbind,//Monad
  Pair, fst, snd,//Pair (tupple)
  Maybe, isMaybe, Nothing, isNothing, Just, isJust, fromJust,//Maybe
  isEither, Left, isLeft, fromLeft, Right, isRight, fromRight,//Either
  foldable, foldr, foldl, foldr1, foldl1, foldMap,//foldable
}=require("rsite-funjs");

//must patch primitive data-types so that we can do head([1]) or cons(1,[])
//among many other things
patchPrimitives(
  Function().__proto__,
  String().__proto__,
  Array().__proto__,
  Object().__proto__,
)
```