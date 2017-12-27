import Vue from 'vue';
import Component from 'vue-class-component';
import { Action } from 'vuex-class';
import './style.sass';
import * as TYPES from '../../../users/store/types';

@Component({
    template: require('./template.pug'),
    
})

export default class BackButton extends Vue {
  // Убрать. Я писал что такие компоненты должны только делать emit события, глобальной зависимости от приложения тут не должно быть,
  // в силу того что они должны иметь возможность переиспользоваться
  // Здесь должно быть только что-то типа onClickHandler() { this.$emit('clicked', anyData); }
  @Action(TYPES.A_GO_TO_BACK) goToBack;

  back () {
    this.goToBack();
  }

  msgBackButton : string = "You click on backButton!";

  onClickBackButton(){
    this.$emit('clickedOnBackButton', this.msgBackButton);
  }
}
