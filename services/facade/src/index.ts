// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: loopback4-example-microservices
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {FacadeMicroservice} from './application';
import {RestServer, RestBindings} from '@loopback/rest';
import 'loopback-connector-swagger';

export async function main() {
  const app = new FacadeMicroservice();
  try {
    await app.boot();
    await app.start();
    console.log('Application Info:', await info());
  } catch (err) {
    console.error(`Cannot start the app ${err}`);
    process.exit(1);
  }

  async function info() {
    const rest = await app.getServer<RestServer>(RestServer);
    const port = await rest.get<Number>(RestBindings.PORT);
    return {
      appName: 'facade',
      uptime: Date.now() - app._startTime.getTime(),
      url: `http://127.0.0.1:${port}`,
    };
  }
}
