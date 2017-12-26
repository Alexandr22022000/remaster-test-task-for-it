import TypedStore from './typedstore';
import { module } from 'vuex-ts-decorators';
import UsersStore from '../../users/store';

@module({
  store: true,
  modules: {
    users: new UsersStore()
  }
})
export default class ApplicationStore extends TypedStore {
  private usersStore: UsersStore;
}
