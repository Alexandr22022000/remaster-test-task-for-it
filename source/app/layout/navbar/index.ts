import Vue from 'vue';
import Component from 'vue-class-component';
import {Status} from '../store/applicationStats';
import { State, Action } from 'vuex-class';
import * as TYPES from '../store/types';
import './style.scss';

@Component({
    template: require('./template.pug')
})

export default class Navbar extends Vue {
    private query: string = '';


    @Action(TYPES.A_GET_USERS) getUsers;

    @Action(TYPES.A_GO_TO_BACK) goToBack;


    @State(state => state.stateApp.status) status: Status;


    get getStatus(): string {
        return this.status;
    }


    search () {
        this.getUsers(this.query);
    }

    private back () {
      this.goToBack();
    }
}
