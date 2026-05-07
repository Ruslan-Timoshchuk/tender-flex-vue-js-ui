/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the TenderFlex`
 */

// Components
import TenderFlex from './TenderFlex.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Plugins
import { registerPlugins } from '@/plugins'

import "@/assets/global.css";

import { useUserStore } from '@/stores/user.store'

const app = createApp(TenderFlex)
const pinia = createPinia()

app.use(pinia)

const userStore = useUserStore(pinia)

await userStore.loadAuthenticationState()

registerPlugins(app)

app.mount('#app')