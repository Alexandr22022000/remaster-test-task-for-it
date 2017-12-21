import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from '../store/types';
import {item} from '../store/typesData';
import './style.scss';

declare module 'vue/types/vue' {
  interface Vue {
    myProperty: item;
  }
}

@Component({
  template: require('./template.pug')
})

export default class UserItem extends Vue {
  @Action(TYPES.A_SET_USER_ID) getUsers;

  private showDetails () {
    this.getUsers();
  }

  get item () {
    //console.log(this);
    return this.$props;
  }
}
