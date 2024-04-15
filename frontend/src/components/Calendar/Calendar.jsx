import React, {useEffect, useState} from 'react';
import {generateDate, months} from "./util/date";
import cn from "./util/cn";
import dayjs from "dayjs";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import axios from "axios";
import AppConfig from "../../config";

const Calendar = () => {

    const days = ["Sun","Mon","Tue", "Wen", "Thu", "Fri", "Sat"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate)
    const [selectDate, setSelectDate] = useState(currentDate);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [token,setToken] = useState(null);
    const [projectsDue,setProjectsDue] = useState([]);
    const [tasksDue,setTasksDue] = useState([]);

    useEffect(() =>{
        setToken( localStorage.getItem('loginToken'));

    },[])

    useEffect(() => {
        if (token != null) {
            const fetchData = async () => {
                try {
                    const response = await fetchDeadlines(token);
                    setTasks(response.tasks);
                    setProjects(response.projects);
                } catch (error) {
                    console.error('Error fetching tasks:', error);
                }
            };

            fetchData();

            const axiosInterceptor = axios.interceptors.request.use(async (config) => {
                // Check if the request is not for the '/api/calendar' endpoint
                if (!config.url.endsWith('/api/calendar') && !config.url.endsWith('/api/notifications')) {
                    await fetchData(); // Execute fetchDeadlines for other requests
                }
                return config;
            });

            return () => {
                axios.interceptors.request.eject(axiosInterceptor);
            };
        }
    }, [token]);

    useEffect(() =>{
        if(tasks != null && projects != null){
            getProjectsAndTasksForDate(selectDate.toDate().toDateString());
        }

    },[projects,tasks,selectDate])

    const fetchDeadlines = async (token) => {

        try {
            const response = await axios.get(`${AppConfig.backendUrl}/api/calendar`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching tasks:", error);
            return [];
        }
    };

    const dayColorComparator = (dateString) => {

        if(checkTaskDeadline(dateString)){
            return "bg-orange-400";
        }else if(checkProjectDeadline(dateString)){
            return "bg-red-700";
        }else if(selectDate.toDate().toDateString() === dateString){
            return "bg-indigo-950";
        }

        return "";
    };

    const checkProjectDeadline = (dateString) => {
        return projects.some(project => {
            const projectDeadline = new Date(project.deadline);
            return projectDeadline.toDateString() === dateString;
        });
    };

    const checkTaskDeadline = (dateString) => {
        return tasks.some(task => {
            const taskDeadline = new Date(task.deadline);
            return taskDeadline.toDateString() === dateString;
        });
    };

    const getProjectsAndTasksForDate = (dateString) => {
        const projectsDue = projects.filter(project => {
            const projectDeadline = new Date(project.deadline);
            return projectDeadline.toDateString() === dateString;
        });

        const tasksDue = tasks.filter(task => {
            const taskDeadline = new Date(task.deadline);
            return taskDeadline.toDateString() === dateString;
        });

        setProjectsDue(projectsDue);
        setTasksDue(tasksDue);
    };

    return (
        <div className={"flex flex-col mx-auto divide-x-2 gap-10 h-full w-full items-center"}>
            <div className={"w-full h-1/2 bg-blue-800"} id={"calendarContainer"}>
                <div className={"flex justify-between w-full h-10 items-center bg-indigo-950"} >
                    <h1 className={"font-bold w-1/2 text-center text-white"}>
                        {months[ today.month()]},{today.year()}
                    </h1>
                    <div className={"flex items-center gap-5 w-1/2"} id={"dateButtons"}>
                        <GrFormPrevious className={"w-5 h-5 cursor-pointer font-bold text-white hover:border hover:border-white"} onClick={() => {
                            setToday(today.month(today.month()-1));
                        }}/>
                        <h1 className={"cursor-pointer font-bold text-white hover:border hover:border-white"} onClick={() => {
                            setToday(currentDate);
                            setSelectDate(currentDate)
                        }}>Today</h1>
                        <GrFormNext className={"w-5 h-5 cursor-pointer font-bold text-white hover:border hover:border-white"} onClick={() => {
                            setToday(today.month(today.month()+1));
                        }}/>
                    </div>
                </div>

                <div className={"grid grid-cols-7 text-white font-bold bg-indigo-950"}>

                    {days.map((day, index) => {
                        return (<div
                            key={index}
                            className={"border-b border-white grid place-content-center"}
                        >
                            {day}
                        </div>);
                    })}

                </div>
                <div className={"grid grid-cols-7 bg-blue-800"} >
                    {generateDate(today.month(),today.year()).map(({date, currentMonth, today}, index) => {
                        return (<div
                            key={index}
                            className={" grid place-content-center"}
                        >
                            <div className={cn(
                                currentMonth ? "text-white font-bold" : "font-bold",
                                selectDate.toDate().toDateString() === date.toDate().toDateString() ? "border-2 border-white text-white" : "",
                                dayColorComparator(date.toDate().toDateString()),
                                "h-10 w-10 grid place-content-center rounded-full hover:bg-indigo-950 hover:text-white transition-all cursor-pointer"
                            )}
                                 onClick={() =>{
                                     setSelectDate(date)
                                 }}
                            >
                                {date.date()}
                            </div>
                        </div>);
                    })}
                </div>
            </div>
            <div className={"h-1/2 w-full overflow-y-auto"} id={"detailsContainer"}>
                <h1 className={"pb-2 border-b border-white font-bold text-white text-center"}>Deadlines
                    for {selectDate.toDate().toDateString()}</h1>
                <div className="pt-2 font-bold text-white">
                    <h2 className={"text-center"}>Projects Due:</h2>
                    <ul className={"text-left"}>
                        {projectsDue.map(project => (
                            <li key={project.id}>{project.name}</li>
                        ))}
                    </ul>
                    <h2 className={"text-center"}>Tasks Due:</h2>
                    <ul>
                        {tasksDue.map(task => (
                            <li key={task.id}>{task.name}({task.status})</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Calendar