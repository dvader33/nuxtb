export default function ({ $config }, inject) {
    const appId = $config.appId
    const apiKey = $config.apiKey
    const headers =  {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId
    }

    inject('dataApi', {
        getHome,
        getReviewsByHomeId
    })

    async function getHome(homeId){
      try{  
      return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
      } catch(error){
          return getErrorResponse
      }
    }

    async function unWrap (response){
        const json = await response.json()
        const {ok, status, statusText} = response
        return{
            json,
            ok,
            status,
            statusText,
        }
    }

    async function getReviewsByHomeId(homeId){
        try{  
        return unWrap (await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, { 
            headers,
            method: 'POST',
            body: JSON.stringify({
                    filters: `homeId:${homeId}`,
                    hitsPerPage: 4,
                    attributesToHighlight: []
            })
         }))} catch(error){
            return getErrorResponse
        }
    }

    function getErrorResponse(error){
       return{
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
       } 

    }
}