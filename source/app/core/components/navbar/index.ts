import Vue from 'vue';
import Component from 'vue-class-component';
import {Status} from '../../../users/store/appState';
import { State, Action } from 'vuex-class';
import * as TYPES from '../../../users/store/types';
import BackButton from '../backButton';
import './style.sass';

@Component({
    template: require('./template.pug'),
    components: {
      BackButton
    }
})

export default class Navbar extends Vue {
    // причем здесь навбар если это поиск?
    // Этот функционал должен быть в списке пользователей а не здесь
    // Убрать нафиг

    private query: string = '';

    @Action(TYPES.A_GET_USERS) getUsers;

    @Action(TYPES.A_GO_TO_BACK) goToBack;

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
