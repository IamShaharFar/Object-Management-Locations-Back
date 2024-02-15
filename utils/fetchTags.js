// fetchTags.js
let fetchInterval;

const startFetchingTags = (io) => {
    if (fetchInterval || !io) return; // Prevent multiple intervals from starting or starting without io instance
    fetchInterval = setInterval(() => {
      console.log("fetching new tags location");
      // Emit an event with a mock object
      io.emit("objectMovement", { id: 1, lat: 32.0853, lng: 34.7818, timestamp: new Date() });
    }, 5000); // 5000 milliseconds = 5 seconds
  };
const stopFetchingTags = () => {
  if (fetchInterval) {
    clearInterval(fetchInterval);
    fetchInterval = null; 
    console.log("Stopped fetching tags location");
  }
};

module.exports = { startFetchingTags, stopFetchingTags };
