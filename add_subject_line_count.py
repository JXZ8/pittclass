'''
Update every row in subject
Add line count to every row
'''


from scrawler import *
import pymysql
import uuid
from database import *

db = Database("pitt_course")

subject_dict = db.query_db_dict("SELECT subject_index FROM subject")

line_count = 0
for i in subject_dict:
    subject_index = i['subject_index']
    db.execute("UPDATE subject SET id ='"+str(line_count)+"' WHERE subject_index='"+subject_index+"'")
    db.commit()
    line_count += 1

