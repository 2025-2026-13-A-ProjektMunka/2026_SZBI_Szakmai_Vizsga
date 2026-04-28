// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Vagy a használt plugin (Vue, Svelte, stb.)

export default defineConfig({
  // Ezt a sort kell ellenőrizni és beállítani:
  base: './', 
  
  // A többi beállítás maradjon
  plugins: [react()], 
  // ...
})