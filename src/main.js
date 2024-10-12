import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import DialogService from 'primevue/dialogservice'
import ConfirmationService from 'primevue/confirmationservice'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.use(DialogService)
app.use(ConfirmationService)
app.mount('#app')
