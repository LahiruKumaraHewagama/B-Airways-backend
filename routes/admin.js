const router = require('express').Router();
const { getGuestCount, getRegCount, getFlights, getPassCount, getPassAboveAgeDetails,getPassBelowAgeDetails, getPassDesCount } = require("../controller/adminController");


router.post('/guest',getGuestCount);
router.post('/register',getRegCount);
router.post('/passflights',getFlights);
router.post('/passcount', getPassCount);

router.get('/passagedetails/above/:flight_id', getPassAboveAgeDetails);
router.get('/passagedetails/below/:flight_id',getPassBelowAgeDetails);
router.post('/passdescount',getPassDesCount);


module.exports=router;