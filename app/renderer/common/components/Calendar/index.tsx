import React, { useState, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import './index.less';

dayjs.locale('zh-cn');

function Calendar() {
    const curDate = useRef(dayjs().date(1));
    const [monthYear, setMonthYear] = useState(curDate.current.format('MMM YYYY'));

    const prevMonth = () => {
        curDate.current = curDate.current.subtract(1, 'month');
        setMonthYear(curDate.current.format('MMM YYYY'));
    }

    const nextMonth = () => {
        curDate.current = curDate.current.add(1, 'month');
        setMonthYear(curDate.current.format('MMM YYYY'));
    }

    const renderHeader = () => {
        return (
            <div styleName='header'>
                <div styleName='left' onClick={prevMonth}></div>
                <h1>{monthYear}</h1>
                <div styleName='right' onClick={nextMonth}></div>
            </div>
        )
    }

    const getBackDay = () => {
        const dayOfWeek = curDate.current.day();
        if (!dayOfWeek) {
            return [];
        }
        const backDay = [];
        let clone = curDate.current.subtract(dayOfWeek + 1, 'day');
        for (let i = dayOfWeek; i > 0; i--) {
            clone = clone.add(1, 'day');
            backDay.push(clone);
        }
        return backDay;
    }

    const getForwardDay = () => {
        let clone = curDate.current.add(1, 'month').subtract(1, 'day');
        const dayOfWeek = clone.day();
        if (dayOfWeek === 6) {
            return [];
        }
        const forwardDay = [];
        for (let i = dayOfWeek; i < 6; i++) {
            clone = clone.add(1, 'day');
            forwardDay.push(clone);
        }
        return forwardDay;
    }

    const getCurrentMonth = () => {
        const currentMonthDay = [];
        let clone = curDate.current.clone();
        while (clone.month() === curDate.current.month()) {
            currentMonthDay.push(clone);
            clone = clone.add(1, 'day');
        }
        return currentMonthDay;
    }

    const getWeek = () => {
        const backDay = getBackDay();
        const currentMonthDay = getCurrentMonth();
        const forwardDay = getForwardDay();
        const weekMap = new Map();
        let key = 0;
        [...backDay, ...currentMonthDay, ...forwardDay].forEach((day, index) => {
            if (index === 0 || day.day() === 0) {
                if (weekMap.size > 0) {
                    key++;
                }
                weekMap.set(key, [day]);
            } else {
                weekMap.get(key).push(day);
            }
        });
        return weekMap;
    }

    const renderDay = (days: any): React.ReactNode[] => {
        const resule: React.ReactNode[] = [];
        days.forEach((day: any, index: number) => {

        })
        return resule;
    }

    const renderWeek = (): React.ReactNode[] => {
        const week = getWeek();
        const resule: React.ReactNode[] = [];
        week.forEach((days, key) => {
            resule.push(
                <div styleName='week' key={`week-${key}`}>
                    {
                        renderDay(days)
                    }
                </div>
            )
        });
        return resule;
    }

    const renderMonth = () => {
        return (
            <div styleName='month'>
                {
                    renderWeek()
                }
            </div>
        )
    }

    return (
        <div styleName='calendar'>
            {
                renderHeader()
            }
            {
                renderMonth()
            }
        </div>
    )
}

export default Calendar;
