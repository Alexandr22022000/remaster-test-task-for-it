import Vue from 'vue';
import TypedStore from './app/core/store/typedstore';
import ApplicationStore from './app/core/store';
import Layout from './app/layout/';
import router from './app/core/router/routers';

class Application {

  private instance: Vue;

  private store: TypedStore;

  private entry: any = Layout;

  constructor(inStore: TypedStore) {
    this.store = inStore;

    this.init();
  }

  private init(): void {
    this.instance = new Vue({
      router,
      el: '#entry',
      store: this.store,
      render: (createElement) => createElement(this.entry)
    });
  }
}

new Application(new ApplicationStore());
