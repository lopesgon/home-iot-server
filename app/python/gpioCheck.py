#!/usr/local/bin/python
# -*- coding: utf-8 -*-

#Created by fredericlopesgoncalvesmagalhaes
#@copyright Frederic Lopes Goncalves Magalhaes 2017

from tools import *
import RPi.GPIO as GPIO

def _launch(gpio):
    print("TO UNCOMMENT - GPIO module launched.")
    #GPIO.setmode(GPIO.BCM)
    #GPIO.setwarnings(False)
    #state = GPIO.setup(gpio, GPIO.OUT)
    # if (state):
    #     GPIO.output(gpio, GPIO.HIGH)
    # else:
    #     GPIO.output(gpio, GPIO.LOW)

def _main():
    #get our data as an array from read_in()
    lines = read_in()
    #objects array has to have a length of 2

    if lines.length == 1:
        gpio = lines[0]
        print("gpio value:" + gpio)
        _launch(gpio)
    else:
        print("INPUT INCORRECT!")

#start process
if __name__ == '__main__':
    _main()