import { Injectable } from "../../lib/di";

@Injectable()
export class SomeService {

  haha = 1;
  constructor() {

  }

  public doSomething() {
    console.log(this.haha);
  }

}
