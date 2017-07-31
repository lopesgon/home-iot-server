#!/usr/local/bin/python
# -*- coding: utf-8 -*-

#Created by fredericlopesgoncalvesmagalhaes
#@copyright Frederic Lopes Goncalves Magalhaes 2017

from tools import *
import RPi.GPIO as GPIO
import time

def _launch(pins):
    pinIn = pins[0]
    GPIO.setwarnings(False)
    GPIO.setmode(GPIO.BCM)
    GPIO.setup(pinIn, GPIO.IN)  # Read output from PIR motion sensor, OUT wire connected to PIN
    GPIO.setup(pins[1], GPIO.OUT)  # LED output pin, VCC wire
    GPIO.output(pins[1], 1)
    try:
        while True:
            if GPIO.input(pinIn):
                print "Intruder!"
            else:
                print "No Intruder detected."
            time.sleep(0.5)
    except KeyboardInterrupt:
        GPIO.cleanup() # clean up GPIO on CTRL+C exit
    GPIO.cleanup() # clean up GPIO on normal exit

#start process
if __name__ == '__main__':
    pins = read_in()
    #pins = [21, 26]
    if len(pins) == 2:
        _launch(pins)
