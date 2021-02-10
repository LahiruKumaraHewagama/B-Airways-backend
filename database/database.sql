USE bairway;
DROP TABLE IF EXISTS `booking`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `profile`;
DROP TABLE IF EXISTS `admin`;
DROP TABLE IF EXISTS `flight_schedule`;
DROP TABLE IF EXISTS `route`;
DROP TABLE IF EXISTS `seat_info`;
DROP TABLE IF EXISTS `travel_class`;
DROP TABLE IF EXISTS `packages`;
DROP TABLE IF EXISTS `airport`;
DROP TABLE IF EXISTS `aircraft`;
DROP TABLE IF EXISTS `aircraft_model`;

CREATE TABLE `aircraft_model` (
  `model_id` varchar(30),
  `model_name` varchar(30),
  `economy_seat_capacity` int,
  `business_seat_capacity` int,
  `platinum_seat_capacity` int,
  `aircraft_charge` int,
  PRIMARY KEY (`model_id`)
);

CREATE TABLE `aircraft` (
  `aircraft_id` varchar(30),
  `model_id` varchar(30),
  PRIMARY KEY (`aircraft_id`),
  FOREIGN KEY (model_id) REFERENCES aircraft_model(model_id)
);

CREATE TABLE `airport` (
  `airport_id` varchar(10),
  `country` varchar(10),
  `state` varchar(10),
  `city` varchar(10),
  `lat` varchar(10),
  `long` varchar(10),
  PRIMARY KEY (`airport_id`)
);

CREATE TABLE `packages` (
  `min_travel_count` int,
  `package_name` varchar(20),
  `precentage` float,
  PRIMARY KEY (`package_name`)
);

CREATE TABLE `travel_class` (
  `travel_class_id` varchar(10),
  `class_name` varchar(10),
  `travel_class_charge` int,
  PRIMARY KEY (`travel_class_id`)
);

CREATE TABLE `seat_info` (
  `seat_id` varchar(30),
  `aircraft_id` varchar(30),
  `travel_class_id` varchar(30),
  PRIMARY KEY (`seat_id`),
  FOREIGN KEY (aircraft_id) REFERENCES aircraft(aircraft_id),
  FOREIGN KEY (travel_class_id) REFERENCES travel_class(travel_class_id)
);





CREATE TABLE `route` (
  `route_id` varchar(10),
  `origin` varchar(10),
  `destination` varchar(10),
  `route_charge` int(10),
  PRIMARY KEY (`route_id`),
  FOREIGN KEY (origin) REFERENCES airport(airport_id),
  FOREIGN KEY (destination) REFERENCES airport(airport_id)
);



CREATE TABLE `flight_schedule` (
  `flight_id` varchar(30),
  `aircraft_id` varchar(30),
  `date` date,
  `start_time` time,
  `end_time` time,
  `route_id` varchar(10),
  PRIMARY KEY (`flight_id`),
  FOREIGN KEY (aircraft_id) REFERENCES aircraft(aircraft_id),
  FOREIGN KEY (route_id) REFERENCES route(route_id)
);



CREATE TABLE `admin` (
  `admin_id` varchar(30),
  `name` varchar(10),
  `email` varchar(10),
  `password` varchar(10),
  `gender` varchar(10),
  `contact_no` varchar(10),
  PRIMARY KEY (`admin_id`)
);

CREATE TABLE `profile` (
  `user_id` varchar(30),
  `user_photo` varchar(30),
  `password` varchar(200),
  `package_name` varchar(30),
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (package_name) REFERENCES packages(package_name)
);

CREATE TABLE `user` (
  `user_id` int(255) AUTO_INCREMENT,
  `name` varchar(30),
  `email` varchar(30) UNIQUE,
  `birthday` date,
  `contact_no` varchar(10),
  `passport_no` varchar(20),
  `country` varchar(20),
  `is_registered` boolean,
  PRIMARY KEY (`user_id`)
);

CREATE TABLE `booking` (
  `user_id` int(255),
  `booking_id` int(255) AUTO_INCREMENT,
  `seat_id` varchar(30),
  `flight_id` varchar(30),
  `price` numeric(10, 2),
  PRIMARY KEY (`booking_id`),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (seat_id) REFERENCES seat_info(seat_id),
  FOREIGN KEY (flight_id) REFERENCES flight_schedule(flight_id)
);
