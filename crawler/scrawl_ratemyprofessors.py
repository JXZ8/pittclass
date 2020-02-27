#Get professor ratings from ratemyprofessor and then store them into `professor_info`
#Note: Run scrawl_professor_apartment_from_ratemyprofessor.py after running this

import json
import requests
import pymysql
import uuid
import sys
from database import *
import time
import threading
from logger import Logger
from ThreadHandler import ThreadHandler
from bs4 import BeautifulSoup
import re

THREAD_TO_START = 8 #set the thread num
lock = threading.Lock()

l = Logger()



            
db = Database("pitt_course")




'''
#INSERT PROFESSORS FROM `class_info` TO `instructor_info`

instructor_name_list = []
professor_name_list = []
sql_statement = "SELECT instructor_name, section_id FROM `class_info` WHERE instructor_name not like '%Staff% '"

for i in db.query_db_dict(sql_statement):
    instructor_list = []
    
    
    #multiple instructors:
    if "," in i['instructor_name']:
        instructor_list = i['instructor_name'].split(",")
    else:
        instructor_list.append(i['instructor_name'])

    
    if 'LEC' in i['section_id']:
        is_professor = 1
    else:
        is_professor = 0

    for instructor in instructor_list:
        
        if instructor.strip() not in instructor_name_list or (instructor.strip() not in professor_name_list and is_professor == 1):
            if instructor.strip() not in instructor_name_list:
                db.insert("instructors", { "instructor_id":uuid.uuid1(), "instructor_name": instructor.strip(), "is_professor": is_professor})
                instructor_name_list.append(instructor.strip())
                
            elif (instructor.strip() not in professor_name_list and is_professor == 1):
                db.execute("UPDATE instructors SET is_professor = 1 WHERE instructor_name = \""+instructor+'"')
                
            
            else:
                print("Error: "+ i['instructor_name'])
            print(instructor)
            
            
            
            if is_professor:
                professor_name_list.append(instructor.strip())
                
    db.commit()

'''





class NoName(object):
    def __init__(self):
        self.proxies = {
             "https":""
        }
        self.update_ip()
    
    def update_ip(self):
        self.proxies['https'] = "https://"+requests.get("http://webapi.http.zhimacangku.com/getip?num=1&type=1&pro=&city=0&yys=0&port=11&time=1&ts=0&ys=0&cs=0&lb=4&sb=0&pb=4&mr=1&regions=").text.replace("\n","")

    def get_proxies(self):
        return self.proxies

def thread(thread_handler, thread_id):
    db = Database("pitt_course")
    ip_handler = NoName()

    proxies = ip_handler.get_proxies()
    
    while True:
        task_list = thread_handler.get_task(thread_id)
        if task_list[0] == -1:
            break
        
        for i in task_list:
            professor_name_list = i['instructor_name'].split(" ")
            professor_name = professor_name_list[0] + " " + professor_name_list[-1] #delete middle name
            professor_id = i['instructor_id'] 

            
            l.log("Thread: " + str(thread_id) + ". "+professor_name)
            url = "https://solr-aws-elb-production.ratemyprofessors.com//solr/rmp/select/?solrformat=true&rows=20&wt=json&json.wrf=noCB&callback=noCB&q="+professor_name+"&defType=edismax&qf=teacherfirstname_t%5E2000+teacherlastname_t%5E2000+teacherfullname_t%5E2000+autosuggest&bf=pow(total_number_of_ratings_i%2C1.7)&sort=score+desc&siteName=rmp&group=on&group.field=content_type_s&group.limit=20"


            while True:
                try:
                    r = requests.get(url, proxies = proxies, timeout=5)
                    break
                except Exception as e:
                    ip_handler.update_ip()
                    proxies = ip_handler.get_proxies()
                
            temp = r.text[5:-1]

            json_string = json.loads(temp)

            
            #if there is no such rmp link for that instructor, then insert ""
            if json_string['grouped']['content_type_s']['matches'] == 0:
                l.log("Thread: " + str(thread_id) + ". No link for professor: "+ professor_name)
                #only insert when there is no such data
                if len(db.query_db_dict("SELECT instructor_id FROM instructor_info WHERE instructor_id=\""+professor_id+'"')) == 0: 
                    db.insert("instructor_info", { "id": uuid.uuid1(), "instructor_id": professor_id, "department":"", "rmp_link": "", "rmp_rating": "", "rmp_difficulty": "", "instructor_link": "", "add_time":time.time() }, l)
                    db.commit()
                continue

            #get the possible instructor list. These instructor might have the same name but different schools.
            teacher_list = json_string['grouped']['content_type_s']['groups'][0]['doclist']['docs']
         
                
            teacher_id = ""
            total_rating = ""
            level_of_difficulty = ""
            number_of_ratings = -1
            
            for teacher in teacher_list:
                if teacher['schoolid_s'] == "1247": #if belongs to pitt
                    if int(teacher['total_number_of_ratings_i']) > number_of_ratings:
                        try:
                            teacher_id = teacher['pk_id']
                            total_rating = teacher['averageratingscore_rf']
                            level_of_difficulty = teacher['averageeasyscore_rf']
                            number_of_ratings = int(teacher['total_number_of_ratings_i'])
                        except KeyError: # the instructor belongs to pitt, but the data is empty
                            l.log("Thread: " + str(thread_id) + ". No data prof: "+ professor_name)
                            teacher_id = ""
                            total_rating = ""
                            level_of_difficulty = ""
                            number_of_ratings = 0

            instructor_link = ""
            #insert into database
            if number_of_ratings == -1:
                rmp_link = ""
                rmp_rating = ""
                rmp_difficulty = ""
            else:
                rmp_link = "https://www.ratemyprofessors.com/ShowRatings.jsp?tid=" + str(teacher_id)
                rmp_rating = total_rating
                rmp_difficulty = level_of_difficulty
               

            department = ""
            #get department
            if rmp_link != "":
                r = requests.get(rmp_link, proxies = proxies)
                bs4_string = BeautifulSoup(r.text,'lxml')
                if bs4_string.find("div",{"class":"result-title"}) != None:
                    department = re.search( "the (.*) department" , bs4_string.find("div",{"class":"result-title"}).get_text()).group(1)
                    department = department.replace("'","''")



            if len(db.query_db_dict("SELECT instructor_id FROM instructor_info WHERE instructor_id=\""+professor_id+'"')) > 0:
                l.log("Thread: "+str(thread_id)+". Professor: "+professor_name+"already exsits. Updating...")
                db.execute("UPDATE instructor_info SET department=\""+department+"\", rmp_link=\""+rmp_link+"\", rmp_rating=\""+rmp_rating+"\", rmp_difficulty=\""+rmp_difficulty+"\", instructor_link=\""+instructor_link+"\", add_time=\""+str(time.time())+"\"")
            else:
                db.insert("instructor_info", { "id": uuid.uuid1(), "instructor_id": professor_id, "department": department, "rmp_link": rmp_link, "rmp_rating": rmp_rating, "rmp_difficulty": rmp_difficulty, "instructor_link": instructor_link, "add_time": str(time.time()) }, l)
            db.commit()


class RMPThreadHandler(ThreadHandler):
    def initialize_task_list(self):
        temp_task_list = []
        sql_statement = "SELECT instructor_name, instructor_id FROM `instructor`"
        instructor_list = db.query_db_dict(sql_statement)
        for instructor in instructor_list:
            temp_task_list.append({"instructor_name": instructor["instructor_name"], "instructor_id": instructor["instructor_id"]})
        return temp_task_list

if __name__ == '__main__':
    thread_handler = RMPThreadHandler(lock, l)
    l.log("Total thread count: " + str(THREAD_TO_START))
    thread_id = 0

    for i in range(0, THREAD_TO_START):
        l.log("Starting thread: " + str(i) )
        t = threading.Thread(target=thread, args=(thread_handler,thread_id,))
        t.start()
        thread_id += 1
    
    





