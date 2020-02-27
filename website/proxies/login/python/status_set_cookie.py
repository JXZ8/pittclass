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
import subprocess
import platform

DETACHED_PROCESS = 0x00000008



def start_insert_login_cookie(session_id):
    if platform.system() == "Windows":
        pid = subprocess.Popen([sys.executable, "../../python/set_login_cookie.py", session_id], creationflags=DETACHED_PROCESS).pid
    else:
        pid = subprocess.Popen([sys.executable, "../../python/set_login_cookie.py", session_id]).pid
    return pid



db = Database("proxy")

data = {}


#TODO: check indexError and log
session_id = sys.argv[1]
sid = sys.argv[2]
txid = sys.argv[3]

data["sid"] = sid

s = requests.session()

r = s.post("https://api-f2c42ced.duosecurity.com/frame/status/"+txid, data = data)

json_data = json.loads(r.text)


data_dict = db.query_db_dict("SELECT * FROM `login_session` WHERE `session_id` = '"+session_id+"'")



sig_response = json_data["response"]["cookie"] + ":APP" + data_dict[0]["data-sig-request2"]


db.execute("UPDATE `login_session` SET `sid`='"+sid+"' WHERE `session_id` = '"+session_id+"'")
db.execute("UPDATE `login_session` SET `txid`='"+txid+"' WHERE `session_id` = '"+session_id+"'")
db.execute("UPDATE `login_session` SET `sig-response`='"+sig_response+"' WHERE `session_id` = '"+session_id+"'")

db.commit()

start_insert_login_cookie(session_id)

print(r.text)
