const pool = require("../config/database");

module.exports = {
  getFlightSchedule(callBack) {
    pool.query(
      `SELECT * FROM (SELECT * FROM flight_schedule natural join route) as a join (SELECT airport_id,country as origin_country,state  as origin_state ,city as origin_city  FROM airport) as b ON a.origin=b.airport_id join (SELECT airport_id,country as destination_country,state  as destination_state ,city as destination_city  FROM airport) as c ON a.destination=c.airport_id order by date desc`,
      [],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          return callBack(null, result);
        }
      }
    );
  },
  getFlightInfo(flight_id) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM (SELECT * FROM flight_schedule natural join route order by date desc) as a join (SELECT airport_id,country as origin_country,state  as origin_state ,city as origin_city  FROM airport) as b ON a.origin=b.airport_id join (SELECT airport_id,country as destination_country,state  as destination_state ,city as destination_city  FROM airport) as c ON a.destination=c.airport_id where flight_id=?`,
        [flight_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            pool.query(
              `SELECT SEAT_ID,CLASS_NAME FROM SEAT_INFO NATURAL JOIN TRAVEL_CLASS WHERE AIRCRAFT_ID=? ORDER BY SEAT_ID;SELECT SEAT_ID FROM BOOKING WHERE FLIGHT_ID=? `,
              [result[0].aircraft_id, flight_id],
              (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  result[0].seat_info = {};
                  const seats = { ...results[0] };
                  const bookedSeats = [];
                  for (var j = 0; j < results[1].length; j++) {
                    bookedSeats.push(results[1][j].SEAT_ID);
                  }
                  for (var i = 0; i < results[0].length; i++) {
                    result[0].seat_info[seats[i].SEAT_ID] = seats[i];
                    if (bookedSeats.includes(seats[i].SEAT_ID)) {
                      result[0].seat_info[seats[i].SEAT_ID].isAvailable = false;
                    } else {
                      result[0].seat_info[seats[i].SEAT_ID].isAvailable = true;
                    }
                  }

                  resolve(result);
                }
              }
            );
          }
        }
      );
    });
  },

  getSeatPrice(flight_id, seat_id) {
    return new Promise((resolve, reject) => {
      pool.query(
        `select aircraft_charge,route_charge,travel_class_charge from flight_schedule natural join route natural join aircraft natural join seat_info natural join travel_class natural join aircraft_model where flight_id = ? and seat_id = ?`,
        [flight_id, seat_id],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
};
