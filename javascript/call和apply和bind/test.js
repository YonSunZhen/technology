// // 改变this的指向 
// function foo(year, place) {
//   console.log(this.name+" is "+year+" born from "+place);
// }
// window.name = 'syz';
// const obj = {
//   name: 'syc'
// }
// foo(1995, 'china'); // syz is 1995 born from china
// foo.call(obj, 1995, 'china'); // syc is 1995 born from china

// function foo(year, place) {
//   console.log(this.name+" is "+year+" born from "+place);
// }
// window.name = 'syz';
// const obj = {
//   name: 'syc'
// }
// foo(1995, 'china'); // syz is 1995 born from china
// foo.apply(obj, [1995, 'china']); // syc is 1995 born from china


function foo(year, place) {
  console.log(this.name+" is "+year+" born from "+place);
}
window.name = 'syz';
const obj = {
  name: 'syc'
}
foo(1995, 'china'); // syz is 1995 born from china
let haha = foo.bind(obj, 1995, 'china'); 
haha(); // syc is 1995 born from china