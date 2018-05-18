import './common/env';
import Server from './common/server';
import routes from './routes';
import { OttoServer } from './ottoserver';

const port = parseInt(process.env.PORT);
export default new OttoServer(port)
  .getApp();
