const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in meters
    return distance;
}

exports.checkObjectsFarFromCenter = (objects, area) => {
    const { centerLat, centerLng, radius } = area;
    const farObjects = objects.filter(obj => {
        const distance = haversineDistance(centerLat, centerLng, obj.lat, obj.lan);
        return distance > radius; // Check if the object is farther than the radius
    });
    return farObjects;
}



