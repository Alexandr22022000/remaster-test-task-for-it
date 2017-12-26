import Vue from 'vue';
import Component from 'vue-class-component';
import {Status} from '../../../users/store/appState';
import { State, Action } from 'vuex-class';
import * as TYPES from '../../../users/store/types';
import BackButton from '../backButton';
import './style.scss';

@Component({
    template: require('./template.pug'),
    components: {
      BackButton
    }
})

export default class Navbar extends Vue {
    private query: string = '';

    @Action(TYPES.A_GET_USERS) getUsers;


    @State(state => state.users.stateApp.status) appStatus: Status;


    get getStatus(): string {
        return this.appStatus;
    }

    get currentRoute(): string {
        return this.$route.name;
    }


    search () {
      this.getUsers(this.query);
    }
}
