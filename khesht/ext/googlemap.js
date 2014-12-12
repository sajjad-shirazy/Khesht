/// <amd-dependency path="async!http://maps.google.com/maps/api/js?sensor=false"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'khesht/utils', "async!http://maps.google.com/maps/api/js?sensor=false"], function (require, exports, U) {
    var Map = (function (_super) {
        __extends(Map, _super);
        function Map(contatiner, options) {
            var _this = this;
            _super.call(this, contatiner[0], options = $.extend({
                zoom: 14,
                styles: [{ featureType: "landscape", stylers: [{ saturation: -100 }, { lightness: 65 }, { visibility: "on" }] }, { featureType: "poi", stylers: [{ saturation: -100 }, { lightness: 51 }, { visibility: "simplified" }] }, { featureType: "road.highway", stylers: [{ saturation: -100 }, { visibility: "simplified" }] }, { featureType: "road.arterial", stylers: [{ saturation: -100 }, { lightness: 30 }, { visibility: "on" }] }, { featureType: "road.local", stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: "on" }] }, { featureType: "transit", stylers: [{ saturation: -100 }, { visibility: "simplified" }] }, { featureType: "administrative.province", stylers: [{ visibility: "off" }] }, { featureType: "water", elementType: "labels", stylers: [{ visibility: "on" }, { lightness: -25 }, { saturation: -100 }] }, { featureType: "water", elementType: "geometry", stylers: [{ hue: "#ffff00" }, { lightness: -25 }, { saturation: -97 }] }],
                autoHeight: true
            }, options));
            if (options['autoHeight']) {
                contatiner.height(contatiner[0].offsetWidth * 9 / 16);
            }
            if (options['GPS']) {
                Map.getGeolocation(function (location) {
                    _this.setCenter(location);
                    _this.setZoom(options.zoom);
                    new google.maps.event.trigger(_this, 'GPS');
                });
            }
        }
        Map.prototype.addMarker = function (location) {
            return new google.maps.Marker({
                position: location,
                map: this
            });
        };
        Map.LatLng = function (lat, lng) {
            return new google.maps.LatLng(lat, lng);
        };
        Map.getGeolocation = function (success) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    success(Map.LatLng(position.coords.latitude, position.coords.longitude));
                }, function (error) {
                    U.error(error, error.message);
                });
            }
            else {
                U.error(null, 'Geolocation is not supported by this browser.');
            }
        };
        return Map;
    })(google.maps.Map);
    return Map;
});
//# sourceMappingURL=googlemap.js.map