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

  @State(state => state.users.userData.name) name: string;

  @State(state => state.users.userData.img) img: string;

  @State(state => state.users.userData.id) id: number;

  @State(state => state.users.userData.bdate) bdate: string;

  @State(state => state.users.userData.city) city: string;

  @State(state => state.users.userData.country) country: string;

  @State(state => state.users.userData.education) education: string;

  constructor () {
    super();
    this.getUserData();
  }
}
