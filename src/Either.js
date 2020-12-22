"use strict";

//patch primitive data types
const {monoidString,monoidArray,empty}=require("./Monoid.js")
// const {SelfExtractClass}=require("./selfExtract")//not sure if this helps, class is working nice
monoidString(String().__proto__)
monoidArray(Array().__proto__)

const T_Either=class Either {
  pure(o) {return Right(o)}//Monad instance
  when(o) {return isLeft(o)?o:this}//applicative instance this <* o | this << o
  then(o) {return o.when(this)}//applicative instance this *> o | this >> o
  isEither() {return true}
};

const isEither=o=>T_Either.prototype.isPrototypeOf(o);

const TC_Left=class Left extends T_Either {
  constructor(o) {
    super();
    this.value=o;
  }
  valueOf() {return false;}
  map(_) {return this;}//functor instance
  //mbind::m a->(a->m b)-> m b
  mbind(_){return this}//monad instance
  app(o) {return this}// (<*>) :: f (a -> b) -> f a -> f b
  append(o){return o}//semigroup instance
  or(o){return o}//alternative instance
  isLeft() {return true}
  isRight() {return false}
};

const Left=o=>new TC_Left(o);
const isLeft=o=>TC_Left.prototype.isPrototypeOf(o)

const TC_Right=class Right extends T_Either {
  constructor(o) {
    super();
    this.value=o;
  }
  map(f) {return new Right(f(this.value));}//functor instance
  //mbind::m a->(a->m b)-> m b
  mbind(f){return f(this.value)}//monad instance
  app(o) {return isRight(o)?o.map(this.value):o}// (<*>) :: f (a -> b) -> f a -> f b
  append(o){return isLeft(o)?o:this.pure(this.value.append(o))}//semigroup instance
  or(_){return this}//alternative instance
  isLeft() {return false}
  isRight() {return true}
  fromRight() {return this.value}
};

const Right=o=>new TC_Right(o);
const isRight=o=>TC_Right.prototype.isPrototypeOf(o);

const fromLeft=o=>{
  if(isEither(o)) return isLeft(o)?o.value:undefined;
  throw("`fromLeft` of not `Either`")
}

const fromRight=o=>{
  if(isEither(o)) return isRight(o)?o.value:undefined;
  throw("`fromRight` of not `Either`")
}

exports.isEither=isEither;
exports.Left=Left;
exports.isLeft=isLeft;
exports.fromLeft=fromLeft;
exports.Right=Right;
exports.isRight=isRight;
exports.fromRight=fromRight;

// export {isEither, Left, isLeft, fromLeft, Right, isRight, fromRight};

