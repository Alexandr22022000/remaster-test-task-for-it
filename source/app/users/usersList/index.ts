import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import {IItem} from '../store/typesData';
import * as TYPES from '../store/types';
import {Banner} from '../store/appState';
import UserItem from '../userItem';
import './style.scss';

@Component({
    template: require('./template.pug'),
    components: {
      UserItem
    }
})

export default class UsersList extends Vue {
  constructor () {
    super();
    window.addEventListener('scroll', this.onScroll);
  }

  private onScroll () {
    console.log(this.banner);
    if (document.body.scrollHeight - window.innerHeight - document.scrollingElement.scrollTop <= 10 && this.banner === Banner.NONE) {
      this.getMoreUsers();
    }
  }

  @State(state => state.users.list.items) users: IItem[];

  @State(state => state.users.list.banner) banner: Banner;


  @Action(TYPES.A_GET_MORE_USERS) getMoreUsers;

  get bannerText (): string {
    return this.banner;
  }
}
