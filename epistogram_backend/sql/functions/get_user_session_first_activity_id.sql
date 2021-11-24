CREATE OR REPLACE FUNCTION "get_user_session_first_activity_id"
(
	param_user_id integer,
	param_session_activity_id integer
)
RETURNS integer 
AS $$ 

DECLARE
	var_current_activity_date timestamptz;
	var_current_session_start_date timestamptz;
	var_session_first_activity_id integer;

BEGIN

	-- get current activity
	SELECT "creationDate"
	FROM "user_session_activity" 
	WHERE "id" = param_session_activity_id
	INTO var_current_activity_date;
	
	RAISE NOTICE '%', var_current_activity_date;
	
	-- get current session start date 
	SELECT "us"."sessionStartDate"
	FROM "user_session_view" AS "us" 
	WHERE "us"."userId" = param_user_id
		AND "us"."sessionStartDate" <= var_current_activity_date
		AND "us"."sessionEndDate" >= var_current_activity_date
	INTO var_current_session_start_date;
	
	RAISE NOTICE '%', var_current_session_start_date;
	
	-- get current session first activity
	SELECT 
		"id"
	FROM "user_session_activity"
	WHERE "creationDate" = var_current_session_start_date
	INTO var_session_first_activity_id;
	
	RETURN var_session_first_activity_id;
	
END 
$$ LANGUAGE 'plpgsql';