SELECT 
	pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE datname = 'epistogram_DEV';

DROP DATABASE epistogram_DEV;

CREATE DATABASE epistogram_DEV
	WITH 
	OWNER = cloudsqlsuperuser
	ENCODING = 'UTF8'
	LC_COLLATE = 'en_US.UTF8'
	LC_CTYPE = 'en_US.UTF8'
	CONNECTION LIMIT = -1;