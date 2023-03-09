
$dump_path = "$PWD/../epitest/init"
$dump_path_abs = Resolve-Path $dump_path
echo "dump_path_abs: ${dump_path_abs}"

# backup db
./core/db_dump.ps1 `
    -dbpass "$env:LOCAL_POSTGRES_USER_PASSWORD" `
    -dbhost 'localhost' `
    -dbport '5432' `
    -dbuser 'dev_service_user' `
    -dbname 'epistogram_local' `
    -dbdumppath "$dump_path/sql/database-backup.sql"