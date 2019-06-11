import Vue from 'vue'
import './plugins/vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
axios.defaults.withCredentials = true
import AlertCmp from './components/Shared/Alert.vue'
Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
	  this.$store.dispatch('autoSignIn')
/*
		axios.interceptors.request.use(async config => {
			let masik = 'Bearer '
			let kapotttoken = await firebase.auth().currentUser.getIdToken(true)
			config.headers.token = masik.concat(kapotttoken)
			return config
		}, (error) => {
		return Promise.reject(error)
	})
	*/  
  }
}).$mount('#app')