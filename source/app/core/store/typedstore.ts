import { Store } from 'vuex';

export default class TypedStore extends Store<any> {
  constructor() {
    super({});
  }
}
