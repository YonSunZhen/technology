import { AppModule } from './app/app.module';
import { Factory } from './di';

Factory.create(AppModule);
const app = new AppModule();
app.main();