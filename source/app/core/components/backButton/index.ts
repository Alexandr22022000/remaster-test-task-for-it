import Vue from 'vue';
import Component from 'vue-class-component';
import { Action } from 'vuex-class';
import './style.scss';

@Component({
    template: require('./template.pug')
})

export default class BackButton extends Vue {}
