import Vue from 'vue';
import VueRouter from 'vue-router';
import UsersList from '../../users/usersList/index';
import UserPage from '../../users/userPage/index';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'UsersList',
            component: UsersList
        },
        {
            path: '/user/:id',
            name: 'UserPage',
            component: UserPage
        }
    ]
});
