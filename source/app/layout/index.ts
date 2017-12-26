import './style.sass';

import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '../core/components/navbar';
import { Action } from 'vuex-class';
import * as TYPES from '../users/store/types';

@Component({
  template: require('./template.pug'),
  components: {
    Navbar
  }
})
export default class Layout extends Vue {
  @Action(TYPES.A_GET_VK_AUTH_TOKEN) getToken;

  constructor () {
    super();
    this.getToken();
  }
}
