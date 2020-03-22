import Environment from '../../config/environments'; //please config there
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

class GeocodingService {
    public static addressToCoordinate(plz: number, street: string, city: string, streetNr: string) {
        return new Promise<number[]>(async result => {
            await client.geocode({
                params: {
                    address: street + streetNr + plz + city,
                    key: Environment.googleApiKey
                },
                timeout: 1000 // milliseconds
            })
                .then(r => {
                    result([
                        r.data.results[0].geometry.location.lat,
                        r.data.results[0].geometry.location.lng,
                    ]);
                })
                .catch(e => {
                    console.log(e);
                });
        })
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

//example
// GeocodingService.addressToCoordinate(27404, "Stader Str.", "Heeslingen", "3").then(function(result){
//     console.log(result)
// })