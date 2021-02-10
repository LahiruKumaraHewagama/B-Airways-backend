const pool = require("../config/database");

module.exports = {
  createRegisteredUser: (data, callBack) => {
    pool.query(
      `insert into user (name,email,birthday,contact_no,passport_no,country,is_registered)
            values (?,?,?,?,?,?,?);`,
      [
        data.name,
        data.email,
        data.birthday,
        data.contact_no,
        data.passport_no,
        data.country,
        true,
      ],
      (err, result) => {
        if (err) {
          return callBack(err);
        } else {
          pool.query(
            "insert into profile (user_id ,user_photo,password,package_name) values (?,?,?,?)",
            [result.insertId, data.user_photo, data.password, "Basic"],
            (err, result) => {
              if (err) {
                return callBack(err);
              } else {
                return callBack(null, result);
              }
            }
          );
        }
      }
    );
  },
  getRegistedUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from user natural join profile natural join packages where email=?`,
        [email],
        (err, result) => {
          if (err) {
            reject(err);
          }
          console.log(result);
          resolve(result[0]);
        }
      );
    });
  },
  getRegistedUserById: (user_id) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `select * from user natural join profile where user_id=?`,
        [user_id],
        (err, result) => {
          if (err) {
            reject(err);
          }
          console.log(result[0]);
          resolve(result[0]);
        }
      );
    });
  },
};
