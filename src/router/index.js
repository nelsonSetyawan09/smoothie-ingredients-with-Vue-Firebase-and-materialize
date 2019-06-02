import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/Index.vue';


Vue.use(VueRouter);

const routes = [
     { path: '/', component: Index , name: 'Index'},

];


export default new VueRouter({
    routes,
    mode: 'history'

});