import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// Configuración rutas
const routerOptions = [
  { name: 'AboutMe', path: '/aboutme' },
  { name: 'Home', path: '/home' },
  { name: 'Knowledges', path: '/knowledges' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];
// Rutas
const routes = routerOptions.map((r) => ({
  ...r,
  // Lazy load
  // "babel-eslint": "7.2.3"
  component: () => import(/* webpackChunkName: "[request]" */`@/views/${r.name}.vue`),
}));

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savePosition) {
    console.log(to, from, savePosition);
    const container = document.querySelector(`#${to.name}`);
    console.log({ x: container.scrollTop, y: container.scrollLeft });
    return { x: container.scrollTop, y: container.scrollLeft };
  },
  routes,
});

export default router;
