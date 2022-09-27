let target = document.getElementById('location-text');
let watchId;

let mapOne= document.getElementById('gmap_canvas');

function appendLocation(location) {
    /*
    verb = verb || 'updated';
    let newLocation = document.createElement('p');
    newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
    target.appendChild(newLocation);

     */

    target.innerHTML = location.coords.latitude + ', ' + location.coords.longitude + '';
    mapOne.setAttribute('src', "https://maps.google.com/maps?q="+ location.coords.latitude + ",%20" + location.coords.longitude + "&t=&z=13&ie=UTF8&iwloc=&output=embed");
    //console.log(location);
    //src="https://maps.google.com/maps?q=51.6180607,%204.7771193&t=&z=13&ie=UTF8&iwloc=&output=embed"
}

if ('geolocation' in navigator) {
    document.getElementById('askButton').addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(function (location) {
            appendLocation(location, 'fetched');
        });

        //Sets a loop for watching changes in coordinates. Fires the appendLocation function when changes occur.
        //watchId = navigator.geolocation.watchPosition(appendLocation);
    });
} else {
    target.innerText = 'Geolocation API not supported.';
}