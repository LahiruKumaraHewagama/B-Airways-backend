const e = require("express");
const {
  getFlightSchedule,
  getFlightInfo,
  getSeatPrice,
} = require("../service/flightService");

const { getRegistedUserByEmail } = require("../service/userService");

module.exports = {
  getSchedule: (req, res) => {
    console.log(req.user);
    getFlightSchedule((err, result) => {
      if (err) {
        console.log(err);
      } else {
        //console.log(result)
        res.json({
          sucess: 1,
          data: result,
          messege: "Loggedin User flight scedule",
        });
      }
    });
  },
  getFlightInfo: async (req, res) => {
    try {
      const result = await getFlightInfo(req.params.flight_id);
      if (result) {
        console.log("done");
        res.json({
          sucess: 1,
          data: result,
        });
      } else {
        res.json({
          sucess: 0,
          message: "Invalid Flight ID",
        });
      }
    } catch (err) {
      console.log(err);
    }
  },
  getSeatPrice: async (req, res) => {
    const result = await getSeatPrice(req.params.flight_id, req.params.seat_id);
    const default_price =
      result.aircraft_charge + result.route_charge + result.travel_class_charge;
    var discount_price = default_price;

    if (req.user) {
      const {
        user_id,
        package_name,
        precentage,
      } = await getRegistedUserByEmail(req.user.email);
      if (precentage == 0) {
        res.json({
          user_id,
          package_name,
          default_price,
          discount_price,
        });
      } else {
        discount_price = default_price * ((100 - precentage) / 100);
        res.json({
          user_id,
          package_name,
          default_price,
          discount_price,
        });
      }
    } else {
      res.json({
        user_id: false,
        default_price,
      });
    }
  },
};
