//Showing Map for User Profile

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10', // stylesheet location
    center: user.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());


new mapboxgl.Marker()
    .setLngLat(user.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${user.username}</h3><p>${user.location}</p>`
            )
    )
    .addTo(map)

