import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from '@/components/Index.vue';
import AddSmoothie from '@/components/AddSmoothie.vue';
import EditSmoothie from '@/components/EditSmoothie.vue';




Vue.use(VueRouter);

const routes = [
     { path: '/', component: Index , name: 'Index'},
     { path: '/add-smoothie', component: AddSmoothie , name: 'AddSmoothie'},
     { path: '/edit-smoothie/:id', component: EditSmoothie , name: 'EditSmoothie'}

];


export default new VueRouter({
    routes,
    mode: 'history'

});