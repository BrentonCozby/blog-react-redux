import { resolve } from 'path'

const Dir = {
  src: resolve(__dirname),
  views: resolve(__dirname, 'views'),
  pages: resolve(__dirname, 'views', 'pages'),
  public: resolve(__dirname, '..', 'public'),
  dist: resolve(__dirname, '..', 'public', 'dist'),
  static: resolve(__dirname, '..', 'public', 'static'),
}

export { Dir }
