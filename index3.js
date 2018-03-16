
const required = () => console.error('argument is required')
const increment = (num = required()) => num + 1;
const decrement = (num = required()) => num === 0 ? 0 : num -1;


const array = [
  {
    name:'horray',
    age:27,
    job:"sung"
  },
  {
    name:'w',
    age:24,
    job:"west"
  },
  {
    name:'westman',
    age:21,
    job:"aws"
  }
]

const Right = value => ({
  map:fn => Right(fn(value)),
  fold:(f,g) => g(value),
  inspect:() => `Right(${value})`,
  compose:(...fns) => Right(fns.reduce((acc,fn) => fn(acc),value))
})


const Left = value => ({
  map:fn => Left(value),
  fold:(f,g) => f(value),
  inspect:() => `Left(${value})`,
  compose:(...fns) => Left(value)
})

const fromNullable = fn => x => fn(x) ? Right(x) : Left(null);
const emptyArray = x => Array.isArray(x)  && x.length > 0 ? true : false
const emptyArrayNullable = fromNullable(emptyArray)

const compsoe = (...fns) => value => fns.reduce((acc,fn) => fn(acc),value);

// const mapReducer = fn => array => array.reduce((acc,val) => {
//   acc.push(fn(val))
//   return acc;
// })

const mapReducer = (fn,selector) => (array) => (
  array.reduce((acc,val) => {
    val[selector] = fn(val[selector])
    acc.push(val)
    return acc;
  },[])
)


const UpperCase = selector => array => array.reduce((acc,val) => {
  val[selector] = val[selector].toUpperCase()
  acc.push(val)
  return acc;
},[])


const addJob = x => `${x}-job`;
const jobMapReducer = mapReducer(addJob,'job')





const UpperCaseName = UpperCase('name')

const r = () =>
emptyArrayNullable(array)
.compose(
  UpperCaseName,
  jobMapReducer
)
.fold(x => x, y => y)


console.log(r())
