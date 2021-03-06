"use strict";

const T_Maybe=class Maybe {
  pure(o) {return Just(o)}
};

const Maybe=new T_Maybe()

const isMaybe=o=>T_Maybe.prototype.isPrototypeOf(o);

const TC_Nothing=class Nothing extends T_Maybe {
  constructor() {return super();}
  map(_) {return this}
  append(mo) {return mo}
  when(_) {return this}//applicative instance this <* o | this << o
  then(_) {return this}//applicative instance this *> o | this >> o
  or(o) {return o}
  app(o) {return this}// (<*>) :: f (a -> b) -> f a -> f b
  //mbind::m a->(a->m b)-> m b
  mbind(_){return this}//monad instance
  mplus(o) {return o}//monadplus instance
};

const Nothing=()=>new TC_Nothing();
const isNothing=o=>TC_Nothing.prototype.isPrototypeOf(o);

const TC_Just=class Just extends T_Maybe {
  constructor(o) {
    super()
    this.value=o
  }
  map(f) {return new Just(f(this.value))}
  append(mo) {return isJust(mo)?this.pure(this.value.append(fromJust(mo))):this.empty()}
  or(_) {return this}
  when(o) {return isNothing(o)?o:this}//applicative instance this <* o | this << o
  then(o) {return o.when(this)}//applicative instance this *> o | this >> o
  app(o) {return o.map(this.value)}// (<*>) :: f (a -> b) -> f a -> f b
  //mbind::m a->(a->m b)-> m b
  mbind(f){return f(this.value)}//monad instance
  mplus(_) {return this}//monadplus instance
};

const Just=o=>new TC_Just(o);
const isJust=o=>TC_Just.prototype.isPrototypeOf(o);

const fromJust=o=>{
  if(isJust(o)) return o.value;
  throw("`fromJust` of not `Maybe`");
}

Maybe.__proto__.empty=Nothing()
Maybe.__proto__.pure=o=>Just(o)

exports.Maybe=Maybe
exports.isMaybe=isMaybe;
exports.Nothing=Nothing;
exports.isNothing=isNothing;
exports.Just=Just;
exports.isJust=isJust;
exports.fromJust=fromJust;

// exports.bind=o=>o.bind;
// exports.pure=o=>o.pure;


// export {isMaybe,Nothing,isNothing,Just,isJust,fromJust};