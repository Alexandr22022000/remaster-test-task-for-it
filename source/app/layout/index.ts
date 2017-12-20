import './style.sass';

import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from './store/types';

@Component({
  template: require('./template.pug')
})
export default class Layout extends Vue {

  @State(state => state.layout.phrase) phrase: string;

  @Action(TYPES.A_SOME_ACTION) togglePhrase;

  private onButtonClickHandler() {
    this.togglePhrase();
  }

}
