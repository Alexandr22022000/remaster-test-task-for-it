import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from '../store/types';
import {IItem} from '../store/typesData';
import {Prop} from "vue-property-decorator";
// import './style.scss';
import './styles.sass';

@Component({
  template: require('./template.pug')
})

export default class UserItem extends Vue {
  @Action(TYPES.A_SET_USER_ID) getUser;

  @Prop() myProperty: IItem;

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
