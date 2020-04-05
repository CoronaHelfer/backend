import {Client} from '@googlemaps/google-maps-services-js';
import Environment from '../../config/environments'; // please config there

const client = new Client({});

class GeocodingService {

  public static async addressToCoordinate(plz: number, street: string, city: string, streetNr: string)
    : Promise<number[]> {
    const geocode = await client.geocode({
      params: {
        address: street + streetNr + plz + city,
        key: Environment.GOOGLE_API_KEY,
      },
    });
    if (!geocode.data.results.length) {
      throw new Error('Google API fail');
    }
    return [geocode.data.results[0].geometry.location.lng, geocode.data.results[0].geometry.location.lat];
  }

  public static distanceBetweenTwoCoordinates(lat1, lon1, lat2, lon2): number {
    const quatorialEarthRadius = 6378.1370;
    const d2r = (Math.PI / 180.0);
    const dlong = (lon2 - lon1) * d2r;
    const dlat = (lat2 - lat1) * d2r;
    const a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * d2r) * Math.cos(lat2 * d2r)
      * Math.pow(Math.sin(dlong / 2.0), 2.0);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    const d = quatorialEarthRadius * c;

    return d * 1000; // in km
  }
}

export default GeocodingService;

// example
// GeocodingService.addressToCoordinate(68199, null, null, null).then((result) => {
//     console.log(result);
// });
