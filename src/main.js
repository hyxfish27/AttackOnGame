import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'bootstrap';
import './assets/all.scss';
import './assets/style.scss';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
