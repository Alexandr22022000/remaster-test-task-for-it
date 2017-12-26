import Vue from 'vue';
import VueRouter from 'vue-router';
import UsersList from '../../users/usersList';
import UserPage from '../../users/userPage';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'UsersList',
            component: UsersList
        },
        {
            path: '/user',
            name: 'UserPage',
            component: UserPage
        }
    ]
});
