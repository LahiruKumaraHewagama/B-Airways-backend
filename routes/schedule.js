const router = require("express").Router();
const {
  getSchedule,
  getFlightInfo,
  getSeatPrice,
} = require("../controller/flightController");
const { checkToken, setUserIfLoggedIn } = require("../auth/token_validation");
const { isBooked } = require("../middlewares/isBooked");

router.get("/", setUserIfLoggedIn, getSchedule);
router.get("/:flight_id", setUserIfLoggedIn, getFlightInfo);
router.get("/:flight_id/:seat_id", setUserIfLoggedIn, isBooked, getSeatPrice);

module.exports = router;
