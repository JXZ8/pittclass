#!/usr/bin/env python

"""
proxies.validate_pwd


~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Validate username and pwd.
If correct, insert sig to database && insert sessionid and username. (password will not be inserted). Print success json string

If not, print failed json string.


"""

import sys
import requests
from bs4 import BeautifulSoup
import lxml
import time
import json
from database import *
import uuid



db = Database("proxy")


'''
vars:
    {{sid}}
    {{sid_urlencode}}
'''

return_dict = {}

headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"}

#TODO: check indexError and log
session_id = sys.argv[1]
username = sys.argv[2]
password = sys.argv[3]


s = requests.session()

r = s.post('https://my.pitt.edu/portal/server.pt', headers = headers)


#get RelayState and SAMLRequest
bs4_string = BeautifulSoup( r.text, 'lxml') 

rs = bs4_string.find("input",{"name":"RelayState"})["value"]
samlr = bs4_string.find("input",{"name":"SAMLRequest"})["value"]


data = {}

data["RelayState"] = rs
data["SAMLRequest"] = samlr

r = s.post("https://passport.pitt.edu/idp/profile/SAML2/POST/SSO", data = data, headers = headers, allow_redirects = True)

url = r.url

cookie_TS011399e2 = s.cookies["TS011399e2"]
cookie_TS015c5662 = s.cookies["TS015c5662"]
cookie_JSESSIONID = s.cookies["JSESSIONID"]


#update cookies to database
db.execute("UPDATE login_session SET `cookie_TS011399e2`='"+cookie_TS011399e2+"' WHERE `session_id`='"+session_id+"'")
db.execute("UPDATE login_session SET `cookie_TS015c5662`='"+cookie_TS015c5662+"' WHERE `session_id`='"+session_id+"'")
db.execute("UPDATE login_session SET `cookie_JSESSIONID`='"+cookie_JSESSIONID+"' WHERE `session_id`='"+session_id+"'")

db.commit()


data = {"j_username":username,
        "j_password":password,
        "_eventId_proceed":""}

r = s.post(url, data = data, headers = headers)

if r.text.find("login-alert") != -1:
    with open("../template/login_wrong_credential.tpl") as f:
        lines = f.read().replace("\n","")
    return_dict["status"] = "failed"
    return_dict["reason"] = "Incorrect username or password"
    return_dict["content"] = lines
    print(json.dumps(return_dict))




bs4_string = BeautifulSoup(r.text, 'lxml')

data_sig_request = bs4_string.find("iframe",{"id":"duo_iframe"})["data-sig-request"]

sig = data_sig_request.split(":APP")[0]

#update sig to database
db.execute("UPDATE login_session SET `data-sig-request2`='"+data_sig_request.split(":APP")[1]+"' WHERE `session_id`='"+session_id+"'")
db.execute("UPDATE login_session SET `sig`='"+sig+"' WHERE `session_id`='"+session_id+"'")
db.execute("UPDATE login_session SET `url`='"+url+"' WHERE `session_id`='"+session_id+"'")

db.insert("login_cookie",{"id":uuid.uuid1(), "session_id":session_id, "username":username})
db.commit()


return_dict["status"] = "success"
print(json.dumps(return_dict))


'''

auth_url = "https://api-f2c42ced.duosecurity.com/frame/web/v1/auth?tx="+sig+"&parent="+url+"&v=2.6"

data = {}

data["tx"] = sig
data["parent"] = url
data["referer"] = url

r = s.post(auth_url, data = data, headers = headers, allow_redirects = False)

sid_urlencode = r.headers["location"].split("sid=")[1]
sid = requests.utils.unquote(sid_urlencode)


content = content.replace("{{sid}}", sid)
content = content.replace("{{sid_urlencode}}", sid_urlencode)

print(content)
'''














