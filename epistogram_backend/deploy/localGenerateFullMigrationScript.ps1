$dest_pass= 'epistogram'
$dest_host= 'localhost'
$dest_port= '7014'
$dest_user= 'dev_service_user'
$dest_db_name= 'localhostDB'

cd ../../misc/scripts/scriptProducer
tsc
cd ../../../epistogram_backend/deploy

./generateFullMigrationScript.ps1 `
    -dbpass $dest_pass `
    -dbhost $dest_host `
    -dbport $dest_port `
    -dbname $dest_db_name `
    -dbuser $dest_user