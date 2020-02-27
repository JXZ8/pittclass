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
txid = sys.argv[2]


data["sid"] = sid
data["txid"] = txid

s = requests.session()

r = s.post("https://api-f2c42ced.duosecurity.com/frame/status", data = data)


print(r.text)


