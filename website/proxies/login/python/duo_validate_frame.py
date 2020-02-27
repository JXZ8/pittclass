#!/usr/bin/env python

"""
proxies.duo_validate_frame

~~~~~~~~~~~~~~

This file reads the mobile validate template and returns it after some modification

"""

import sys
import requests
from bs4 import BeautifulSoup
import lxml
import time
import json
from database import *

with open("../template/duo_validate_frame.tpl") as f:
    content = f.read()



print(content)














