import { Factory } from '../lib/di';
import { HelloModule } from './hello/hello.module';
import { HelloService } from './hello/hello.service';
import { WordService } from "./hello/word.service";
import { SomeService } from "./some/some.service";
import { SomeModule } from './some/some.module';

const helloModule = Factory.create(HelloModule);

// 这里获取的HelloService是依赖注入容器中的HelloService实例
helloModule.get(SomeService).haha = 11;
helloModule.get(SomeService).doSomething();

// 这种方式就不能共享状态了
// const test = new HelloService(new SomeService(), new WordService());
// test.getHello();
