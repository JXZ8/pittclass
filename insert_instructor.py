'''
Insert instructors' name, is_professor and automatically generate instructor id.
'''

from scrawler import *
import pymysql
import uuid
import sys
from database import *
import time
from logger import Logger
import threading
from ThreadHandler import ThreadHandler

THREAD_TO_START = 8 #set the thread num
lock = threading.Lock()

l = Logger()

db = Database("pitt_course")



def thread(thread_handler, thread_id):
    course_crawler = CourseCrawler()
    db = Database("pitt_course")
    while True:
        subject_list = thread_handler.get_task(thread_id)
        if subject_list[0] == -1:
            break
        for subject in subject_list:
            l.log("Start new subject: " + subject)
            course_process = CourseProcess(course_crawler.session)

            course_process.set_term("spring1920")
            course_process.set_campus("pittsburgh")
            course_process.set_subject(subject)
            search_string = course_process.start_search()


            cih = CourseInformationHandler(search_string)

            for i in cih.course_block_list: #one course block contains all the classes in one block
                instructor_list = cih.get_class_instructor_list(i," ") #get the instructor list for that course block.
                section_id_list = cih.get_section_id_list(i," ") #get the section id list for that course block.

                for count in range(0, len(instructor_list)):
                    instructor_for_class_list = instructor_list[count].strip().replace("'","\\'").replace(",","").split('\r') #sometimes there are multiple instructors of one class. they are seperated by \r !!!!remember to replace ","!!!!!
                    section_id = section_id_list[count]
                    for instructor in instructor_for_class_list:
                        instructor = instructor.strip() #strip!
                        instructor_info = db.query_db_dict('SELECT id, is_professor FROM instructor WHERE instructor_name = "'+instructor+'"')
                        if len(instructor_info) is 0: #if there is no such instructor in database, then insert
                            is_professor = '0'
                            #insert
                            if 'LEC' in section_id.upper():
                                is_professor = '1'

                            l.log("Thread: "+str(thread_id)+". Subject name: " + subject + ". Inserting instructor: " + instructor + ". Is_professor: "+ is_professor + ". Section id: "+ section_id)
                            db.insert('instructor', {'id':uuid.uuid1(), 'instructor_id':uuid.uuid1(), 'instructor_name': instructor, 'is_professor': is_professor, 'add_time': int(time.time())})
                            

                        elif len(instructor_info) is 1 and int(instructor_info[0]['is_professor']) == 0 and 'LEC' in section_id.upper(): #if there is such instructor but the is_professor is wrong, then update it
                            l.log("Thread: "+str(thread_id)+". Subject name: " + subject + ". Section id: " + section_id + " is lecture. Updating instructor and setting is_professor to 1 for: "+instructor)
                            db.execute("UPDATE instructor SET is_professor = 1 WHERE id=\"" + instructor_info[0]['id']+'"')

                            
                        else: #if the instructor already exist, do nothing 
                            l.log("Thread: "+str(thread_id)+". Subject name: " + subject + ". Instructor '" +instructor+"' already exist. Section id: " + section_id)
                        
                        db.commit()
    l.log("Thread: "+ str(thread_id) + " exited")



class IIThreadHandler(ThreadHandler):
    def initialize_task_list(self):
        temp_task_list = []
        sql_statement = "SELECT subject_index FROM subject"
        subject_list_sql = db.query_db_dict(sql_statement)
        for subject in subject_list_sql:
            temp_task_list.append(subject["subject_index"])
        return temp_task_list




if __name__ == '__main__':
    thread_handler = IIThreadHandler(lock,l)
    l.log("Total thread count: " + str(THREAD_TO_START))
    thread_id = 0
    
    for i in range(0, THREAD_TO_START):
        l.log("Starting thread: " + str(i) )
        t = threading.Thread(target=thread, args=(thread_handler,thread_id,))
        t.start()
        thread_id += 1

#del l
        
