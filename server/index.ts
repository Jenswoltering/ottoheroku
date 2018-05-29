import './common/env';

import Server from './common/server';
import { OttoServer } from './ottoserver';
import routes from './routes';


const port = parseInt(process.env.PORT, 10);
export default new OttoServer(port)
  .getApp();
