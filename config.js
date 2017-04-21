import { resolve } from 'path'

const Dir = {
  src: resolve(__dirname, 'src'),
  client: resolve(__dirname, 'src', 'client'),
  views: resolve(__dirname, 'src', 'views'),
  pages: resolve(__dirname, 'src', 'views', 'pages'),
  dist: resolve(__dirname, 'dist'),
  assets: resolve(__dirname, 'assets'),
  images: resolve(__dirname, 'assets', 'images')
}

export { Dir }
