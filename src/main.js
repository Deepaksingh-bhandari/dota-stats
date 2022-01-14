import { createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'


const app=createApp(App).use(router)
app.use(ElementPlus);
app.use(VueAxios,{$http:axios});
app.mount('#app')