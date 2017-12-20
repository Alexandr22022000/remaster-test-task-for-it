import './style.sass';

import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from './store/types';

@Component({
  template: require('./template.pug')
})
export default class Layout extends Vue {}
