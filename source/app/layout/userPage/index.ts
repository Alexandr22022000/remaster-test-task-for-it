import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action } from 'vuex-class';
import TYPES from '../store/types';
import './style.scss';

@Component({
    template: require('./template.pug')
})

export default class UserPage extends Vue {}