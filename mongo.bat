@echo off

set MONGODB=E:\Mongo\bin\mongod.exe
set DB_PATH=E:\Mongo\db

echo Starting MongoDB ...
start %MONGODB% --dbpath %DB_PATH%

echo Success!