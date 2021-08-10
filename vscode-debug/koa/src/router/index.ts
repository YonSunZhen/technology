import Router from 'koa-router';

import test_router from './demo/demo-router';

const router = new Router();

router.use(test_router.routes(), test_router.allowedMethods());

router.get('/', async (ctx) => {
    ctx.body = 'Welcome to test!';
});

export { router };