import Vue from 'vue';
import VueRouter from 'vue-router';
import Application from './components/Application.vue';
import uuid from 'uuid/v4';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  base: window.location.href,
  routes: [
    {
      path: '/',
      redirect: '/project/' + uuid()
    },
    {
      path: '/project/:id',
      component: Application
    }
  ]
});

export default router;
