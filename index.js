const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/todos'


const fetchCall = url => {
  axios.get(url)
  .then(({data}) => console.log(data))
  .catch(err => console.log(err))
}

// null || undefined
// .map(value => value + 5);

//predicate
const isNotNullorUndefined = value => value !== null;
const isNotemptyArray = value => value.length >0;


//maybe funcition
const maybe = predicate => x => predicate(x) ? [x] : [];
const maybeForArray = predicate => x => predicate(x) ? [...x] : [];
const compose = (...fns) => x => fns.reduce((acc,fn) => fn(acc),x)


const Maybe = value => ({
  isNothing:() => isNullorUndefined(value),
  map:transformer => !isNullorUndefined(value) ? maybe(transformer(value)) : maybe([]),
  compose:(...fns) => !isNullorUndefined(value) ? maybe(fns.reduce((acc,fn)=>fn(acc),value))  : maybe([]),
  unfold:() => value
})

//custom maybe
const isNullorUndefinedMaybe = maybeForArray(isNotNullorUndefined)



///reducer
const map$ = fn => array => (
  array.reduce((acc,val) => {
    val = fn(val)
    acc.push(val)
    return acc;
  },[])
)

const filter$ = fn => array =>(
  array.reduce((acc,val) => {
    if(fn(val)){
      acc.push(val)
      return acc
    }else return acc;
  },[])
)



//custom
const addFive = x => x + 5;
const filterSeven = x => x > 7


const addFiveForArray = map$(addFive)
const getHigherthanSeven = filter$(filterSeven)





const result = compose(
  addFiveForArray,
  getHigherthanSeven
)
(isNullorUndefinedMaybe([1,2,3,4,5]))


console.log(result)


const Box = x => ({
  map: fn => Box(fn(x)),
  inspect: () => `Box(${x})`,
  fold:() => x,
  compose:(...fns) => Box(fns.reduce((acc,fn) => fn(acc),x))
})



const capitalizeIt = x => x.toUpperCase();
const addScream = x => `${x}!`


const doThis =
Box('a')
.compose(
  capitalizeIt,
  addScream
)
.fold()


console.log(doThis)



const Right =x => ({
  map:fn => Right(fn(x)),
  compose:(...fns) => Right(fns.reduce((acc,fn) => fn(acc),x)),
  inspect:() => `Right(${x})`,
  fold:(f,g) => g(x),
  chain:f => f(x)
})

const Left = x => ({
  compose:(...fns) => Left(x),
  map:fn => Left(x),
  inspect: () => `Left(${x})`,
  fold:(f,g) => f(x),
  chain:f => Left(x)
})

const fromNullable = x => x != null ? Right(x) : Left(null);


const makeitBig = str => str.toUpperCase();
const scream = str => `${str}!`

const yohh = Right('a')
.compose(
  makeitBig,
  scream
)
.fold(x=>'wrong', y=> 'yes')


const asyncTryCatch = async(link) => {
  try{
    const {data} = await axios.get(link)
    return await Right(data)
  }
  catch(err){
    return Left(err)
  }
}

const incraeseId = value => value.id + 5;

// const getResult = () =>
// asyncTryCatch('https://jsonplaceholder.typicode.com/posts')
// .then(data => {
//   return data.compose(
//
//   )
// })
// .then(data => data.fold(err => err, data => data))
// .then(data => console.log(data))
// getResult()


const showLogin = () => console.log('login');
const renderPage = () => console.log('showPage')
const current_user = 'yes'
const sendEmail = value => {
  console.log(value)
};

const openSite = () =>
fromNullable(current_user)
.map(value => sendEmail(value))
.fold(showLogin,renderPage)

openSite()


const userPreferable = user => user.premium ? Right(user) : Left(null)
const defaultPage = () => '/'
const loadPrefs = pref => `/${pref}`

const user = {
  premium:true,
  preferences:'nike'
}

const getPrefs = user =>
userPreferable(user)
.map(u => u.preferences)
.fold(defaultPage,pref => loadPrefs(pref))



console.log(getPrefs(user))



const reducerAble = reducer => reducer !=null ? Right(reducer) : Left(null);

const renderPageaa = reducer =>
reducerAble(reducer)
.map(reducer => reducer.token)
.fold(defaultPage, pref => loadPrefs(pref))


console.log(renderPageaa({token:'1234'}))
