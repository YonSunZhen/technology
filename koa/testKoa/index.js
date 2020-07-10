let testKoa = require('./application');
let app = new testKoa();

let responseData = {};

app.use(async (ctx, next) => {
  responseData.name = 'tom';
  await next();
  ctx.body = responseData;
});

app.use(async (ctx, next) => {
  responseData.age = 16;
  await next();
  let test = "haha";
});

app.use(async ctx => {
  responseData.sex = 'male';
});

app.listen(3000, () => {
  console.log('listening on 3000');
})