import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
const port = 3004
const backend = `http://localhost:${port}`

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	user: null,
	useremail: '',
	loading: false,
	error: null,
  },
  getters: {
	  user (state) {
		return state.user
	},
	useremail (state){
		return state.useremail
	},
	loading (state) {
		return state.loading
	},
	error (state) {
		return state.error
	},
  },
  mutations: {
	setUser (state, payload) {
		state.user = payload
		},
	setUseremail (state, payload) {
		state.useremail = payload.email
		},
	setLoading (state, payload) {
		state.loading = payload
		},
	setError (state, payload) {
		state.error = payload
		}
  },
  actions: {
	autoSignIn ({dispatch, commit}, payload) {
		commit('setUser', {id: payload.uid})
		commit('setUseremail', {email: payload.email})
		router.push(`/tesztsorozat`)
	},

	signUserIn ({commit}, payload) {
		commit('setUser', {id: Math.random()*10000})
		commit('setUseremail', {email: payload.email})
		router.push(`/tesztsorozat`)
    },
	
	signUserUp ({commit}, payload) {
		commit('setError', null)
		let params = {
			email: payload.email,
			password: payload.password
		}
		axios.post(`${ backend }/felhasznalok/regisztracio/`, params).then( resp => {
		commit('setUser', {id: Math.random()*10000})
		commit('setUseremail', "")
		router.push(`/tesztsorozat`)
		}).catch(err => {
			console.log(err)
			//commit('setError', {message: err.response.data.message})
		})
	},
	
		ellenorzes ({ commit }) {
			axios.get(`${ backend }/felhasznalok/ellenorzes/`).then( resp => {
				console.log(resp.data)
			}).catch(err => {
				console.log(err)
				//commit('setError', {message: err.response.data.message})
			})
	},
	
	resetPasswordWithEmail ({ commit }, payload) {
		commit('setUser', null)
		commit('setUseremail', "")
		router.push(`/bejelentkezes`)
	},
	  
	logout ({commit}) {
		commit('setUser', null)
		commit('setUseremail', "")
		router.push(`/bejelentkezes`)
		
	}
  }
})
