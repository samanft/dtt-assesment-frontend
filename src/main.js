import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Houses from './components/Houses.vue'
import About from './components/About.vue'
import Details from './components/Details.vue'
import NewListing from './components/NewListing.vue' // Add this line
import store from './store' // import your Vuex store
import './style.css'

const routes = [
  { path: '/', component: Houses },
  { path: '/about', component: About },
  { path: '/details/:houseId', name: 'Details', component: Details, props: true },
  { path: '/newlisting', name: 'newListing', component: NewListing, props:true }, // Add this line
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).use(store).mount('#app') // use your Vuex store here