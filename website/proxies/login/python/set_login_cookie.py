import sys
import requests
from database import *

db = Database("proxy")


session_id = sys.argv[1]

data_dict = db.query_db_dict("SELECT * FROM `login_session` WHERE `session_id` = '"+session_id+"'")

sig_response = data_dict[0]["sig-response"]
url = data_dict[0]["url"]

data = {}

data["_eventId"] = "proceed"
data["sig_response"] = sig_response

num = int(url[-1])
url = url[:-1]+str(num+1)
r = requests.post(url, data=data, cookies={'TS011399e2':data_dict[0]["cookie_TS011399e2"], 'TS015c5662':data_dict[0]["cookie_TS015c5662"], 'JSESSIONID': data_dict[0]["cookie_JSESSIONID"]})


shib_idp_session = r.cookies["shib_idp_session"]
shib_idp_session_ss = r.cookies["shib_idp_session_ss"]


db.execute("UPDATE `login_cookie` SET `shib_idp_session`='"+shib_idp_session+"' WHERE `session_id`='"+session_id+"'")
db.execute("UPDATE `login_cookie` SET `shib_idp_session_ss`='"+shib_idp_session_ss+"' WHERE `session_id`='"+session_id+"'")
db.commit()

db.execute("UPDATE `login_session` SET `is_complete`=1 WHERE `session_id`='"+session_id+"'")
db.commit()
AAdzZWNyZXQx0VbauCbcmQ9b%2BnEF81qdiMOinvK37%2B0v%2BVXuJZSMleZ7aSGKW4M46sl1uI%2FLjhjLsKuPLHMhsed4PRHIErncUi4ArCm5XenshH5Akldcoip7H1zVaVNVat6m8K69h9PduAwMQ2Az6YCG14%2BU0atWWV3abiuuOVHi2NAgJ7%2BRA7wNIL7c1IHT7eD5o0LTpmapwxcb1jR3O58AqmSOsTr0BfhNmalZGwngt7gnh71KPsavI2JPC1FVJdSp7%2FY%2Ff6a%2F3LtYY6AAMRkgUBedEwqjV9xaCYAbrgTrAOYKCbh2Gzb16HuOfDCYpwnUm1hiUfYsvFUQGzc4l1%2BmmneYoE3sLdIOvyROQi3eeuehJ4VqG6gTmQQQJ0g6SxQ85pKAq8D835sWM0OgcoSLSE19Wx9tFy70w6F1%2BhL%2Bwlyh6VJdEPJRKMTnXPto42jIzDCRiWUfQiNqljzc%2BJ2mWwduiNFzWTO64qo4Uf%2BJTQn8BB5R0tEksYOVeaXbVA35buqkhyySMfy7UltqJVLUmoUtNY0PwSJeP0VkUk7o3mJO7Z9Vcu%2FZ%2F8dEPvkx73Mdscs0b3ez4osmWubtlKMgV706mlLu%2BLkNqA0l%2FKf61cKYNKwWPfrXeQXf2wTVsiBWK2va54dMaqs9cS01bLSANug9BnA7bTvqEk3mSHkIxUZsNLkopkaqX6%2Bj5TcEe%2BxmCrDg6kLRgEdEkTW%2F3No%2BeDNNctKRNFWehmfo4YJGHj6ZQTvVhOIGo%2BWkNMoApKptT1fEu%2FD%2Fl8AEyMkVEyhO3zOT3rtazjxYVBZ32b4STLKccrz4Hj4xgeujbPriPXpoQ3EdEBAH7qYen02fSJAYoAwZKbxacPSvLpcd
shib_idp_session_ss
