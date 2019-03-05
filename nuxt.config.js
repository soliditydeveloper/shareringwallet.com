const pkg = require('./package')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const websiteTitle = 'ShareRing Paper Wallet Generator'
const description = 'Create your own ShareRing crypto paper wallet and be prepared for the mainnet! Use the generated wallet to store your SHR tokens and transact on the ShareLedger network.'

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: websiteTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: description },
      { hid: 'tilecolor', name: 'msapplication-TileColor', content: '#da532c' },
      { hid: 'themecolor', name: 'theme-color', content: '#ffffff' },
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
      { hid: 'twitter:site', name: 'twitter:site', content: 'ShareRingWallet.com' },
      { hid: 'og:title', property: 'og:title', content: websiteTitle },
      { hid: 'og:site_name', property: 'og:site_name', content: 'ShareRingWallet.com' },
      { hid: 'og:url', property: 'og:url', content: 'https://shareringwallet.com/' },
      { hid: 'og:image', property: 'og:image', content: 'https://i.imgur.com/pZkuFaw.png' },
      { hid: 'og:description', property: 'og:description ', content: description },
      { hid: 'og:type', property: 'og:type', content: 'website' }
    ],
    link: [
      { rel: 'mask-icon', href: 'favicon/safari-pinned-tab.svg', color: '#5bbad5' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: 'favicon/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: 'favicon/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: 'favicon/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: 'favicon/favicon-16x16.png' },
      { rel: 'manifest', href: 'favicon/site.webmanifest' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [ 
    { src: '~/plugins/bulma-checkradio', ssr: false },
    { src: '~/plugins/shr-keys/index', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/bulma',
    [ 'nuxt-fontawesome', {
      component: 'fa', 
      imports: [
        {
          //@fortawesome/fontawesome-free-brands
          set: '@fortawesome/free-solid-svg-icons',
          icons: [
            'faUser',
            'faCheck',
            'faExclamationTriangle',
            'faTimes',
            'faDice',
            'faKey',
            'faQuestion'
          ]
        },
        {
          set: '@fortawesome/fontawesome-free-brands',
          icons: [
            'faGithub',
            'faTelegram'
          ]
        }
      ]
    } ]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    postcss: {
      plugins: {
        'postcss-preset-env': {
          features: {
            customProperties: false
          }
        }
      }
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: [ /(node_modules)/, /(shr-keys)/ ]
        })
      }
    }
  }
}
