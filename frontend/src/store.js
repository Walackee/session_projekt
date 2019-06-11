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
	loading: false,
	error: null,
	buttons: []
  },
  getters: {
	user (state) {
		return state.user
	},
	loading (state) {
		return state.loading
	},
	error (state) {
		return state.error
	},
	buttons (state) {
		return state.buttons
	},
  },
  mutations: {
	setUser (state, payload) {
		state.user = payload
		},
	setLoading (state, payload) {
		state.loading = payload
		},
	setError (state, payload) {
		state.error = payload
		},
	setButtons (state, payload) {
		state.buttons = payload
		}
  },
  actions: {
	autoSignIn ({commit}) {
		axios.get(`${ backend }/felhasznalok/ellenorzes/`).then( resp => {
			commit('setUser', resp.data.email)
			commit('setButtons', resp.data.buttons)
		}).catch(err => {
			commit('setError', {message: err.response.data.message})
		})
	},

	signUserIn ({dispatch, commit}, payload) {
		let params = {
			email: payload.email,
			password: payload.password
		}
		axios.post(`${ backend }/felhasznalok/bejelentkezes/`, params).then( resp => {
			commit('setButtons', resp.data.buttons)
			commit('setUser', params.email)
			router.push('/fooldal')
		}).catch(err => {
			commit('setError', {message: err.response.data.message})
		})
    },
	
	signUserUp ({commit}, payload) {
		let params = {
			email: payload.email,
			password: payload.password
		}
		axios.post(`${ backend }/felhasznalok/regisztracio/`, params).then( resp => {
			commit('setButtons', resp.data.buttons)
			commit('setUser', params.email)
			router.push('/fooldal')
		}).catch(err => {
			commit('setError', {message: err.response.data.message})
		})
	},
		
	resetpassword ({ commit }) {
		commit('setUser', null)
		router.push('/bejelentkezes')
	},
	
	resetemail ({ commit }) {
		commit('setUser', null)
		router.push('/bejelentkezes')
	},
	
	deleteuser ({ commit }) {
		commit('setUser', null)
		router.push('/bejelentkezes')
	},
	  
	logout ({commit}) {
		axios.get(`${ backend }/felhasznalok/kijelentkezes/`).then( resp => {
			commit('setUser', null)
			commit('setButtons', [])
			router.push('/bejelentkezes')
		}).catch(err => {
			commit('setError', {message: err.response.data.message})
		})
	}
  }
})
