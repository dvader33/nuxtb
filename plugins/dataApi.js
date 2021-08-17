export default function ({ $config }, inject) {
    const appId = $config.appId
    const apiKey = $config.apiKey

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId){
       const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
            headers: {
                'X-Algolia-API-Key': apiKey,
                'X-Algolia-Application-Id': appId
            }
        })
        const json = await response.json()
        return json
    }
}