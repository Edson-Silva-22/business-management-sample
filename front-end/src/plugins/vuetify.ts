/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'system',
    themes: {
      dark: {
        colors: {
          background: "#020617",
          primary: "#0369a1",
          foreground: "#1e293b",
          textPrimary: "#cbd5e1",
          textSecundary: "#64748b",
        }
      }
    }
  },
})
