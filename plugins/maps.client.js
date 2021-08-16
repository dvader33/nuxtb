export default function (context, inject){
    let maploaded = false
    let mapWaiting = null
    let mpkey = null

    addScript()

    inject('maps',{
        showMap
    })

    function addScript(){
        const script = document.createElement('script')
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mpkey}&libraries=places&callback=initMap`
        script.async = true
        window.initMap = initMap
        document.head.appendChild(script)
    }

    function initMap(){
        maploaded = true
        if(mapWaiting){
            const { canvas, lat, lng} = mapWaiting
            renderMap(canvas, lat, lng)
            mapWaiting = null
        }
    }

    function renderMap(canvas, lat, lng){
        const mapOptions = {
            zoom: 18,
            center: new window.google.maps.LatLng(lat,lng),
            disableDefaultUI: true,
            zoomControl: true
        }
         const map = new window.google.maps.Map(canvas, mapOptions)
         const posistion = new window.google.maps.LatLng(lat,lng)
         const marker = new window.google.maps.Marker({ posistion })
         marker.setMap(map)
    }

    function showMap(canvas, lat, lng, key){
        mpkey = key
        if(maploaded){
            renderMap(canvas,lat,lng)
        } else {
            mapWaiting = {canvas, lat ,lng}
        }
    }
}