# funjs
functional javascript

ongoing work.

This package aims to help with my parser combinator stuff (just)

**funjs** includes and exports this functions

  //Functional  
  id,fcomp,fchain,constant,flip,cons,

  //Monoid  
  empty,append,mconcat,monoidFunction,monoidString,monoidArray,

  //List  
  head,tail,listString,listArray,

  //Functor  
  map,drop,

  //Pair (tupple)  
  Pair,fst,snd,mbind,

  //Maybe  
  Maybe,isMaybe,Nothing,isNothing,Just,isJust,fromJust,

  //Either  
  isEither,Left,isLeft,fromLeft,Right,isRight,fromRight,

  //foldable  
  foldable,foldr,foldl,foldr1,foldl1,foldMap,

## `require` example

```javascript
const {
  //Functional
  id,fcomp,fchain,constant,flip,cons,
  //Monoid
  empty,append,mconcat,
  //List
  head,tail,listString,listArray,
  //Functor
  map,drop,
  //Pair (tupple)
  Pair,fst,snd,mbind,
  //Maybe
  Maybe,isMaybe,Nothing,isNothing,Just,isJust,fromJust,
  //Either
  isEither,Left,isLeft,fromLeft,Right,isRight,fromRight,
  //foldable
  foldr,foldl,foldr1,foldl1,foldMap,
} = require("<path>/funjs");

patchPrimitives(
  Function().__proto__,
  String().__proto__,
  Array().__proto__,
)
```