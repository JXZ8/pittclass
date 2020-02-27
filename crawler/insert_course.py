from scrawler import *
import pymysql
import uuid
import sys
from database import *
from logger import Logger
import time

l = Logger()

db = Database("pitt_course")

subject_list = []

subject_dict = db.query_db_dict("SELECT major_id, subject_index FROM subject", l)

for i in subject_dict:
    subject_list.append({'subject_index':i['subject_index'], 'major_id':i['major_id']})


#subject_list = ["BUSACC","ADMJ","AFROTC","AFRCNA","ANTH","ARTSC","ASTRON","BIOETH","BIOSC","BUS","BUSECN","BUSENV","BUSERV","CDACCT","HYBRID","SELF","WWW","CHEM","CHIN","CLASS","COMMRC","CS","CLST","EAS","ECON","ENGCMP","ENGFLM","ENGLIT","ENGWRT","FILMST","BUSFIN","FP","FR","FTDA","FTDB","FTDC","GEOL","GER","GREEK","HIST","HPS","HAA","HONORS","BUSHRM","INFSCI","ISSP","ITAL","JPNSE","JS","KOREAN","LATIN","LEGLST","LING","BUSMIS","BUSMKT","MATH","MRST","MILS","MUSIC","NROSCI","BUSORG","PHIL","PEDC","PHYS","POLISH","PS","PORT","PSY","PUBSRV","BUSQOM","REL","RELGST","RUSS","SERCRO","SLAV","SLOVAK","SOC","SPAN","STAT","BUSSPP","SA","THEA","UKRAIN","HONORS","URBNST","GSWS"]





course_crawler = CourseCrawler()
for subject in subject_list:
    l.log("Start crawling course for subject: "+subject['subject_index'])
    course_process = CourseProcess(course_crawler.session)

    course_process.set_term("spring1920")
    course_process.set_campus("pittsburgh")
    course_process.set_subject(subject['subject_index'])
    search_string = course_process.search()

    major_id = subject['major_id']

    cih = CourseInformationHandler(search_string)

    for i in cih.course_block_list:

        templist = []
        
        first_index = re.search(r'\d+',i.find("a",{"id":re.compile(r'^MTG_CLASSNAME\$\d+')})['id']).group()
        
        c_detail = course_process.get_class_detail(first_index)
        
        course_name = str(cih.get_course_name(i)).strip()
        
        
        
        
        
        cdh = ClassDetailHandler(c_detail)

        requirement = cdh.get_requirement().strip()
        unit = cdh.get_unit().strip()
        component = cdh.get_class_component().strip()
        grading_method = cdh.get_grading().strip()
        career = cdh.get_career().strip()
        description = cdh.get_description().strip()
        session = cdh.get_session().strip()
        attribute = cdh.get_attribute().strip()
        attribute_list = attribute.split('\r') #which is because one course can have multiple attributes


        if len(db.query_db_dict('SELECT course_id FROM course WHERE name = "' + course_name + '"', l)) == 0:
            course_id = str(uuid.uuid1())
            #insert into course 
            db.insert('course',{'id': str(uuid.uuid1()), 'course_id': course_id, 'major_id': major_id, 'name': course_name, 'requirement': requirement, 'unit': unit, 'component': component, 'grading_method': grading_method, 'career': career, 'description': description, 'session':  session, 'add_time': str(int(time.time()))}, l)
            #insert into course attribute (which is because one course can have multiple attributes, so it need to be seperated)
            for attribute in attribute_list:
                db.insert('course_attribute',{'id': str(uuid.uuid1()), 'course_id': course_id, 'attribute': attribute.strip(), 'add_time': str(int(time.time()))}, l)
            db.commit()
        
            l.log(str(subject['subject_index'])+":"+ str(course_name))
            
        else:
            l.log("Course " + course_name + " already exist.")


del l
