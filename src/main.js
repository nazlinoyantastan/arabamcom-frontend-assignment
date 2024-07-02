import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

library.add(faSearch, faSort, faSortUp, faSortDown)


import './main.css';
import 'bootstrap/dist/css/bootstrap.css';

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app');

