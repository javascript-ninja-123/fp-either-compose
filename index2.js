



const increment = num => num + 1;

const obj = {
  man:'yes',
  hoal:'ss'
}

const newObj = {...obj, name:'yes'}

console.log(newObj);


const greeting = name => `What is up!, ${name}`;
const friends = ['Sung','Yonna'];

const greetingReducer = (acc,val) => {
  val = greeting(val)
  acc.push(val)
  return acc
}

const mapReducer = fn => (acc,val) => {
  acc.push(fn(val))
  return acc;
}

const grettingMapReducer = mapReducer(greeting);

const transduce = (array,reducer,x) => (
  array.reduce(reducer,x)
)

const greetingFriends = transduce(friends,grettingMapReducer,[]);

console.log(greetingFriends)



const add = (a,b) => a + b;

const add3 = num => add(3,num);

console.log(add3(5))

const greetingss = name => `What is up!, ${name}`;
const friendsaa = ['Sung','Yonna'];

const greetingMan = greeting => name => `${greeting} ${name}`


const morningGreetingMan = greetingMan('morning')

const w = ['yo','man'].map(morningGreetingMan)



const changeChracter = y => x => `${x.toUpperCase()} ${y}`;
const addExclmationLetterchangeChracter = changeChracter('!')

const yes22 = ['array','dorray'].map(addExclmationLetterchangeChracter)

console.log(yes22)
