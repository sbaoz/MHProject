import React, {useState, useRef, useEffect} from 'react';
import dayjs from 'dayjs';
import classNames from 'classnames';
import 'dayjs/locale/zh-cn';
import './index.less';

dayjs.locale('zh-cn');

interface IProps {
    style?: React.CSSProperties,
    callback?: (day: any) => void
}

function Calendar({ style, callback }: IProps) {
    const today = useRef(dayjs());
    const curDate = useRef(today.current.date(1));
    const calendarRef = useRef<React.LegacyRef<HTMLDivElement>>();
    const next = useRef('');
    const [selDay, setSelDay] = useState(today.current);
    const [monthYear, setMonthYear] = useState<string>(curDate.current.format('MMM YYYY'));
    const [monthCls, setMonthCls] = useState({
        'month': true,
        'new': true,
        'month out next': false,
        'month out prev': false,
        'month in next': false,
        'month in prev': false
    });

    const resetMonth = () => {
        if (next.current === 'next' || next.current === 'prev') {
            curDate.current = next.current === 'next' ? curDate.current.add(1, 'month') : curDate.current.subtract(1, 'month');
            setMonthYear(curDate.current.format('MMM YYYY'));
            const tmpNext = next.current;
            next.current = '';
            setMonthCls({
                'month': true,
                'new': !tmpNext,
                'month out next': false,
                'month out prev': false,
                'month in next': tmpNext === 'next',
                'month in prev': tmpNext === 'prev',
            });
        }
    }

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.addEventListener('animationend', resetMonth);
        }
        return () => {
            if (calendarRef.current) {
                calendarRef.current.removeEventListener('animationend', resetMonth);
            }
        }
    }, []);

    const prevMonth = () => {
        next.current = 'prev';
        setMonthCls({
            'month': false,
            'new': false,
            'month out next': false,
            'month out prev': true,
            'month in next': false,
            'month in prev': false
        });
    }

    const nextMonth = () => {
        next.current = 'next';
        setMonthCls({
            'month': false,
            'new': false,
            'month out next': true,
            'month out prev': false,
            'month in next': false,
            'month in prev': false
        });
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

    const getDayClass = (day: any) => {
        const classes = {
            'day': true,
            'other': day.month() !== curDate.current.month(),
            'today': today.current.isSame(day, 'day'),
            'select': selDay.isSame(day, 'day')
        };
        return classes;
    }

    const onClickDay = (day: any) => {
        setSelDay(day);
        callback && callback(day)
    }

    const renderDay = (days: any): React.ReactNode[] => {
        const result: React.ReactNode[] = [];
        let classes = {};
        days.forEach((day: any, index: number) => {
            classes = getDayClass(day);
            result.push(
                <div key={`day-${index}`} styleName={classNames(classes)} onClick={() => onClickDay(day)}>
                    <div styleName='day-name'>
                        {day.format('ddd')}
                    </div>
                    <div styleName='day-number'>
                        {day.format('DD')}
                    </div>
                </div>
            )
        })
        return result;
    }

    const renderWeek = (): React.ReactNode[] => {
        const week = getWeek();
        const result: React.ReactNode[] = [];
        week.forEach((days, key) => {
            result.push(
                <div styleName='week' key={`week-${key}`}>
                    {
                        renderDay(days)
                    }
                </div>
            )
        });
        return result;
    }

    const renderMonth = () => {
        return (
            <div styleName={classNames(monthCls)} ref={calendarRef}>
                {
                    renderWeek()
                }
            </div>
        )
    }

    return (
        <div styleName='calendar' style={style}>
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
