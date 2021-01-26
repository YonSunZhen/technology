import { Module } from "../../lib/di";
import { SomeModule } from "../some/some.module";
import { WordService } from "./word.service";
import { HelloService } from "./hello.service";

// 相当于app.moudule.ts
@Module({
  imports: [
    SomeModule,
  ],
  providers: [
    WordService,
    HelloService,
  ],
})
export class HelloModule {

}
