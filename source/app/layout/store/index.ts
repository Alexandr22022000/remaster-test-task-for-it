import TypedStore from '../../core/store/typedstore';
import { action, module, mutation } from 'vuex-ts-decorators';
import * as TYPES from './types';

@module
export default class LayoutStore extends TypedStore {

  public phrase: string = 'Hello Vue';

  @action
  [TYPES.A_SOME_ACTION]() {
    this.commit(TYPES.M_SOME_MUTATION);
  }

  @mutation
  [TYPES.M_SOME_MUTATION]() {
    this.phrase = 'Hello Vuex';
  }
}
