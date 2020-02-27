import json
import requests
import pymysql
import uuid
import sys
from bs4 import *
import re
from database import *
from logger import Logger
import time
import threading

THREAD_TO_START = 8 #set the thread num
lock = threading.Lock()

l = Logger()



db = Database("pitt_course")


class NationCrawler(object):
    def __init__(self):
        self.proxies = {
             "https":""
        }
        new_ip = self.get_ip()
        self.proxies['https'] = new_ip
    
    def get_ip(self):
        return "https://"+requests.get("http://webapi.http.zhimacangku.com/getip?num=1&type=1&pro=&city=0&yys=0&port=11&time=1&ts=0&ys=0&cs=0&lb=4&sb=0&pb=4&mr=1&regions=").text.replace("\n","")
        #return "https://"+requests.get("http://http.tiqu.alicdns.com/getip3?num=1&type=1&pro=&city=0&yys=0&port=11&time=1&ts=0&ys=0&cs=0&lb=1&sb=0&pb=4&mr=1&regions=&gm=4").text.replace("\n","")

    def get_nation(self, name):
        headers = {
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
            }
        name_to_search = name

        while True:
            try:
                r = requests.get("https://forebears.io/surnames/"+name_to_search, headers = headers, timeout=5, proxies = self.proxies)
                break
            except Exception: #(requests.ConnectTimeout,requests.ProxyError)
                l.warning("Connection timeout. Changing ip...")
                new_ip = self.get_ip()
                self.proxies['https'] = new_ip
            
        try:
            bs4_string = BeautifulSoup(r.text,'lxml')

            information_box = bs4_string.find("div",{"class":"mb-0"})

            information_div = information_box.find("div", {"class":"statistic-single"})

            detail_div = information_div.find("div",{"class":"detail"})
        except Exception:
            l.error("Error insert nation for: "+ name)
            return ""
        
        return detail_div.get_text()

def thread(thread_handler, thread_id): #instance of ThreadHandler
    nc = NationCrawler()
    db = Database("pitt_course")
    while True:
        task_list = thread_handler.get_task(thread_id)
        if task_list[0] == -1: #no more task. Exit the thread
            break

        instructor_name_list = db.query_db_dict("SELECT instructor_name FROM instructor limit "+ str(task_list[0]) +","+ str(task_list[1]) )

        for i in instructor_name_list:
            i['instructor_name'] = i['instructor_name'].strip().replace(",","")
            l.log("Thread "+str(thread_id)+": " + i['instructor_name']+": ")
            first_name = i['instructor_name'].split(" ")[0]
            last_name = i['instructor_name'].split(" ")[1]
            if len(db.query_db_dict("SELECT nation FROM `nation` WHERE name=\"" + last_name + '"')) > 0:
                l.log("Thread: "+str(thread_id)+": Last name for name: "+ i['instructor_name'] + " already exists. Skipping this...")
                continue
            
            nation = nc.get_nation(last_name)

            db.insert('nation', {"id": uuid.uuid1(), "name": last_name, "nation": nation, "add_time": time.time()})
            db.commit()
            l.log(nation)

    l.log("Thread: "+str(thread_id) +" exited.")
            

class ThreadHandler(object):
    TASK_NUMBER_FOR_ONE_REQUEST = 10 #assign n tasks a time
    def __init__(self):
        sql_statement = "SELECT COUNT(*) as c FROM `class`"
        result = db.query_db_dict(sql_statement)
        self.task_count_total = int(result[0]['c']) #task count
        l.log("The total task count is " + str(self.task_count_total))
        self.current_curr = 0
        self.task_count_remain = self.task_count_total



    def get_task(self, thread_id):
        lock.acquire()
        task_num = self.TASK_NUMBER_FOR_ONE_REQUEST
        start_curr = self.current_curr
        
        #if there is no task left, return -1-1
        if self.task_count_remain <= 0:
            l.log("All mission completed!")
            return [-1, -1]
        
        #assign task
        #if the remaining tasks are less than one time needed
        if self.task_count_remain < self.TASK_NUMBER_FOR_ONE_REQUEST:
            task_num = self.task_count_remain


        l.log("Assigned task from: " + str(self.current_curr) +" to thread: "+ str(thread_id) + ". Assigned task number: "+ str(task_num) )
        
        self.task_count_remain -= self.TASK_NUMBER_FOR_ONE_REQUEST
        self.current_curr += self.TASK_NUMBER_FOR_ONE_REQUEST
        lock.release()
        
        return [start_curr, task_num]

if __name__ == '__main__':
    thread_handler = ThreadHandler()
    l.log("Total thread count: " + str(THREAD_TO_START))
    thread_id = 0
    for i in range(0, THREAD_TO_START):
        l.log("Starting thread: " + str(i) )
        t = threading.Thread(target=thread, args=(thread_handler,thread_id,))
        t.start()
        thread_id += 1
    

    
    #task_in_one_thread = int(count/THREAD_TO_START)





        
    





