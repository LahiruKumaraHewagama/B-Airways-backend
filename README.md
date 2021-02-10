# B-Airways-backend
Database Mini project 

## Guide

First clone this project directory.

```bash
git clone https://github.com/kasun7153/B-Airways-backend.git
```

Install Node Modules

```bash
npm install
```

 Then run the express server.

```bash
npm start
```

### Api Endpoints

* SignUp - POST

```bash
http://localhost:3000/user/signup
```

{
    "name":"kasun",
    "email":"kasun7153@gmail.com",
    "birthday":"1997-11-17",
    "contact_no":"0763250332",
    "passport_no":"1234",
    "country":"Sri Lanka",
    "password":"password",
    "user_photo":"my_photo"
}


* SignIn - POST

```bash
http://localhost:3000/user/signin
```

{
    "email":"kasun7153@gmail.com",
    "password":"password"
}

* User Profile - GET

```bash
http://localhost:3000/user/profile
```


