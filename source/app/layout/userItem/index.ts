import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from '../store/types';
import {item} from '../store/typesData';
import {Prop} from "vue-property-decorator";
import './style.scss';

@Component({
  template: require('./template.pug')
})

export default class UserItem extends Vue {
  @Action(TYPES.A_SET_USER_ID) getUser;

  @Prop() myProperty: item;

  private showDetails () {
    this.getUser(this.myProperty.id);
  }

  get name () {
    return this.myProperty.name;
  }

  get img () {
    return this.myProperty.img;
  }
}