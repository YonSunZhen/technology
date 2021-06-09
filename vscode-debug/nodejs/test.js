async function test() {
  const promise = new Promise((res, rej) => {
    setTimeout(() => {
      console.log('debug1');
      res();
    }, 2000)
  })
  promise.then(() => {
    console.log('debug2');
  })
  return promise;
}
void async function () {
  await test();
  console.log('debug3');
}()
