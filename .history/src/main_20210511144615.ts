import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
import installElementPlus from './plugins/element'
import Vant from 'vant';
import 'default-passive-events'
import 'vant/lib/index.less';

const app = createApp(App)
// const playHot = import(/* webpackChunkName: "about" */ './pages/playlist_hot.vue')
app.component('p1', {
  template: '<h1>自定义组件1!</h1>'
})
installElementPlus(app)
// app.component('playlist-hot',import(/* webpackChunkName: "about" */ './pages/playlist_hot.vue'))
app.use(router).use(Vant).mount('#app')
