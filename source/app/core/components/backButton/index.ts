import Vue from 'vue';
import Component from 'vue-class-component';
import { Action } from 'vuex-class';
import './style.sass';
import * as TYPES from '../../../users/store/types';

@Component({
    template: require('./template.pug')
})

export default class BackButton extends Vue {
  @Action(TYPES.A_GO_TO_BACK) goToBack;

  back () {
    this.goToBack();
  }
}
