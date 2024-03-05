import { Inject, Injectable, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EntityDataModule } from '@ngrx/data';
import { DefaultDataServiceConfig, EntityDataService } from '@ngrx/data';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from '../../environments/environment';
import { entityConfig } from './entity-metadata';

@Injectable()
export class SocketDevelopment extends Socket {
  /***/
  constructor(@Inject(String) private url) {
    super({
      url,
      options: {
        transports: ['polling'],
      },
    });
  }
}

@Injectable()
export class SocketProduction extends Socket {
  /***/
  constructor(@Inject(String) private url) {
    super({
      url,
      options: {
        transports: ['polling'],
      },
    });
  }
}

const rootUrl = environment.url;
const apiSuffix = environment.apiSuffix;

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: rootUrl + apiSuffix,
};

const socketConfig: SocketIoConfig = {
  url: rootUrl,
  options: {
    transports: ['polling'],
  },
};

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    SocketIoModule.forRoot(socketConfig),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
    {
      provide: SocketDevelopment,
      useFactory: (): SocketDevelopment | SocketProduction => {
        if (environment.production) {
          return new SocketProduction(environment.url);
        } else {
          return new SocketDevelopment(environment.url);
        }
      },
    },
    EntityDataService,
  ],
})
export class AppStoreModule {
  /***/
  constructor(private defDataServiceConfig: DefaultDataServiceConfig) {
    this.defDataServiceConfig.root = environment.url + environment.apiSuffix;
  }
}
