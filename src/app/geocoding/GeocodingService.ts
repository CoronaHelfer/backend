class GeocodingService {
    public static addressToCoordinate(plz: number, street: string, city: string, streetNr: string)
        : { lat: number, lon: number } {

        return {
            lat: 0,
            lon: 0,
        };
    }

    public static distanceBetweenTwoCoordinates(lat1, lon1, lat2, lon2): number {

        return 0;
    }
}

export default new GeocodingService();
