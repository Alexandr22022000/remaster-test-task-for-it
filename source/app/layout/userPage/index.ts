import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from '../store/types';
import './style.scss';

@Component({
    template: require('./template.pug')
})

export default class UserPage extends Vue {
  @Action(TYPES.A_GET_USER_DATA) getUserData;

  @State(state => state.layout.userData.name) name: string;

  @State(state => state.layout.userData.img) img: string;

  @State(state => state.layout.userData.id) id: number;

  constructor () {
    super();
    this.getUserData();
  }
}
