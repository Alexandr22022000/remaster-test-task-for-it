import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from '../store/types';
import {IItem} from '../store/interfaces';
import {Prop} from "vue-property-decorator";
// import './style.sass';
import './styles.sass';

@Component({
  template: require('./template.pug')
})

// В чем смысл этого компонента? Вообще не ясно нафига он впринципе
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
