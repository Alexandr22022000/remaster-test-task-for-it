import Vue from 'vue';
import Component from 'vue-class-component';
import {Status} from '../store/applicationStats';
import { State, Action } from 'vuex-class';
import { Watch } from "vue-property-decorator";
import * as TYPES from '../store/types';
import router from '../router/routers';
import './style.scss';

@Component({
    template: require('./template.pug')
})

export default class Navbar extends Vue {
    private query: string = '';

    @Action(TYPES.A_GET_USERS) getUsers;

    @Action(TYPES.A_GO_TO_BACK) goToBack;


    @State(state => console.log("AAAAA")) status: string;

    //private status: string = 'AAA';


    get getStatus(): string {
        return this.$store.state.token;

        /*switch (this.status) {
            case Status.OK:
                return "OK";

            case Status.REQUESTING:
                return "REQUESTING";

            case Status.ERROR:
                return "ERROR";

            default:
                return "ERROR";
        }*/
    }

    get currentRoute(): string {
        return this.$route.name;
    }


    search () {
        this.getUsers(this.query);
    }

    private back () {
      this.goToBack();
    }
}
