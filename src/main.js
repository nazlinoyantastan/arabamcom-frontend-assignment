import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Router'ı dahil edin

import './main.css';
import 'bootstrap/dist/css/bootstrap.css';

createApp(App).use(router).mount('#app');

