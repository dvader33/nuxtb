import Cookie from 'js-cookie'

export default ({$config}, inject) => {

    window.initAuth = init
    addScript()
    inject('auth', {
        signOut
    })

    function addScript(){
        const script = document.createElement('script')
        script.src = `https://apis.google.com/js/platform.js?onload=initAuth`
        script.async = true
        window.initGoogleMaps = initGoogleMaps
        document.head.appendChild(script)
    }

    function init(){
        window.gapi.load('auth2', async function() {
            /* Ready. Make a call to gapi.auth2.init or some other API */
            const auth2 = await window.gapi.auth2.init({
                client_id: $config.auth.clientId,
            })

            auth2.currentUser.listen(parseUser)
          });
        window.gapi.signin2.render('googleButton', {
            onsuccess: parseUser,
        })     
    }

    function parseUser(user){
        const profile = user.getBasicProfile()
        console.log('name: ' + profile.getName());
        console.log('img url: ' + profile.getImageUrl());

        if(!user.isSignedIn()){
            Cookie.remove($config.auth.cookieName)
            return
        }

        const idToken = user.getAuthResponse().id_token
        Cookie.set($config.auth.cookieName, idToken, { expires: 1/24, sameSite: 'Lax' })
    }

    function signOut(){
        const auth2 = window.gapi.auth2.getAuthInstance()
        auth2.signOut()
    }

}