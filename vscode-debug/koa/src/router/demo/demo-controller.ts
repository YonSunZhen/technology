import { DemoType, demoDao, DaoType } from '@dao';
import { ResponseUtils } from '@service-fw';
import Joi from '@hapi/joi';


export async function addDemo(ctx) {
  const addDemo: DemoType = {
    name: null,
    age: null
  };
  const demoModelKeys = Object.keys(addDemo);
  demoModelKeys.forEach(item => {
    if (ctx.request.body[item] !== undefined) {
      addDemo[item] = ctx.request.body[item];
    } else {
      delete addDemo[item];
    }
  });
  
  // 验证参数
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  const validateResult = schema.validate({
    name: addDemo.name
  });
  if (validateResult.error) {
    ctx.body = ResponseUtils.error<any>({ error_no: 100150 });
    return;
  }
  await demoDao.ensure();
  // 添加数据
  const addDemoRes = await demoDao.add(addDemo);
  const getDemo: DaoType<DemoType> = {
    model: {id: addDemoRes}
  };
  const getDemoRes = await demoDao.getList(getDemo);
  // 返回添加的数据
  ctx.body = ResponseUtils.normal<any>({ data: getDemoRes });
}