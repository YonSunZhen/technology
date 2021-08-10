import Router from 'koa-router';
import * as demo_controller from './demo-controller';

const router = new Router();
router.prefix('/');

/**
 * @api {POST} /demo 添加demo
 * @apiDescription 添加demo
 * @apiVersion 1.0.0
 * @apiName demo
 * @apiGroup demo
 *
 * @apiParam (body) {string} name name
 * @apiParam (body) {string} [age] age
 */
router.post('/demo', demo_controller.addDemo);

export default router;