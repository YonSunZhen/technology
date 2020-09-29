import { Module } from '../di';
import { FatherService } from './father.service';
import { ChildService } from './child.service';

@Module({
  providers: [
    FatherService,
    ChildService
  ]
})
export class ServiceModule {

}