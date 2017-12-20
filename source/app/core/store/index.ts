import TypedStore from './typedstore';
import { module } from 'vuex-ts-decorators';
import LayoutStore from '../../layout/store';

@module({
  store: true,
  modules: {
    layout: new LayoutStore()
  }
})
export default class ApplicationStore extends TypedStore {
  private layout: LayoutStore;
}
