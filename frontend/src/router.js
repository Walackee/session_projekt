import Vue from 'vue'
import Router from 'vue-router'
import Pagenotfound from '@/components/Pagenotfound'
import Main from '@/components/Main'
import Help from '@/components/Help'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Profile from '@/components/User/Profile'
import Testseries from '@/components/User/Testseries'
import Evaluation from '@/components/User/Evaluation'
import Admin from '@/components/User/Admin'
import store from './store'
import axios from 'axios'
const port = 3004
const backend = `http://localhost:${port}`

Vue.use(Router)

const router = new Router({
  //mode: 'history',
  //base: '/',
  routes: [
	 {
      path: '*',
      component: Pagenotfound
    },
	{
      path: '/',
	  redirect: '/fooldal'
    },
	{
      path: '/fooldal',
      name: 'Main',
      component: Main,
	  meta: { requiresAuth: false }
    },
	{
      path: '/sugo',
      name: 'Help',
      component: Help,
	  meta: { requiresAuth: false }
    },
    {
      path: '/bejelentkezes',
      name: 'Signin',
      component: Signin,
	  meta: { requiresAuth: false }
    },
	{
      path: '/regisztracio',
      name: 'Signup',
      component: Signup,
	  meta: { requiresAuth: false }
    },
	{
      path: '/profil',
      name: 'Profile',
      component: Profile,
	  meta: { requiresAuth: true }
    },
	{
      path: '/tesztsorozat',
      name: 'Testseries',
      component: Testseries,
	  meta: { requiresAuth: true }
    },
	{
      path: '/kiertekeles',
      name: 'Evaluation',
      component: Evaluation,
	  meta: { requiresAuth: true }
    },
	{
      path: '/admin',
      name: 'Admin',
      component: Admin,
	  meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
	  axios.post(`${ backend }/felhasznalok/jogosultsag/`, {path: to.path}).then( resp => {
		  if(store.getters.user!= null && store.getters.user!= undefined && resp.data.resp){
			  window.location.replace(`localhost:${port}/#` + to.path)
			  next()
		  } else {
			next('fooldal')  
		  }
	  }).catch(err => {
			commit('setError', {message: err.response.data.message})
		})
	} else {
    next()
  }
})

export default router