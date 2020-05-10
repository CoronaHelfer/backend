import { Client } from '@googlemaps/google-maps-services-js';
import Environment from '../../environments';

const GoogleMapsClient = new Client();

const GeocodingService = {
  async addressToCoordinate(
    zipcode: number,
    street?: string,
    city?: string,
    streetNr?: string,
  ): Promise<number[]> {
    try {
      const response = await GoogleMapsClient.geocode({
        params: {
          address: (street || '') + ' ' + (streetNr || '') + ' ' + (zipcode || '') + ' ' + (city || ''),
          key: Environment.GOOGLE_API_KEY,
        },
      });

      if (response.data.status !== 'OK') {
        console.error('Geocoding request failed with status:', response.data.status);
        return null;
      }

      const coordinates = [
        response.data.results[0].geometry.location.lng,
        response.data.results[0].geometry.location.lat,
      ];

      return coordinates;
    } catch (error) {
      console.error('Unexpected Geocoding Failure', error);
    }
  },

  distanceBetweenTwoCoordinates(lat1, lon1, lat2, lon2): number {
    const quatorialEarthRadius = 6378.1370;
    const d2r = (Math.PI / 180.0);
    const dlong = (lon2 - lon1) * d2r;
    const dlat = (lat2 - lat1) * d2r;
    const a = Math.pow(Math.sin(dlat / 2.0), 2.0) + Math.cos(lat1 * d2r) * Math.cos(lat2 * d2r)
      * Math.pow(Math.sin(dlong / 2.0), 2.0);
    const c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
    const d = quatorialEarthRadius * c;
    console.log(`Distance between [${lat1},${lon1}] and [${lat2},${lon2}] is ${d * 1000}`);
    return Math.round(d * 1000);
  },
};

export default GeocodingService;
