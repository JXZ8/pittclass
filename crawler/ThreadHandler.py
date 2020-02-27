class ThreadHandler(object):
    '''
    ThreadHandler class. 

    class variables:
        static:
            self.TASK_NUMBER_FOR_ONE_REQUEST: Task number to assign for one time
        non-static:
            self.task_list: Task list. e.g. ["task1","task2","task3"]
            self.current_curr: Current position
            self.task_count_total: Total tasks count. Calculated from len(task_list)
            self.task_remain: Temaining tasks .
            self.l: Logger()
            self.lock: threading.Lock()

    NOTE: This is a base class.
    '''
            
    TASK_NUMBER_FOR_ONE_REQUEST = 5 #assign n tasks a time
    def __init__(self, lock, l = None):

        self.task_list = []
        self.task_list = self.initialize_task_list()
        self.current_curr = 0
        self.task_count_total = len(self.task_list)
        self.task_remain = self.task_count_total
        self.l = l
        self.lock = lock
        self.__echo("Total task count: " + str(self.task_count_total))
        

    def initialize_task_list(self):
        '''
        Initialize task

        NOTE: This need to be overrided

        return: list
            Task list
        '''
        if self.l != None:
            self.l.error("ThreadHandler can't be instantiated")
        raise NotImplementedError("ThreadHandler can't be instantiated")

    def __echo(self, text):
        if self.l != None:
            self.l.log(text)
        else:
            print(text)


    def get_task(self, thread_id):
        '''
        Threads call get_task to get the tasks.

        Args:
            thread_id: The thread_id

        return: list
            return the list contains tasks to complete
        '''
        
        self.lock.acquire()
        task_num = self.TASK_NUMBER_FOR_ONE_REQUEST
        start_curr = self.current_curr

        #if there is no task left, return -1-1
        if self.task_remain <= 0:
            self.__echo("All mission completed!")
            return [-1]

        #assign task
        #if the remaining tasks are less than one time needed
        if self.task_remain < self.TASK_NUMBER_FOR_ONE_REQUEST:
            task_num = self.task_remain

        self.__echo("Assigned task from: " + str(self.current_curr) +" to thread: "+ str(thread_id) + ". Assigned task number: "+ str(task_num))

        self.task_remain -= self.TASK_NUMBER_FOR_ONE_REQUEST
        self.current_curr += task_num
        self.lock.release()

        return self.task_list[start_curr:start_curr+task_num]
        
        
