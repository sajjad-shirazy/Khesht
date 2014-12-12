/// <amd-dependency path="async!http://maps.google.com/maps/api/js?sensor=false"/>

import U = require('khesht/utils');
import D = require('khesht/dom');
import Base = require('khesht/component');

class Map extends google.maps.Map {
    constructor(contatiner: JQuery, options?: google.maps.MapOptions) {
        super(contatiner[0], options = $.extend({
            zoom: 14,
            styles: [{ featureType: "landscape", stylers: [{ saturation: -100 }, { lightness: 65 }, { visibility: "on" }] }, { featureType: "poi", stylers: [{ saturation: -100 }, { lightness: 51 }, { visibility: "simplified" }] }, { featureType: "road.highway", stylers: [{ saturation: -100 }, { visibility: "simplified" }] }, { featureType: "road.arterial", stylers: [{ saturation: -100 }, { lightness: 30 }, { visibility: "on" }] }, { featureType: "road.local", stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: "on" }] }, { featureType: "transit", stylers: [{ saturation: -100 }, { visibility: "simplified" }] }, { featureType: "administrative.province", stylers: [{ visibility: "off" }] }, { featureType: "water", elementType: "labels", stylers: [{ visibility: "on" }, { lightness: -25 }, { saturation: -100 }] }, { featureType: "water", elementType: "geometry", stylers: [{ hue: "#ffff00" }, { lightness: -25 }, { saturation: -97 }] }],
            autoHeight: true
        }, options));
        if (options['autoHeight']) {
            contatiner.height(contatiner[0].offsetWidth * 9 / 16);
        }
        if (options['GPS']) {
            Map.getGeolocation((location: google.maps.LatLng) => {
                this.setCenter(location);
                this.setZoom(options.zoom);
                new google.maps.event.trigger(this, 'GPS');
            });
        }
    }
    addMarker(location: google.maps.LatLng): google.maps.Marker {
        return new google.maps.Marker({
            position: location,
            map: this
        });
    }
    static LatLng(lat: number, lng: number): google.maps.LatLng {
        return new google.maps.LatLng(lat, lng);
    }
    static getGeolocation(success: (location: google.maps.LatLng) => void) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                success(Map.LatLng(position.coords.latitude, position.coords.longitude));
            }, function (error) {
                    U.error(error, error.message);
                });
        } else {
            U.error(null, 'Geolocation is not supported by this browser.');
        }
    }
}
export = Map;