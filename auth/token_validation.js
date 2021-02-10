const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: err.message,
          });
        } else {
          req.user = decoded.result;
          next();
        }
      });
    } else {
      res.json({
        success: 0,
        message: "Access denied ! No token",
      });
    }
  },
  setUserIfLoggedIn: async (req, res, next) => {
    let token = req.get("authorization");

    if (token) {
      token = token.slice(7);
      verify(token, "qwe1234", (err, decoded) => {
        if (err) {
          res.json({
            success: 0,
            message: err.message,
          });
        } else {
          req.user = decoded.result;
          next();
        }
      });
    } else {
      next();
    }
  },
};
