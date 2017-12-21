import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import * as TYPES from '../store/types';
import {item} from '../store/typesData';
import {Prop} from "vue-property-decorator";
import Request from '../../core/request';
import './style.scss';

import * as REQUEST from '../../core/request/constants';

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
    console.log(Request.get(REQUEST.METHOD_SEARCH, {'access_token': '6cb73bab05de52dec76af86ae08f2826e79ba1d97dae34b649860dee21979618d8214715db3873832fba7', 'q': 'alex', 'count': '10'}, (error, data) => {
      console.log(data);
    }));
    return this.myProperty.name;
  }

  get img () {
    return this.myProperty.img;
  }
}
