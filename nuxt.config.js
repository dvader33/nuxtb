export default{
    components: true,
    head:{
        titleTemplate: "mastering nuxt %s",
        htmlAttrs:{
            lang: "en"
        },
        bodyAttrs:{
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8"
        }]
    },
    router:{
        prefetchLinks: false,
    },
    plugins: [ '~/plugins/maps.client', '~/plugins/dataApi', '~/plugins/auth.client' ],
    modules:[],
    buildModules:['@nuxtjs/tailwindcss'],
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    publicRuntimeConfig:{
        mapKey: process.env.VUE_APP_MAPKEY,
        appId: process.env.VUE_APP_APPID,
        apiKey: process.env.VUE_APP_APIKEY,
        auth:{
            cookieName: 'idToken',
            clientId: process.env.VUE_APP_CLIENTID
        }
    },
    privateRuntimeConfig:{
    }
    
}