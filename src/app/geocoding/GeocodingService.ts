import config from '../../config/environments'; //please config there
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client({});

class GeocodingService {
    public static addressToCoordinate(plz: number, street: string, city: string, streetNr: string)
        : { lat: number, lon: number } {
        client.geocode({
            params: {
                address: street + streetNr + plz + city,
                key: config.googleApiKey
            },
            timeout: 1000 // milliseconds
        })
            .then(r => {
                return {
                    lat: r.data.results[0].geometry.location.lat,
                    lon: r.data.results[0].geometry.location.lng,
                };
            })
            .catch(e => {
                console.log(e);
            });
        return {
            lat: 0,
            lon: 0
        }
    }

    public static distanceBetweenTwoCoordinates(lat1, lon1, lat2, lon2): number {

        return 0;
    }
}

export default new GeocodingService();
