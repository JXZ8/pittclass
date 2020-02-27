import sys
import requests
from bs4 import BeautifulSoup
import lxml
import time
import json
from database import *


ICBcDomData = "C~HC_SSR_SSENRL_CART_GBL~EMPLOYEE~SA~SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL~UnknownValue~Enrollment: Add Classes~UnknownValue~UnknownValue~https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL~UnknownValue*F~HCCC_ENROLLMENT~EMPLOYEE~SA~UnknownValue~UnknownValue~Enrollment~UnknownValue~UnknownValue~https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_INFRAME?pt_fname=HCCC_ENROLLMENT&c=HAdUfC54RGEp%2f1A%2f9a8X6D9HzFApegKe&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT&IsFolder=true~UnknownValue*F~CO_EMPLOYEE_SELF_SERVICE~EMPLOYEE~SA~UnknownValue~UnknownValue~Self Service~UnknownValue~UnknownValue~https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/s/WEBLIB_PT_NAV.ISCRIPT1.FieldFormula.IScript_PT_NAV_INFRAME?pt_fname=CO_EMPLOYEE_SELF_SERVICE&c=HAdUfC54RGEp%2f1A%2f9a8X6D9HzFApegKe&FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE&IsFolder=true~UnknownValue"


s = requests.session()

headers = {
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
    "Cookie":"BIGipServerPITPRD_Pool=!8SffBQGUKA5FkebDRo7qPiYOkn7rXE36p2Nr+Z5xt7xNcUEC94vPK5avZVVmpQW7smgjbZOKceGMprc=; _shibsession_64656661756c7468747470733a2f2f7072642e70732e706974742e6564752f73686962626f6c657468=_30800cd18e21b00058ef17b41c150755; pitp855-cs-8080-PORTAL-PSJSESSIONID=PMPAuHVWW7zuFn8SEek-BCRK3F8Pp0mu!979938395; ExpirePage=https://prd.ps.pitt.edu/psp/pitcsprd/; PS_LOGINLIST=https://prd.ps.pitt.edu/pitcsprd; PS_TOKEN=rwAAAAQDAgEBAAAAvAIAAAAAAAAsAAAABABTaGRyAk4AeQg4AC4AMQAwABRCiWDyGWpN7wAy5ABM2c8hvH3XmW8AAAAFAFNkYXRhY3icHcq5DYNAEIXhn0OOqIAeQCzHLsQclh1YKyAicR30RnE8dqT3jeY4gTSJo0j9igmVfflwYHBYXjM/3uSejYWdP17XnVGzZ2Wiral4UihGGoagpZRGdkGnfUVDr29uItoNGQ==; SignOnDefault=; https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2femployee%2fsa%2frefresh=list: %3ftab%3ddefault|%3frp%3ddefault|%3ftab%3dremoteunifieddashboard|%3frp%3dremoteunifieddashboard; ps_theme=node:SA portal:EMPLOYEE theme_id:PITT_THEME_FLUID css:PITT_BRAND_CLASSIC_TEMPLTE_FLU css_f:PITT_BRAND_FLUID_TEMPLATE accessibility:N macroset:PITT_DEFAULT_MACROSET_855 formfactor:3 piamode:2; PS_DEVICEFEATURES=width:2560 height:1440 pixelratio:1 touch:0 geolocation:1 websockets:1 webworkers:1 datepicker:1 dtpicker:1 timepicker:1 dnd:1 sessionstorage:1 localstorage:1 history:1 canvas:1 svg:1 postmessage:1 hc:0 maf:0; psback=%22%22url%22%3A%22https%3A%2F%2Fprd.ps.pitt.edu%2Fpsp%2Fpitcsprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL%3FFolderPath%3DPORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SSR_SSENRL_CART_GBL%26IsFolder%3Dfalse%26IgnoreParamTempl%3DFolderPath%2CIsFolder%22%20%22label%22%3A%22Enrollment%3A%20%20Add%20Classes%22%20%22origin%22%3A%22PIA%22%20%22layout%22%3A%220%22%22; PS_TOKENEXPIRE=20_Jan_2020_02:12:01_GMT",
    "Referer":"https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SSR_SSENRL_CART_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder&PortalActualURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL&PortalContentURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL&PortalContentProvider=SA&PortalCRefLabel=Enrollment%3a%20%20Add%20Classes&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2f&PortalURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2f&PortalHostNode=SA&NoCrumbs=yes&PortalKeyStruct=yes"
}



url = "https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SSR_SSENRL_CART_GBL&IsFolder=false&IgnoreParamTempl=FolderPath%2CIsFolder&PortalActualURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL&PortalContentURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL&PortalContentProvider=SA&PortalCRefLabel=Enrollment%3a%20%20Add%20Classes&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2f&PortalURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2f&PortalHostNode=SA&NoCrumbs=yes&PortalKeyStruct=yes"

#r = s.get(url, headers = headers)

#bs4_string = BeautifulSoup(r.text, 'lxml')
#icsid = bs4_string.find("input",{"name":"ICSID"})["value"]

headers1 = {
    "Cookie":"BIGipServerPITPRD_Pool=!ak/qi+K5TJME7aTDRo7qPiYOkn7rXI1xasboDVqmWQ3dEtm/ffKlEPKGVFJ1/PC5FCbkXPvY0CwShp8=; _shibsession_64656661756c7468747470733a2f2f7072642e70732e706974742e6564752f73686962626f6c657468=_e9f0db386f9031c728e911c41623ac12; pitp855-cs-8080-PORTAL-PSJSESSIONID=1A7Axt6Dzrf2mbSm9flatGIvsn-b9QWi!1101806568; ExpirePage=https://prd.ps.pitt.edu/psp/pitcsprd/; PS_LOGINLIST=https://prd.ps.pitt.edu/pitcsprd; PS_TOKEN=rwAAAAQDAgEBAAAAvAIAAAAAAAAsAAAABABTaGRyAk4AeQg4AC4AMQAwABSk/gSYuMIHnChozAWn0zut0V8gHm8AAAAFAFNkYXRhY3icHYkxDoNAEAMHiKh4Qf4AYgkclzoQBEV0Aqo0eUf+xuMwZ8ljr/cP3LI0SZRHSlSxMPPF6HHkIx8m7oGNNzs/gr47L92BlYG2oeZyKZtoPCMdlfZefMRudHh1r+QEI4MNJA==; SignOnDefault=; https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2femployee%2fsa%2frefresh=list: %3ftab%3ddefault|%3frp%3ddefault|%3ftab%3dremoteunifieddashboard|%3frp%3dremoteunifieddashboard; ps_theme=node:SA portal:EMPLOYEE theme_id:PITT_THEME_FLUID css:PITT_BRAND_CLASSIC_TEMPLTE_FLU css_f:PITT_BRAND_FLUID_TEMPLATE accessibility:N macroset:PITT_DEFAULT_MACROSET_855 formfactor:3 piamode:2; PS_DEVICEFEATURES=width:2560 height:1440 pixelratio:1 touch:0 geolocation:1 websockets:1 webworkers:1 datepicker:1 dtpicker:1 timepicker:1 dnd:1 sessionstorage:1 localstorage:1 history:1 canvas:1 svg:1 postmessage:1 hc:0 maf:0; psback=%22%22url%22%3A%22https%3A%2F%2Fprd.ps.pitt.edu%2Fpsp%2Fpitcsprd%2FEMPLOYEE%2FSA%2Fc%2FSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL%3FFolderPath%3DPORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SSR_SSENRL_CART_GBL%26IsFolder%3Dfalse%26IgnoreParamTempl%3DFolderPath%2CIsFolder%22%20%22label%22%3A%22Enrollment%3A%20%20Add%20Classes%22%20%22origin%22%3A%22PIA%22%20%22layout%22%3A%220%22%22; PS_TOKENEXPIRE=20_Jan_2020_02:30:13_GMT",
    "Host":"prd.ps.pitt.edu",
    "Origin":"https://prd.ps.pitt.edu",
    "Referer":"https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL?FolderPath=PORTAL_ROOT_OBJECT.CO_EMPLOYEE_SELF_SERVICE.HCCC_ENROLLMENT.HC_SSR_SSENRL_CART_GBL&IsFolder=false&IgnoreParamTempl=FolderPath,IsFolder&PortalActualURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL&PortalContentURL=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2fEMPLOYEE%2fSA%2fc%2fSA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL&PortalContentProvider=SA&PortalCRefLabel=Enrollment%3a%20%20Add%20Classes&PortalRegistryName=EMPLOYEE&PortalServletURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsp%2fpitcsprd%2f&PortalURI=https%3a%2f%2fprd.ps.pitt.edu%2fpsc%2fpitcsprd%2f&PortalHostNode=SA&NoCrumbs=yes&PortalKeyStruct=yes",
    "Origin":"https://prd.ps.pitt.edu",
    "Sec-Fetch-Site":"same-origin"
    }

data = {}

data["ICAJAX"] = "1"
data["ICNAVTYPEDROPDOWN"] = "1"
data["ICType"] = "Panel"
data["ICElementNum"] = "0"
data["ICStateNum"] = "15"
data["ICAction"] = "DERIVED_REGFRM1_SSR_PB_ADDTOLIST2$9$"
data["ICModelCancel"] = "0"
data["ICXPos"] = "0"
data["ICYPos"] = "0"
data["ResponsetoDiffFrame"] = "-1"
data["TargetFrameName"] = "None"
data["FacetPath"] = "None"
data["ICFocus"] = ""
data["ICSaveWarningFilter"] = ""
data["ICChanged"] = "-1"
data["ICSkipPending"] = "0"
data["ICAutoSave"] = "0"
data["ICResubmit"] = "0"
data["icsid"] = "WvJnCTE69p9G9fHzEy39wv8RTbo/HidRI0JnqPn+Yuw="
data["ICActionPrompt"] = "false"
data["ICBcDomData"] = ICBcDomData
data["ICPanelName"] = ""
data["ICFind"] = ""
data["ICAddCount"] = ""
data["ICAPPCLSDATA"] = ""
data["DERIVED_SSTSNAV_SSTS_MAIN_GOTO$27$"] = "9999"
data["DERIVED_REGFRM1_CLASS_NBR"] = "26801"
data["DERIVED_REGFRM1_SSR_CLS_SRCH_TYPE$249$"] = "06"
data["ptus_defaultlocalnode"] = "PSFT_PITCSPRD"
data["ptus_dbname"] = "PITCSPRD"
data["ptus_portal"] = "EMPLOYEE"
data["ptus_node"] = "SA"
data["ptus_workcenterid"] = ""
data["ptus_componenturl"] = "https://prd.ps.pitt.edu/psp/pitcsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL"






r = s.post("https://prd.ps.pitt.edu/psc/pitcsprd/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSR_SSENRL_CART.GBL",  data = data, headers = headers1, allow_redirects = True)
print(r.text)
