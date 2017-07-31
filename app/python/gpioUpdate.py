#!/usr/local/bin/python
# -*- coding: utf-8 -*-

#Created by fredericlopesgoncalvesmagalhaes
#@copyright Frederic Lopes Goncalves Magalhaes 2017

from tools import *
import RPi.GPIO as GPIO
def _launch(state, gpio):
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(gpio, GPIO.OUT)
    if (state):
        GPIO.output(gpio, GPIO.HIGH)
    else:
        GPIO.output(gpio, GPIO.LOW)

def _main():
    #get our data as an array from read_in()
    lines = read_in()
    #objects array has to have a length of 2
    state = lines[0]
    if len(lines) == 2 and state or not state:
        if lines[1] is not None:
            gpio = strToInt(lines[1])
            print("LAUNCH GPIO")
            _launch(state, gpio)
    else:
        print("INPUT INCORRECT!")

if __name__ == '__main__':
    _main()