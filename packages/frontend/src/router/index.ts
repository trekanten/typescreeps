import Vue from 'vue';
import Router from 'vue-router';

import TaskView from '@/views/TaskView.vue';
import LinkView from '@/views/LinkView.vue';

Vue.use(Router);

export enum ROUTE {
  TASKS = 'Tasks',
  LINKS = 'Links',
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/tasks',
      name: ROUTE.TASKS,
      component: TaskView,
    },
    {
      path: '/links',
      name: ROUTE.LINKS,
      component: LinkView,
    },
    {
      path: '/',
      redirect: { name: ROUTE.TASKS },
    },
  ],
});
