import React, {useState} from 'react';
import {generateDate, months} from "./util/date";
import cn from "./util/cn";
import dayjs from "dayjs";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

const Calendar = () => {

    const days = ["Sun","Mon","Tue", "Wen", "Thu", "Fri", "Sat"];
    const currentDate = dayjs();
    const [today, setToday] = useState(currentDate)
    const [selectDate, setSelectDate] = useState(currentDate);

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
                                selectDate.toDate().toDateString() === date.toDate().toDateString() ? "bg-indigo-950 border-2 border-white text-white" : "",
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
            <div className={"h-1/2 w-full"} id={"detailsContainer"}>
                <h1 className={"pb-2 border-b border-white font-bold text-white text-center"}>Deadlines for {selectDate.toDate().toDateString()}</h1>
                <p className={" pt-2 font-bold text-white text-center"}>Placeholder Text</p>
            </div>
        </div>

    )
}

export default Calendar