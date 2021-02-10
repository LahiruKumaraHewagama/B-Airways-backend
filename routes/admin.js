const router = require('express').Router();
const { getGuestCount, getRegCount, getFlights, getPassCount, getPassAgeDetails, getPassDesCount } = require("../controller/adminController");


router.post('/guest',getGuestCount);
router.post('/register',getRegCount);
router.post('/passflights',getFlights);
router.post('/passcount', getPassCount);

router.get('/passagedetails/:flight_id',getPassAgeDetails);
router.post('/passdescount',getPassDesCount);


module.exports=router;