#!/usr/bin/env python

"""
proxies.prompt

~~~~~~~~~~~~~~

This file starts a prompt request and return the result

"""

import sys
import requests
from bs4 import BeautifulSoup
import lxml
import time
import json
from database import *


data = {}


#TODO: check indexError and log
sid = sys.argv[1]
device = sys.argv[2]
factor = sys.argv[3]
passcode = sys.argv[4]

data["sid"] = sid
data["device"] = device
data["factor"] = factor
data["passcode"] = passcode

s = requests.session()

r = s.post("https://api-f2c42ced.duosecurity.com/frame/prompt", data = data)


print(r.text)


