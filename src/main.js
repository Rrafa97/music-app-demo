import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import installElementPlus from './plugins/element'
import Vant from 'vant';
import 'default-passive-events'
import 'vant/lib/index.css';

const app = createApp(App)
installElementPlus(app)
app.use(router).use(Vant).mount('#app')
