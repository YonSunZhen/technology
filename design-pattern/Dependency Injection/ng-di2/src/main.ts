import { Container } from './container';
import { Injectable } from './Injectable';
import { Inject } from './Inject';
import { InjectionToken } from './provider';

const API_URL = new InjectionToken('apiUrl');

@Injectable()
class HttpClient{
  get() {
    console.log('get');
  }
}

@Injectable()
class HttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) { }
  test() {
    console.log(this.apiUrl);
    this.httpClient.get();
  }
}

const container = new Container();
// addProvider 这一步就相当于angular中在module中的providers添加Service
container.addProvider({
  provide: API_URL,
  useValue: 'https://www.666.com/'
});
container.addProvider({provide: HttpService, useClass: HttpService });
container.addProvider({provide: HttpClient, useClass: HttpClient });

const httpService = container.inject(HttpService);
httpService.test();
