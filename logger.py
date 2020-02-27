'''
Log handler
'''
import os
import datetime
import sys
import time

class Logger(object):
    path = os.path.join(os.getcwd(),"log") #incase \ and / difference from linux
    is_print = True

    def __init__(self):
        self.print_count = 0
        #create a folder for that day
        path = os.path.join(self.path, str(datetime.date.today()).replace('-',''))
        
        if not os.path.exists(path):
            os.makedirs(path)


        script_name = os.path.basename(sys.argv[0])
        
        #create a txt file for this mission
        self.log_file_path = os.path.join(path, str(int(time.time()))+ '_' + script_name + '.txt')
        self.f = open(self.log_file_path , 'w', encoding='utf-8')
        self.f.write('-------------- Script info --------------' +'\n')
        self.f.write('Script name: '+ script_name + '\n')
        self.f.write('Start time: '+ time.strftime("%m/%d/%Y %H:%M:%S", time.localtime()) + '\n\n' )
        self.f.write('-------------- Output --------------' +'\n')
        self.f.flush()


    def __echo(self, text, header, end):
        self.print_count += 1
        if self.is_print:
            print(text, end = end)
        self.f.write( time.strftime("%m/%d/%Y %H:%M:%S", time.localtime()) + "  [" + header + "]  :   " + text + '\n')
        self.f.flush()
    
    def debug(self, text, end="\n"):
        self.__echo(text, "DEBUG", end)

    def log(self, text, end = "\n"):
        self.__echo(text, "LOG", end)

    def error(self, text, end="\n"):
        self.__echo(text, "ERROR", end)

    def warning(self, text, end="\n"):
        self.__echo(text, "WARNING", end)


    def __del__(self):
        self.f.close()

    def __exit__(self, exc_type, exc_value, traceback):
        self.f.close()


