import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// import GoogleAuth from '@/config/google_oAuth.js'
// const gauthOption = {
//   clientId: '406362590745-cj472811c26nu77fm5m981vkvk2ph8me.apps.googleusercontent.com',
//   scope: 'profile email',
//   prompt: 'select_account'
// }
// Vue.use(GoogleAuth, gauthOption)
Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
