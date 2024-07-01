import { createRouter, createWebHistory } from 'vue-router';
import ListingPage from '../views/ListingPage.vue';
import DetailPage from '../views/DetailPage.vue';



const routes = [
  {
    path: '/',
    name: 'ListingPage',
    component: ListingPage,
  },
  {
    path: '/detail/:id',
    name: 'DetailPage',
    component: DetailPage,
  },
  
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
