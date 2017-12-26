import './style.sass';

import Vue from 'vue';
import Component from 'vue-class-component';
import Navbar from '../core/components/navbar';

@Component({
  template: require('./template.pug'),
  components: {
    Navbar
  }
})
export default class Layout extends Vue {}
