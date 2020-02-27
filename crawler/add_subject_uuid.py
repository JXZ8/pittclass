'''
Update every row in subject
Add uuid to every row
'''


from scrawler import *
import pymysql
import uuid
from database import *

db = Database("pitt_course")

subject_dict = db.query_db_dict("SELECT subject_index FROM subject")

for i in subject_dict:
    subject_index = i['subject_index']
    db.execute("UPDATE subject SET major_id ='"+str(uuid.uuid1())+"' WHERE subject_index='"+subject_index+"'")
    db.commit()

