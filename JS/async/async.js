function foo(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(x);
      resolve(12);
    }, 0)
  })
}
function *main() {
  try {
    let text = yield foo(11);
    console.log(text);  
  } catch (err) {
    console.log(err);
  }
}
let it = main();
let p = it.next().value; // p等于yield foo(11)返回的promise
p.then(
  function(text) {
    console.log(text);
  },
  function(err) {
    it.throw(err);
  }
)
// foo(11).then(
//   function(text) {
//     console.log(text);
//   },
//   function(err) {
//     console.log(err);
//   }
// )