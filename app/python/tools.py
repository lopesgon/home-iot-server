#!/usr/local/bin/python
# -*- coding: utf-8 -*-

#Created by fredericlopesgoncalvesmagalhaes
#@copyright Frederic Lopes Goncalves Magalhaes 2017

import sys, json

def strToBool(value):
    """
    Convert an String representing a boolean into a boolean
    :param s: a boolean as a String
    :return: boolean
    """
    if value.lower() in ("yes", "true", "t", "1"):
        return True
    return False

def strToInt(value):
    try:
        res = int(value)
    except ValueError:
        #if error, returns a GROUND GPIO number
        res = 0
    return res

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #As our input has only one JSON line, return parse JSON data
    return json.loads(lines[0])
