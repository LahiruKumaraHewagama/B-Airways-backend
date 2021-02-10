const { getFlightInfo } = require("../service/flightService");

module.exports = {
  isBooked: async (req, res, next) => {
    const result = await getFlightInfo(req.params.flight_id);
    const seat_data = result[0].seat_info;
    if (req.params.seat_id) {
      req.seat_data = seat_data[req.params.seat_id].isAvailable;
    }
    if (req.seat_data) {
      next();
    } else {
      res.json({
        success: 0,
        message: "Seat is already booked",
      });
    }
  },
};
