const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  createRegisteredUser,
  getRegistedUserByEmail,
  getRegistedUserById,
} = require("../service/userService");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    if (
      body.name &&
      body.email &&
      body.birthday &&
      body.contact_no &&
      body.passport_no &&
      body.country &&
      body.password &&
      body.user_photo
    ) {
      createRegisteredUser(body, (err, result) => {
        if (err) {
          console.log(err);
          if (err.code == "ER_DUP_ENTRY") {
            return res.json({
              sucess: 0,
              message: "email already exist",
            });
          }
          return res.json({
            sucess: 0,
            message: err,
          });
        } else {
          return res.json({
            sucess: 1,
            data: result,
            message: "SignUp successful",
          });
        }
      });
    } else {
      return res.json({
        sucess: 0,
        message: "Missing Fields",
      });
    }
  },

  loginUser: async (req, res) => {
    const body = req.body;
    let userDetailsinDatabase;
    try {
      userDetailsinDatabase = await getRegistedUserByEmail(body.email);
      if (userDetailsinDatabase) {
        const result = compareSync(
          body.password,
          userDetailsinDatabase.password
        );
        if (result) {
          userDetailsinDatabase.password = undefined;
          const jsontoken = sign({ result: userDetailsinDatabase }, "qwe1234", {
            expiresIn: "1h",
          });
          return res.json({
            sucess: 1,
            message: "login Sucess",
            token: jsontoken,
          });
        } else {
          return res.json({
            sucess: 0,
            message: "Password is invalid",
          });
        }
      } else {
        return res.json({
          sucess: 0,
          message: "Invalid Email",
        });
      }
    } catch (err) {
      console.log(err);
      return res.json({
        sucess: 0,
        message: err,
      });
    }
  },
  getUserProfile: async (req, res) => {
    userDetails = await getRegistedUserById(req.user.user_id);
    console.log(userDetails);
    return res.json({
      success: 1,
      data: { ...userDetails, password: undefined },
    });
  },
};
