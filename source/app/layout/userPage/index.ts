import Vue from 'vue';
import Component from 'vue-class-component';
import { State } from 'vuex-class';
import './style.scss';

@Component({
    template: require('./template.pug')
})

export default class UserPage extends Vue {
  @State(state => state.layout.userData.name) name: string;

  @State(state => state.layout.userData.img) img: string;

  @State(state => state.layout.userData.id) id: number;
}
