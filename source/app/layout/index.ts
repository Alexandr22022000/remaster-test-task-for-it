import './style.sass';

import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from './store/types';
//import navbar from './navbar';

@Component({
  template: require('./template.pug')/*,
  components: {
    navbar
  }*/
})
export default class Layout extends Vue {}
