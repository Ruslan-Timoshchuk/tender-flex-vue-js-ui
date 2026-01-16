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

const app = createApp(TenderFlex)
const pinia = createPinia()

registerPlugins(app)

app.mount('#app')
app.use(pinia)