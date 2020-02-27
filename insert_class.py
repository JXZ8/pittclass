from scrawler import *
import pymysql
import uuid
from database import *
from logger import Logger
import re
from datetime import datetime
import time
import threading
from ThreadHandler import ThreadHandler
import copy

def handle_datetime(strs):
    strs = strs.strip()
    #dirty code
    if 'TBA' in strs:
        day_json = {'mo': 0, 'tu': 0, 'we': 0, 'th': 0, 'fr': 0, 'sa': 0, 'su': 0, 'TBA': 1}
        return {"day_dict": day_json, "time": "TBA", "duration": "TBA"}

    day_json = {'mo': 0, 'tu': 0, 'we': 0, 'th': 0, 'fr': 0, 'sa': 0, 'su': 0, 'TBA': 0}
    strs_list = strs.split(" ")
    day = strs_list[0] #need
    start_time = strs_list[1] #need
    start_time_replaced = start_time
    if 'PM' in start_time.upper() and '12:' in start_time:
        start_time_replaced = start_time.replace("12","00")
    finish_time = strs_list[-1] #need
    FMT = '%H:%M'
    if 'PM' in strs.upper() or 'AM' in strs.upper():
        FMT = '%H:%M%p'
    time_difference = datetime.strptime(finish_time, FMT) - datetime.strptime(start_time_replaced, FMT)

    duration = str(time_difference)[0:-3].replace(":", "h ") + "min" #need

    #convert day to json format
    for key in day_json:
        if key.lower() in day.lower():
            day_json[key] = 1


    return {"day_dict": day_json, "time": start_time+" - " + finish_time, "duration": duration}
    

THREAD_TO_START = 8 #set the thread num
lock = threading.Lock()


l = Logger()

db = Database("pitt_course")

subject_list = []

subject_dict = db.query_db_dict("SELECT subject_index FROM subject WHERE id > 150", l)

for i in subject_dict:
    subject_list.append(i['subject_index'])
    
#subject_list = ["BUSACC","ADMJ","AFROTC","AFRCNA","ANTH","ARTSC","ASTRON","BIOETH","BIOSC","BUS","BUSECN","BUSENV","BUSERV","CDACCT","HYBRID","SELF","WWW","CHEM","CHIN","CLASS","COMMRC","CS","CLST","EAS","ECON","ENGCMP","ENGFLM","ENGLIT","ENGWRT","FILMST","BUSFIN","FP","FR","FTDA","FTDB","FTDC","GEOL","GER","GREEK","HIST","HPS","HAA","HONORS","BUSHRM","INFSCI","ISSP","ITAL","JPNSE","JS","KOREAN","LATIN","LEGLST","LING","BUSMIS","BUSMKT","MATH","MRST","MILS","MUSIC","NROSCI","BUSORG","PHIL","PEDC","PHYS","POLISH","PS","PORT","PSY","PUBSRV","BUSQOM","REL","RELGST","RUSS","SERCRO","SLAV","SLOVAK","SOC","SPAN","STAT","BUSSPP","SA","THEA","UKRAIN","HONORS","URBNST","GSWS"]


type_dict = {"REC": '0', 'LEC': '1', 'LAB': '2', 'SEM': '3', 'INT': '4', 'CLN': '5', 'CLQ': '6', 'correspondence': '7', 'CLB' :'8', 'DIR': '9', 'IND': '10', 'PRA': '11', 'THE':'12','WRK': '13', 'unknown': '99'}

def thread(thread_handler, thread_id):
    course_crawler = CourseCrawler()
    db = Database("pitt_course")
    while True:
        subject_list = thread_handler.get_task(thread_id)
        if subject_list[0] == -1:
            break
        for subject in subject_list:
            l.log("Start crawling subject: "+subject)
            course_process = CourseProcess(course_crawler.session)

            course_process.set_term("spring1920")
            course_process.set_campus("pittsburgh")
            course_process.set_subject(subject)
            search_string = course_process.start_search()


            cih = CourseInformationHandler(search_string)

            for i in cih.course_block_list: #one course block contains all the classes in one block

                course_name = str(cih.get_course_name(i)) #get the course name for that block
                temp_list = []
                
                class_type = "99" #unknown
                
                class_id_list = cih.get_class_id_list(i) #get all the class ids of that block. All the classes belongs to that course.
                section_id_list = cih.get_section_id_list(i," ") #get the section id list
                datetime_list = cih.get_class_datetime_list(i," ")
                position_list = cih.get_class_room_list(i," ")
                instructor_list = cih.get_class_instructor_list(i," ")
                class_period_list = cih.get_class_period_list(i," ")
                

                sql_statement = 'SELECT course_id FROM `course` WHERE `name` = "'+ course_name.strip() +'"'
                templist = db.query_db_dict(sql_statement) #contains the sql result of getting the course id of that course name

                course_id = ""
                
                if len(templist) > 1: #if there are more than one rows that that course name is the same (but I don't think this will happen)
                    l.error("Thread: "+str(thread_id)+". More than one course found for course: "+ course_name + ". Sql statement: " +sql_statement)

                if len(templist) == 0: #if there is no such row for the course, then we can't get the course id
                    l.error("Thread: "+str(thread_id)+". Can't find corresponding course for course: " + course_name + ". Course name: " + course_name +". THIS NEED TO BE FIXED!")
                    
                else: #get the course id
                    course_id = str(templist[0]['course_id'])

                
                '''        
                because all the info of classes is stored in that list, and there are multiple lists to store classes' info.
                it is like class_id_list = ["12301","12302","12303"]
                           section_id_list = ["019LEC_diqn","019REC_diqn","019DIR_diqn"]
                '''
                for f in range(len(class_id_list)):
                    temp_dict = {}
                    temp_dict['class_id'] = class_id_list[f].strip()
                    temp_dict['section_id'] = section_id_list[f].strip()

                    #because there might be multiple dates, positions, instructors, periods in one class, so we need to split them into list
                    #it is like date_time_list = ["123123\r323232", "11111\r22222"]
                    date_time_list_for_one_class = datetime_list[f].split("\r") #might have more than one datetime
                    position_list_for_one_class = position_list[f].split("\r") #might have more than one position
                    instructor_list_for_one_class = instructor_list[f].split("\r") #might have more than one instructor
                    class_period_list_for_one_class = class_period_list[f].split("\r") #might have more than one class period

                    
                    
                    section_id_upper = section_id_list[f].upper()
                    
                    #traversing the class type dict. Find the class type
                    for key in type_dict:
                        if key in section_id_upper:
                            class_type = type_dict[key]
                    
                    
                    temp_dict['class_type'] = class_type

                    #the class_id, section_id, class_type won't change. So we only need to change these thing below, and add the dict to the list
                    for count in range(0, len(date_time_list_for_one_class)):
                        date_time_info_dict = handle_datetime(date_time_list_for_one_class[count])
                        temp_dict['time'] =  date_time_info_dict['time'].strip() #i.e. 19:00 - 21:00
                        temp_dict['day'] =  date_time_info_dict['day_dict'] #{'mo': 1, 'tu': 0, 'we': 1, 'th': 0, 'fr': 0, 'TBA': 0}
                        temp_dict['duration'] =  date_time_info_dict['duration'].strip()
                        temp_dict['position'] = position_list_for_one_class[count].strip()
                        temp_dict['instructor'] = instructor_list_for_one_class[count].replace(",","").strip() #!!!!remember to replace ","!!!!!
                        temp_dict['class_period'] = class_period_list_for_one_class[count].strip()
                        temp_list.append(copy.deepcopy(temp_dict)) #!!!!!!remember to deep copy the object!!!

                    
                
                #now the temp list looks like temp_list = [{"class_id":'12342', "section_id":"sdafas","class_type":"1","time":"11111"},{},{},{}]
                for k in temp_list:
                    instructor_name = k['instructor']
                    query_instructor_list = db.query_db_dict('SELECT instructor_id FROM instructor WHERE instructor_name = "' + instructor_name + '"' , l)
                    instructor_id = ""
                    if len(query_instructor_list) == 0:
                        l.error("Thread: "+str(thread_id)+". Unable to find instructor id in `instructor` data sheet for class: "+ k['class_id'] +". Instructor: " + k['instructor'] + ". THIS NEED TO BE FIXED.")
                    elif len(query_instructor_list) > 1: # I don't think this will happen
                        l.error("Thread: "+str(thread_id)+". More than one instructor id found, and I think this is impossible! Class: "+ k['class_id'] + ". Instructor: " + k['instructor'])
                    else:
                        instructor_id = query_instructor_list[0]['instructor_id']

                    db.insert("class",{"id":str(uuid.uuid1()),"class_id": k['class_id'],"section_name":k['section_id'], "course_id": course_id, "time": k['time'] ,"day":k['day'], "duration": k['duration'], "place": k['position'],"instructor_id":instructor_id, "period":k['class_period'], "type": class_type, "add_time": time.time()}, l)
                    l.log("Thread: "+str(thread_id)+ ". "+str(subject)+":"+ str(course_name) + " " + str(k['section_id']))

                db.commit() 



class ICThreadHandler(ThreadHandler):
    def initialize_task_list(self):
        temp_task_list = []
        sql_statement = "SELECT subject_index FROM subject"
        subject_list_sql = db.query_db_dict(sql_statement)
        for subject in subject_list_sql:
            temp_task_list.append(subject["subject_index"])
        return temp_task_list


if __name__ == '__main__':
    thread_handler = ICThreadHandler(lock, l)
    l.log("Total thread count: " + str(THREAD_TO_START))
    thread_id = 0
    for i in range(0, THREAD_TO_START):
        l.log("Starting thread: " + str(i) )
        t = threading.Thread(target=thread, args=(thread_handler,thread_id,))
        t.start()
        thread_id += 1
