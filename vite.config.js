import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages: 저장소 이름이 바뀌면 이 값을 '/저장소이름/' 으로 수정하세요.
export default defineConfig({
  plugins: [react()],
  base: '/research-school/',
})
