import Environment from '../../config/environments'; //please config there
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

class GeocodingService {
    public static addressToCoordinate(plz: number, street: string, city: string, streetNr: string)
        : { lat: number, lon: number } {
        client.geocode({
            params: {
                address: street + streetNr + plz + city,
                key: Environment.googleApiKey
            },
            timeout: 1000 // milliseconds
        })
            .then(r => {
                return { //not working
                    lat: r.data.results[0].geometry.location.lat,
                    lon: r.data.results[0].geometry.location.lng,
                };
            })
            .catch(e => {
                console.log(e);
            });
        return { //not working
            lat: 0,
            lon: 0
        }
    }

    public static distanceBetweenTwoCoordinates(lat1, lon1, lat2, lon2): number {
        var _eQuatorialEarthRadius = 6378.1370;
        var _d2r = (Math.PI / 180.0);
        var dlong = (lon2 - lon1) * _d2r;
        var dlat = (lat2 - lat1) * _d2r;
        var a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * _d2r) * Math.cos(lat2 * _d2r) * Math.pow(Math.sin(dlong / 2.0), 2.0);
        var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
        var d = _eQuatorialEarthRadius * c;

        return d; //in km
    }
}

export default new GeocodingService();

//test
//console.log(GeocodingService.addressToCoordinate(27404, "Stader Str.", "Heeslingen", "3"))