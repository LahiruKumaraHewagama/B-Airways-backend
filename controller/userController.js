const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  createRegisteredUser,
  getRegistedUserByEmail,
  getRegistedUserById,editUserProfile,updatePassword
} = require("../service/userService");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

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
        });
      }
    });
  },

  loginUser: async (req, res) => {
    const body = req.body;
    let userDetailsinDatabase;
    try {
      userDetailsinDatabase = await getRegistedUserByEmail(body.email);
      console.log(userDetailsinDatabase);
      if (userDetailsinDatabase) {
        const result = compareSync(
          body.password,
          userDetailsinDatabase.password
        );
        if (result) {
          userDetailsinDatabase.password = undefined;
          const jsontoken = sign({ result: userDetailsinDatabase }, "qwe1234", {
            expiresIn: "1day",
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

  editUserProfile:async (req, res) => {
    if(!req.body.name){
      res.json({success:0,message:"Invalid Name"})
      return
    }
    if(!req.body.email){
      res.json({success:0,message:"Invalid Email"})
      return
    }
    if(!req.body.contact_no){
      res.json({success:0,message:"Invalid Contact No"})
      return
    }
    if(!req.body.country){
      res.json({success:0,message:"Invalid Country"})
      return
    }
    if(!req.body.birthday){
      res.json({success:0,message:"Invalid Birthday"})
      return
    }
    if(!req.body.passport_no){
      res.json({success:0,message:"Invalid Passport No"})
      return
    }
    editUserProfile(req.body,req.user.user_id,(err)=>{
        if(err){
          console.log(err)
          res.json({success:0,message:err.message})
        }
        res.json({success:1,message:"Profile Updated Sucessfully"})
    })
  },
  changePassword:async (req,res)=>{
    const body = req.body;
    const salt = genSaltSync(10);
    body.new_password = hashSync(body.new_password, salt);
    
      let userDetailsinDatabase = await getRegistedUserById(req.user.user_id);
      console.log(userDetailsinDatabase);
      if (userDetailsinDatabase) {
        const result = compareSync(
          body.old_password,
          userDetailsinDatabase.password
        );
        if (result) {
          updatePassword(req.user.user_id,body.new_password,(err)=>{
            if(err){
              res.json({success:0,message:err.message})
              console.log(err)
            }
            else{
              res.json({success:1,message:"Password Changed Sucessfully"})
            }
          })
        } else {
          return res.json({
            sucess: 0,
            message: "Current password is invalid",
          });
        }
      } else {
        return res.json({
          sucess: 0,
          message: "Invalid ID",
        });
      }
   

  }
};
