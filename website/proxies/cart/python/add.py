import sys
import requests
from bs4 import BeautifulSoup
import lxml
import time
import json
from database import *

db = Database("proxy")

session_id = sys.argv[1]

data_dict = db.query_db_dict("SELECT * FROM `login_cookie` WHERE `session_id` = '"+session_id+"'")

shib_idp_session = data_dict[0]['shib_idp_session']
shib_idp_session_ss = data_dict[0]['shib_idp_session_ss']

s = requests.session()

cookies = {"shib_idp_session":shib_idp_session, "shib_idp_session_ss":shib_idp_session_ss}

r = s.get("https://psmobile.pitt.edu/app/user/info/addresses", cookies = cookies)

bs4_string = BeautifulSoup(r.text, 'lxml')
url = "https://passport.pitt.edu/idp/profile/SAML2/POST/SSO"
saml_req = bs4_string.find("input",{"name":"SAMLRequest"})["value"]
r = s.post(url, data = {"SAMLRequest": saml_req})

print(r.text)
