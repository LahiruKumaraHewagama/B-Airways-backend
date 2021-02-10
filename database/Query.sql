-- To number of passengers travelling to a given destination

DELIMITER $$
 CREATE FUNCTION passengers_count_destination  (start_date date ,end_date date ,destination varchar(20)) 
 RETURNS INT
 DETERMINISTIC
    BEGIN 

 	declare p_count integer;    
	select count(b.user_id) into p_count
	from booking b where b.flight_id in (select f.flight_id from flight_schedule f left join route r on f.route_id=r.route_id where r.destination=destination and date BETWEEN start_date AND end_date ) ;
    
	return p_count;

    END$$
DELIMITER ;



-- To find all passengers ( below age 18,above age 18 )for given flight id

DELIMITER $$
  CREATE PROCEDURE passengers_above_below_18(flight_id varchar(30))
  
    BEGIN
    
        SELECT * ,(YEAR(CURDATE())-YEAR(u.birthday)) as age FROM  
        user u natural join booking b where b.flight_id=flight_id ;
        
    END$$
DELIMITER ;

--------------------------------------------------

DELIMITER $$
 CREATE FUNCTION get_Number_Of_Guest_Passengers  (start_date date ,end_date date) 
 RETURNS INT
 DETERMINISTIC
    BEGIN 

 	declare p_count integer;    
	select count(*) into p_count
	from flight_schedule natural join booking natural join user where date BETWEEN start_date AND end_date AND is_registered=0 ;
    
	return p_count;

    END$$
DELIMITER ;

----------------------------------------------------------
DELIMITER $$
  CREATE PROCEDURE get_Number_Of_Registered_Passengers(start_date date ,end_date date)
  
    BEGIN
    
        SELECT package_name,count(*) as num_of_passengers FROM flight_schedule natural join booking natural join profile where date BETWEEN start_date AND end_date group by package_name;
        
    END$$
DELIMITER ;

-----------------------------------------------------------------

DELIMITER $$
  CREATE PROCEDURE get_All_Pass_Flights(in_origin varchar(20), in_destination varchar(20))
  
    BEGIN
    
        SELECT * FROM flight_schedule natural join route where date<CURDATE() and origin=in_origin and destination=in_destination;
        
    END$$
DELIMITER ;

-------------------------------------------------------------------

DELIMITER $$
 CREATE FUNCTION get_Passenger_Count_O_D  (in_origin varchar(20), in_destination varchar(20)) 
 RETURNS INT
 DETERMINISTIC
    BEGIN 

 	declare p_count integer;    
	select count(*) into p_count
	from booking natural join flight_schedule natural join route where date<CURDATE() and origin=in_origin and destination=in_destination ;
    
	return p_count;

    END$$
DELIMITER ;