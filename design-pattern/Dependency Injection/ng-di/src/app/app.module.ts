import { Module } from '../di';
import { ServiceModule } from '../service/service.module';
import { FatherService } from '../service/father.service';
import { ChildService } from '../service/child.service';

@Module({
  imports: [
    // ServiceModule
  ],
  providers: [
    FatherService,
    ChildService
  ]
})
export class AppModule{
  constructor() {

  }

  main() {
    // console.log('这里是调试1');
  }
}