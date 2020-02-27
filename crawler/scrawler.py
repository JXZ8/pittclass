import requests
from bs4 import BeautifulSoup
import re

COOKIE_FILE_PATH = "cookies.txt"

headers = {
    "Referer":"https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/h/?tab=DEFAULT",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
    "Host":"prd.ps.pitt.edu",
    "Origin":"https://prd.ps.pitt.edu"
}

class CookieException(Exception):
    pass

class UnsetDomainException(CookieException):
    pass

class LoginCookieError(CookieException):
    pass

class Crawler(object):
    '''Base  Class'''
    
    COOKIE_DOMAIN = "."
    COOKIE_PATH = "/"

    def __init__(self):
        self.session = requests.session()
        
    def set_cookie_from_file(self, path):
        ''' Read Cookie From File

        Args:
            path: specify the path of cookie file	
        '''
        if self.COOKIE_DOMAIN is ".":
            raise UnsetDomainException
        
        cookie_name = ""
        cookie_val = ""
        with open(path) as f:
            for line in f:
                line = line.strip('\n')
                cookie_name, cookie_val = line.split(":")[0], line.split(":")[1] #TODO: try catch
                self.session.cookies.set(cookie_name, cookie_val , path=self.COOKIE_PATH, domain=self.COOKIE_DOMAIN)



class CourseCrawler(Crawler):
    COOKIE_DOMAIN = "prd.ps.pitt.edu"
    COOKIE_PATH = "/"

    
    
    def __init__(self):
        Crawler.__init__(self)
        self.is_login_cookie_set = 0
        self.set_login_cookie()
        
        '''
        #icsid = self.get_ICSID()
        test= CourseProcess(self.session)
        test.set_term("spring1920")
        test.set_campus("pittsburgh")
        test.set_subject("STAT")
        test.start_search()
        #ttt = CourseInformationHandler()
        ttt = ClassDetailHandler(test.get_class_detail(0))
        '''
        
    def set_login_cookie(self):
        '''Set the pitt account login cookie'''

        
        self.set_cookie_from_file(COOKIE_FILE_PATH)
        self.session.cookies.set('SignOnDefault', '', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('HPTabName', 'DEFAULT', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('HPTabNameRemote', '',path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('LastActiveTab', 'DEFAULT',path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('ExpirePage', 'https://prd.ps.pitt.edu/psp/pitcsprd/',path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('PS_LOGINLIST', 'https://prd.ps.pitt.edu/pitcsprd', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('ps_theme', 'node:SA portal:EMPLOYEE theme_id:PITT_THEME_FLUID css:PITT_BRAND_CLASSIC_TEMPLTE_FLU css_f:PITT_BRAND_FLUID_TEMPLATE accessibility:N macroset:PITT_DEFAULT_MACROSET_855 formfactor:3 piamode:2', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('PS_DEVICEFEATURES', 'width:2560 height:1440 pixelratio:1 touch:0 geolocation:1 websockets:1 webworkers:1 datepicker:1 dtpicker:1 timepicker:1 dnd:1 sessionstorage:1 localstorage:1 history:1 canvas:1 svg:1 postmessage:1 hc:0 maf:0', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2femployee%2fsa%2frefresh', 'list:%20%3ftab%3dremoteunifieddashboard%7c%3frp%3dremoteunifieddashboard||||%3ftab%3ddefault|%3frp%3ddefault', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('PS_TOKENEXPIRE', '11_Oct_2019_22:27:09_GMT', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.session.cookies.set('psback', '%22%22url%22%3A%22https%3A%2F%2Fprd.ps.pitt.edu%2Fpsp%2Fpitcsprd%2FEMPLOYEE%2FSA%2Fc%2FCOMMUNITY_ACCESS.CLASS_SEARCH.GBL%3FFolderPath%3DPORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL%26IsFolder%3Dfalse%26IgnoreParamTempl%3DFolderPath%2CIsFolder%22%20%22label%22%3A%22Class%20Search%22%20%22origin%22%3A%22PIA%22%20%22layout%22%3A%220%22%22', path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        self.is_login_cookie_set = 1

    """
    def set_ICS_cookie(self):
        '''Set the cookie need for class search'''
        if self.is_login_cookie_set == 0:
            raise RuntimeError("Pitt account login cookie missed")
        
        r = self.session.get("https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder",headers = headers , allow_redirects=False)

        if not 'pitp855-cs-8080-PORTAL-PSJSESSIONID' in r.cookies.get_dict():
            raise LoginCookieError

        self.session.cookies.set('pitp855-cs-8080-PORTAL-PSJSESSIONID',r.cookies.get_dict()['pitp855-cs-8080-PORTAL-PSJSESSIONID'], path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)

    def get_ICSID(self):
        '''Get search process id'''
        if self.is_login_cookie_set == 0:
            raise  RuntimeError

        self.set_ICS_cookie()
        r = self.session.get("https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder&PortalActualURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&PortalContentURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&PortalContentProvider=SA&PortalCRefLabel=Class%20Search&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2f&PortalURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2f&PortalHostNode=SA&NoCrumbs=yes&PortalKeyStruct=yes",headers = headers , allow_redirects=True)
        bs4_string = BeautifulSoup(r.text, "html.parser")
        icsid = bs4_string.find('input', id='ICSID')["value"]
        return icsid
    """

class CourseProcess():

    COOKIE_DOMAIN = "prd.ps.pitt.edu"
    COOKIE_PATH = "/"
    
    ICStateNum = 0
    
    term_id_dict = {"fall1920": "2201","spring1920":"2204", "summer1819":"2197" }
    campus_id_dict = {"pittsburgh":"PIT", "bradford":"UPB", "greensburgh":"UPG", "johnstown":"UPJ", "titusville":"UPT"}
    subject_list = ["BUSACC","ADMJ","AFROTC","AFRCNA","ANTH","ARTSC","ASTRON","BIOETH","BIOSC","BUS","BUSECN","BUSENV","BUSERV","CDACCT","HYBRID","SELF","WWW","CHEM","CHIN","CLASS","COMMRC","CS","CLST","EAS","ECON","ENGCMP","ENGFLM","ENGLIT","ENGWRT","FILMST","BUSFIN","FP","FR","FTDA","FTDB","FTDC","GEOL","GER","GREEK","HIST","HPS","HAA","HONORS","BUSHRM","INFSCI","ISSP","ITAL","JPNSE","JS","KOREAN","LATIN","LEGLST","LING","BUSMIS","BUSMKT","MATH","MRST","MILS","MUSIC","NROSCI","BUSORG","PHIL","PEDC","PHYS","POLISH","PS","PORT","PSY","PUBSRV","BUSQOM","REL","RELGST","RUSS","SERCRO","SLAV","SLOVAK","SOC","SPAN","STAT","BUSSPP","SA","THEA","UKRAIN","HONORS","URBNST","GSWS"]

    
    url = "https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL"
    icsid = ""
    session = None
    ICBcDonData = "C~HC_CLASS_SEARCH_GBL~EMPLOYEE~SA~COMMUNITY_ACCESS.CLASS_SEARCH.GBL~UnknownValue~Class Search~UnknownValue~UnknownValue~https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL~UnknownValue*F~CO_EMPLOYEE_SELF_SERVICE~EMPLOYEE~SA~UnknownValue~UnknownValue~Self Service~UnknownValue~UnknownValue~https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_INFRAME?pt_fname=CO_EMPLOYEE_SELF_SERVICE&c=HAdUfC54RGEp%2f1A%2f9a8X6D9HzFApegKe&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE&IsFolder=true~UnknownValue"
    
    def __init__(self, session):
        '''init

        Args:
            icsid: The id of the process
            session: The requests session which contains the ics cookie
        '''
        self.session = session
        self.icsid = self.get_ICSID()
       

    def set_ICS_cookie(self):
        '''Set the cookie need for class search'''
        self.session.cookies.set('pitp855-cs-8080-PORTAL-PSJSESSIONID',None)
        
        r = self.session.get("https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder",headers = headers , allow_redirects=False)

        if not 'pitp855-cs-8080-PORTAL-PSJSESSIONID' in r.cookies.get_dict():
            raise LoginCookieError

        self.session.cookies.set('pitp855-cs-8080-PORTAL-PSJSESSIONID',r.cookies.get_dict()['pitp855-cs-8080-PORTAL-PSJSESSIONID'], path = self.COOKIE_PATH, domain = self.COOKIE_DOMAIN)
        
    def get_ICSID(self):
        '''Get search process id'''

        self.set_ICS_cookie()
        r = self.session.get("https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HC_CLASS_SEARCH_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder&PortalActualURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&PortalContentURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fCOMMUNITY_ACCESS.CLASS_SEARCH.GBL&PortalContentProvider=SA&PortalCRefLabel=Class%20Search&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2f&PortalURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2f&PortalHostNode=SA&NoCrumbs=yes&PortalKeyStruct=yes",headers = headers , allow_redirects=True)
        bs4_string = BeautifulSoup(r.text, "html.parser")
        icsid = bs4_string.find('input', id='ICSID')["value"]
        return icsid


    def send_req(self, action, *params):
        '''Send the request

        Args:
            action: Specify the action to send
            params:Params to send. Format: list
        '''
        self.ICStateNum += 1

        #TODO: Test the function of these params
        data = { 
            "ICAJAX":"1",
            "ICNAVTYPEDROPDOWN":"1",
            "ICType":"Panel",
            "ICStateNum":self.ICStateNum,
            "ICAction":action,
            "ICSID":self.icsid,
            "ICBcDonData":self.ICBcDonData
            }
        
        for param in params:
            data[param[0]] = param[1]

        r = self.session.post("https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL", data = data, headers = headers)
        
        return r.text
        
    
    def set_term(self, term):
        '''Set the term of the search process

           Warning: If set term after setting campus, the campus will be reset. So call this first
           Args:
               term: specify the term to be set.
        '''
        if not term in self.term_id_dict:
            raise KeyError("No such term.")

        
        term_id = self.term_id_dict[term]
        
        self.send_req("CLASS_SRCH_WRK2_STRM$35$",["CLASS_SRCH_WRK2_STRM$35$",term_id])
        
        
    def set_campus(self, campus):
        '''Set Campus

        Args:
               term: specify the campus to be set.
        '''
        if not campus in self.campus_id_dict:
            raise KeyError("No such campus.")

        campus_id = self.campus_id_dict[campus]

        self.send_req("SSR_CLSRCH_WRK_CAMPUS$0", ["SSR_CLSRCH_WRK_CAMPUS$0",campus_id])


    def set_subject(self, subject):
        '''Set Subject

            Warning: Don't set the same subject twice
        Args:
            subject: Specify the subject to be set.
            
        '''
        #subject list need to be updated
        #if not subject in self.subject_list:
            #raise KeyError("No such subject.")

        self.send_req("SSR_CLSRCH_WRK_SUBJECT$1", ["SSR_CLSRCH_WRK_SUBJECT$1",subject])


    def start_search(self):
        '''Start search'''
        self.send_req("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH", ["SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$4","N"])
        return self.click_continue() #TODO: JUST FOR TEST. CHANGE HERE

    def search(self):
        '''Same as start_search. Name changed.'''
        self.send_req("CLASS_SRCH_WRK2_SSR_PB_CLASS_SRCH", ["SSR_CLSRCH_WRK_SSR_OPEN_ONLY$chk$4","N"])
        return self.click_continue() #TODO: JUST FOR TEST. CHANGE HERE

        
    def click_continue(self):
        '''If there is return result prompt, click continue'''
        return self.send_req("#ICSave")


    def set_course_number_mode(self, course_number_mode):
        '''Set the course number match mode'''
        raise NotImplementedError
    

    def set_course_number(self, course_number):
        '''Set course number'''
        raise NotImplementedError

    def set_class_number(self, class_number):
        raise NotImplementedError

    def return_to_search_list(self):
        '''Return to the search list'''
        self.send_req("CLASS_SRCH_WRK2_SSR_PB_BACK", ["ptus_defaultlocalnode","PSFT_PITCSPRD"], ["ptus_dbname","PITCSPRD"], ["ptus_portal","EMPLOYEE"], ["ptus_node","SA"], ["ptus_componenturl","https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL"])


    def get_class_detail(self, class_index): #call search first
        '''Get the detail of the specified class

        Warning: don't call this method before calling class search method
        Args:
            class_index: the index of the class.
        '''
        c_detail = self.send_req("MTG_CLASSNAME$"+str(class_index), ["ptus_defaultlocalnode","PSFT_PITCSPRD"], ["ptus_dbname","PITCSPRD"], ["ptus_portal","EMPLOYEE"], ["ptus_node","SA"], ["ptus_componenturl","https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/c/COMMUNITY_ACCESS.CLASS_SEARCH.GBL"])
        self.return_to_search_list()
        return c_detail
        
    
class InformationHandler(object):
    
    
    def __get_things(self, class_detail_html, search_label , identifiers, id_val ,u_string = None, purify_string = None):
        raise NotImplementedError


class ClassDetailHandler(InformationHandler):
    
    
    def __init__(self, class_detail_string):
        self.class_detail_string_bs4 = ""
        self.class_detail_string_bs4 = BeautifulSoup(class_detail_string, "lxml")

    def __get_things(self, class_detail_html, search_label , identifiers, id_val ,u_string = None, purify_string = None):
        '''Get information specified

        Private.
        Args:
            class_detail_html: the html contains the detail of the class. Should be bs4.
            search_label: html labels. For example: "a", "div", "span", "h1"
            identifiers: html identifiers. For examle: "class"(class_), "id"(id)
            id_val: the value of that id
            u_string: strings that need to be purified
            purify_string: strings to replace

        return :str
            return str
        '''

        
        temp_text = class_detail_html.find(search_label, { identifiers:id_val } )

        if temp_text is None:
            return ""
        
        if purify_string != None:
            temp_text = temp_text.get_text().replace(u_string,purify_string)

        else:
            temp_text = temp_text.get_text()

        return temp_text
    

    '''
    deprecated
    def get_attribute(self):
        Get the attribute of the class

        return: str
            class attribute
        
        return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divSSR_CLS_DTL_WRK_SSR_CRSE_ATTR_LONG", "\n", "")
    '''

    def get_requirement(self):
        '''Get the class requirement

        Warning: not all the classes have requirements
        return: str
            class requirement
        '''

        return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divSSR_CLS_DTL_WRK_SSR_REQUISITE_LONG", "\n", "")
        
    def get_description(self):
        '''Get class description

        return: str
            class description
        '''

        return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divDERIVED_CLSRCH_DESCRLONG", "\n", "")

    def get_unit(self):
        '''Get the unit of the class

        return: str
            class unit
        '''
        return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divSSR_CLS_DTL_WRK_UNITS_RANGE", "\n", "")

    def get_session(self):
        '''Get the session of the class

        return: str
            session ( e.g. Academic Term or something )
        '''
        return self.__get_things(self.class_detail_string_bs4, "div", "id", re.compile(r'^win0divPSXLATITEM_XLATLONGNAME\$\d+\$'), "\n", "")

    def get_class_component(self):
        '''Get the component of the class

        return: str
            component ( e.g. Lecture Required, Recitation Required )
        '''
        return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divSSR_CLS_DTL_WRK_SSR_COMPONENT_LONG", "\n", "")

    def get_career(self):
        '''Get the career of the class

        return: str
            career ( e.g. Undergraduate )
        '''
        return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divPSXLATITEM_XLATLONGNAME", "\n", "")
        

    def get_grading(self):
        '''Get the grading method of the class

        return: str
            grading method ( e.g. LG/SNC, Letter grades )
        '''
        return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divGRADE_BASIS_TBL_DESCRFORMAL", "\n", "")

    def get_attribute(self):
        '''Get the attribute of the class
            Because attribute uses <br>, so we can't use __get_things()

        return: str
            class attribute ( e.g. Writing Intensive Course (WRIT))
        '''

        temp_text = self.class_detail_string_bs4.find("span", { 'id':'SSR_CLS_DTL_WRK_SSR_CRSE_ATTR_LONG' } )
        
        if temp_text is None:
            return ""

        temp_text = BeautifulSoup( str(temp_text).replace('<br/>','\\r'), 'lxml')
        temp_text = temp_text.get_text()

        return temp_text
    
        #return self.__get_things(self.class_detail_string_bs4, "div", "id", "win0divSSR_CLS_DTL_WRK_SSR_CRSE_ATTR_LONG", "\n", "")
    
        
    
class CourseInformationHandler(InformationHandler):
    '''Get information from class list'''
    
    
    def __init__(self, course_string):
        self.course_string_bs4 = ""
        self.course_block_list = []
        self.is_split = 0
        self.course_string_bs4 = BeautifulSoup(course_string, "lxml")
        
        self.course_block_list = self.split_course()
        
        #self.get_course_name(self.split_course()[1])
        #print(self.get_section_id(self.split_course()[0], " "))
        #print(self.get_total_class_index())

    
#soup.find_all("div"{name:val})        
    def split_course(self):
        '''Get all the class by course title

        return: list
            each element of the list contains all the class of that course
        '''
        self.is_split = 1
        return self.course_string_bs4.find_all("div", id=re.compile(r'^win0divSSR_CLSRSLT_WRK_GROUPBOX2\$\d+'))

    def get_course_name(self, course_block):
        '''Get the course name of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)

        return: str
            course name of that block
        '''
        return course_block.find("div",id=re.compile(r'^win0divSSR_CLSRSLT_WRK_GROUPBOX2GP\$\d+')).get_text().strip()

    '''
    def get_course_name(self, course_block):
        Get the course name of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)

        return: str
            course name of that block
        return course_block.find("div",id=re.compile(r'^win0divSSR_CLSRSLT_WRK_GROUPBOX2GP\$\d+')).get_text().strip()

    '''
    def __get_things(self, course_block, search_label , identifiers, id_val ,u_string = None, purify_string = None):
        '''Get the things specified (I don't know what name should I give)

        Private.
        Args:
            course_block: the course block contains all the classes (one course block should only contain one course) Should be bs4.
            search_label: html labels. For example: "a", "div", "span", "h1"
            identifiers: html identifiers. For examle: "class"(class_), "id"(id)
            id_val: the value of that id
            u_string: strings that need to be purified
            purify_string: strings to replace

        return :list
            return list

        '''
        temp_list = course_block.find_all(search_label, { identifiers:id_val }  )

        if purify_string == None:
            for i in range(len(temp_list)):
                temp_list[i] = temp_list[i].get_text()

        else:
            for i in range(len(temp_list)):
                 temp_list[i] = temp_list[i].get_text().replace(u_string,purify_string)
                
        return temp_list

    
    def get_class_id_list(self, course_block):
        '''Get all the class id of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)

        return: list
            list of ids of all the classes of that block
        '''

        return self.__get_things(course_block, "a", "id", re.compile(r'^MTG_CLASS_NBR\$\d+'))

    def get_section_id_list(self, course_block, purify_string = None):
        '''I don't know what the section id is. But since it's there...

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)
            purify_string: specify if the string that will replace \r 
                
        return: list
            list of section ids of all the classes of that block
        '''
                
        return self.__get_things(course_block, "a", "id", re.compile(r'^MTG_CLASSNAME\$\d+'),'\r', purify_string)



    def get_class_datetime_list(self, course_block, purify_string = None):
        '''Get all the datetime of the classes of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)
            purify_string: specify if the string that will replace \n
            
        return: list
            list of datetime of all the classes of that block
        '''

        return self.__get_things(course_block, "div", "id", re.compile(r'^win0divMTG_DAYTIME\$\d+'),'\n', purify_string)

    
    def get_class_room_list(self, course_block, purify_string = None):
        '''Get all the room of the classes of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)
            purify_string: specify if the string that will replace \n
            
        return: list
            list of classrooms of all the classes of that block
        '''

        return self.__get_things(course_block, "div", "id", re.compile(r'^win0divMTG_ROOM\$\d+'),'\n', purify_string)


    def get_class_instructor_list(self, course_block, purify_string = None):
        '''Get all the instructors of the classes of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)
            purify_string: specify if the string that will replace \n
            
        return: list
            list of instructor of all the classes of that block
        '''

        return self.__get_things(course_block, "div", "id", re.compile(r'^win0divMTG_INSTR\$\d+'),'\n', purify_string)


    def get_class_period_list(self, course_block, purify_string = None):
        '''Get all the periods of the classes of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)
            purify_string: specify if the string that will replace \n
            
        return: list
            list of periods of all the classes of that block
        '''

        return self.__get_things(course_block, "div", "id", re.compile(r'^win0divMTG_TOPIC\$\d+'),'\n', purify_string)


    def get_class_avaliable_seat_list(self, course_block, purify_string = None):
        '''Get all the avaliable seats of the classes of that course block

        Args:
            course_block: the course block contains all the classes (one course block should only contain one course)
            purify_string: specify if the string that will replace \n
            
        return: list
            list of avaliable seats of all the classes of that block
        '''

        return self.__get_things(course_block, "div", "id", re.compile(r'^win0divDERIVED_CS_LONG_LABEL\$\d+'),'\n', purify_string)
    

    def get_total_class_index(self):
        '''Return the last index of the classes (which is count - 1)

        return: int
            last index of the classes
        '''
        if self.is_split == 0:
            raise RuntimeError("Courses must be split into course block first.")

        temp_list = self.course_block_list[-1].find_all("a", { "id":re.compile(r'^MTG_CLASSNAME\$\d+') })
        return re.search(r'\d+',temp_list[-1]['id']).group()
        
if __name__ == '__main__':
    CourseCrawler()
