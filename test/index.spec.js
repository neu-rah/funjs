const assert = require("assert");

const {
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
} = require("../funjs.js");

//patch primitive data types for Monoid (and Semigroup)
monoidFunction(Function().__proto__)
monoidString(String().__proto__)
monoidArray(Array().__proto__)

//patch primitive data types for List
listString(String().__proto__)
listArray(Array().__proto__)

//patch primitive data types for Foldable
foldable(String().__proto__)
foldable(Array().__proto__)


///////////////////////////////////////////
// test stuff
const e=x=>x/2
const f=x=>x+2
const g=x=>x*10

function testFunc(f,name,test,error) {
  assert(typeof f==="function","function `"+name+"` not found")
  assert(test,"function `"+name+"` error "+(error||""))
}

describe("Functional",function() {
  it("utility functions",async ()=>{
    testFunc(id,"id",id(0)===0&&id("ok")==="ok","not reflecting")
    testFunc(fcomp,fcomp(f)(g)(4)===42,"fcomp")
    testFunc(fchain,"fchain",fchain(e,f,g)(4)===21)
    testFunc(constant,"constant",constant(0)(1)===0)
    testFunc(flip,"flip",flip(a=>b=>a/b)(1)(2)===2)
    testFunc(cons,"cons",cons(1,[]).length===1)
    assert.deepStrictEqual(cons(2)(cons(1,[])), [2,1])
  })
})

describe("Semigroup/Monoid",function() {
  it("Semigroup and monoid functions",async ()=>{
    testFunc(empty,"empty",true)
    testFunc(append,"append",true)
    testFunc(mconcat,"mconcat",true)
    testFunc(monoidFunction,"monoidFunction",true)
    testFunc(monoidString,"monoidString",true)
    testFunc(monoidArray,"monoidArray",true)
    assert(typeof Function().__proto__.append==="function","primitive function type not Semigroup patched")
    assert(typeof Function().__proto__.empty==="function","primitive function type not Monoid patched")
    assert(typeof String().__proto__.append==="function","primitive String type not Semigroup patched")
    assert(typeof String().__proto__.empty==="string","primitive String type not Monoid patched")
    assert(typeof Array().__proto__.append==="function","primitive Array type not Semigroup patched")
    assert.deepStrictEqual(Array().__proto__.empty,[],"primitive Array type not Monoid patched")
  })
})

describe("List",function() {
  it("primitives (Array, String) as lists",async ()=>{
    testFunc(head,"head",head("oks")==="o","head of string")
    testFunc(tail,"tail",tail("oks")==="ks","tail of string")
    testFunc(head,"head",head([1,2,3])===1,"head of Array")
    assert.deepStrictEqual(tail([1,2,3]),[2,3],"Array `tail` error")
  })
})

describe("Functor",function() {
  it("Functor instance of primitive types (Array/String)",async ()=>{
    assert.strictEqual(map(o=>head(o).toUpperCase()+tail(o))("rui"),"RUI","map over string")
    assert.deepStrictEqual(map(o=>o+1)([1,2,3]),[2,3,4],"map over Array")    
    assert.strictEqual(drop(2)("rui"),"i","String drop")
    assert.deepStrictEqual(drop(2)([1,2,3]),[3],"Array drop")    
  })
})

describe("Pair",function() {
  it("tupple functions",async ()=>{
    assert.strictEqual(fst(Pair(1,2)),1)
    assert.strictEqual(snd(Pair(1)(2)),2)
    assert.deepStrictEqual(Pair(1,2).map(o=>o+1),Pair(1,3))
    assert.deepStrictEqual(Pair(1,2).mbind(map(o=>o*2)),Pair(1,4))
  })
})

describe("Maybe",function() {
  it("datatype",async ()=>{
    assert(isMaybe(Just(1)))
    assert(isMaybe(Nothing()))
    assert(isJust(Just(1)))
    assert(isNothing(Nothing()))
    assert(!isJust(Nothing()))
    assert(!isNothing(Just(1)))
    assert.strictEqual(fromJust(Just(1)),1)
  })
})

describe("Either",function() {
  it("datatype",async ()=>{
    assert(isEither(Left("")))
    assert(isEither(Right("")))
    assert(isLeft(Left("")))
    assert(isRight(Right("")))
    assert(!isLeft(Right("")))
    assert(!isRight(Left("")))
    assert.strictEqual(fromLeft(Left(1)),1)
    assert.strictEqual(fromRight(Right(1)),1)
  })
})

describe("Foldable",function() {
  it("primitive and generic folds",async ()=>{
    assert.strictEqual(foldr(a=>b=>a/b)(16)([4,2]),8)//16/(4/2)
    assert.strictEqual(foldl(a=>b=>a/b)(16)([4,2]),2)//(16/4)/2
    assert.strictEqual(foldMap(o=>o.toUpperCase())(["a","b"]),"AB")
    assert.strictEqual(foldr1(a=>b=>a/b)([16,4,2]),8)//16/(4/2)
    assert.strictEqual(foldl1(a=>b=>a/b)([16,4,2]),2)//(16/4)/2
  })
})
