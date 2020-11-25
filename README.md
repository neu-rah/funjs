# funjs
functional javascript

ongoing work.

This package aims to help with my parser combinator stuff (just)

```javascript
const {
  patchPrimitives,//patch primitive data types
  id,fcomp,fchain,constant,flip,cons,//Functional
  empty,append,mconcat,//Monoid
  map,drop,//Functor
  pure,mbind,//Monad
  foldable,foldr,foldl,foldr1,foldl1,foldMap,//Foldable
  head,tail,//List
  Pair,fst,snd,//Pair (tupple)
  Maybe,isMaybe,Nothing,isNothing,Just,isJust,fromJust,//Maybe
  isEither,Left,isLeft,fromLeft,Right,isRight,fromRight,//Either
} = require("<path>/funjs.git");

patchPrimitives(
  Function().__proto__,
  String().__proto__,
  Array().__proto__,
)
```