#!/bin/bash

#SCRIPT CREATED BY FREDERIC LOPES 2017-03-19
#@copyright Frederic Lopes Goncalves Magalhaes 2017

#DB name
database="thesis-db"
#logfile name for script errors
log="script.log"
#Folder where files have to be saved by Motion
path="/home/pi/Desktop/shell/files/output.mp4"
#File name received as first arg
file=$1

#Alt to check if it is a lastsnap (we do not store lastsnaps)
if  [[ $file == *'lastsnap'* ]]; then
	exit 0
fi

#Alt to check if file exists
if [ -f "$file" ]; then
    if [ "${file##*.}" == 'avi' ]; then
        sudo /home/pi/bin/ffmpeg -i "$file" -c:v libx264 "$path" &
	    wait
        sudo rm $file
        file=$path
    fi
	date=$(date +%Y-%m-%d:%H:%M:%S)
	extension="${file##*.}"
	name=$date.$extension
	mongofiles -d $database --type $extension --local $file put $name
	sudo rm $file
	exit 0
else
	echo "ERROR: NOT FOUND $file" >> $log
	echo "ERROR: LIST OF FILES: $(ls -la) $path" >> $log
	exit 1
fi