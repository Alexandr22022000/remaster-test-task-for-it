import './style.sass';

import Vue from 'vue';
import Component from 'vue-class-component';
import navbar from './navbar';
import { State, Action } from 'vuex-class';

@Component({
  template: require('./template.pug'),
  components: {
    navbar
  }
})
export default class Layout extends Vue {
  @State(state => console.log("AAAAA")) status: string;
}
