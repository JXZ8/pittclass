#!/usr/bin/env python

"""
proxies.login

~~~~~~~~~~~~~~

This file return the login page template from template file

"""

import sys
from database import *
import uuid
#TODO: update python logger

db = Database("proxy")

session_id = sys.argv[1] #TODO: check indexError and log

db.insert("login_session", {"id":uuid.uuid1(), "session_id":session_id})
db.commit()

with open("../template/login_wrong_cedenial.tpl") as f:
    content = f.read()
    content = content.replace("{{session_id}}", session_id)
    print(content)

