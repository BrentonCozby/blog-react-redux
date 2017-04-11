import dotenv from 'dotenv'
import getenv from 'getenv'
import { resolve } from 'path'

// load env file
dotenv.config()

const Config = getenv.multi({
  env: 'NODE_ENV',
  host: 'SERVER_HOST',
  port: 'SERVER_PORT',
})

const Dir = {
  src: resolve(__dirname),
  views: resolve(__dirname, 'views'),
  public: resolve(__dirname, '..', 'public'),
  dist: resolve(__dirname, '..', 'public', 'dist'),
  static: resolve(__dirname, '..', 'public', 'static'),
}

export { Config, Dir }
