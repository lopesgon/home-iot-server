#!/bin/bash
# this is a shell script to save data directly to mongodb using Gridfs.

#First: testing if the database is running
#TODO

#Second: getting file name in static path
file=$1
if[ "-f $file" ]; then


#Third: check type of file (jpeg or mp4)
type=$2

#Fourth: store file into mongodb
  mongofiles -d thesis-db --type $type --local ~/Documents/Javascript/thesis-server/readTest/$file put any.mp4

#Fifth: delete file from source
