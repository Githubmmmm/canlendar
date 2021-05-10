<!--
 * @Description: 
 * @Author: zouxm
 * @Date: 2021-05-10 10:03:45
 * @LastEditTime: 2021-05-10 14:02:05
 * @LastEditors: zouxm
-->
<template>
    <div class="calendar-box">
        <div class="calendar" id="calendar" tabindex="0">
            <div class="c_top">
                <span class="c_arrow c_arrow_left" v-on:click.stop="prev"></span>
                <span class="c_t_txt">{{ calenTitle }}</span>
                <span class="c_arrow c_arrow_right" v-on:click.stop="next"></span>
            </div>
            <table v-if="model == modelMap.day || model == modelMap.week">
                <tr>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                    <th>日</th>
                </tr>
                <tr v-for="(gitem, groupkey) in calenList" :key="groupkey">
                    <td
                        :class="{ selected: item.txt == curTimeTxt && model == 'day', weekSelected: item.txt == curTimeTxt && model == 'week' }"
                        v-for="(item, itemkey) in gitem"
                        :key="itemkey"
                        @click="selectCalendar(item)"
                    >
                        <div class="box">
                            <span :class="{ notcurentday: !item.iscurent }">{{ item.day }}</span>
                        </div>
                    </td>
                </tr>
            </table>

            <!-- 月份 -->
            <ul class="month" v-else-if="model == modelMap.moth">
                <li :class="{ selected: item.txt == curTimeTxt }" v-for="(item, calendarkey) in calenList" :key="calendarkey" @click="selectCalendar(item)">{{ item.showMoth }}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        model: {
            type: String,
            default: 'day'
        },
        curTimeTxt: {
            type: String,
            default: ''
        },
        showCalendar: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            calenTitle: '',
            dayModel: {
                28: [2],
                29: [2],
                30: [4, 6, 9, 11],
                31: [1, 3, 5, 7, 8, 10, 12]
            },
            dayText: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            calenList: [],
            modelMap: {
                day: 'day',
                week: 'week',
                moth: 'moth'
            },
            dayDate: null,
            weekDate: null,
            mothDate: null,
            showDayDate: null,
            showWeekDate: null,
            showMothDate: null
        }
    },
    watch: {
        //当前的日期选择改变了
        dayDate: function(val) {
            this.$emit('update:curTimeTxt', val.txt)
            this.calenTitle = val.calendarTitle
            if (this.model == this.modelMap.week) {
                this.calenTitle = this.calenList[0][0].calendarTitle
            }
            this.showDayDate = val
        }
    },
    created() {
        this.initCalenDar()
    },
    methods: {
        //初始日历插件
        initCalenDar() {
            switch (this.model) {
                case this.modelMap.day:
                    this.initDay()
                    break
                case this.modelMap.moth:
                    this.initMoth()
                    break
                case this.modelMap.week:
                    this.initDay()
                    break
                default:
                    break
            }
        },
        //模式为年月日类型
        initDay() {
            this.calenList = this.computeDateList(this.getCurentDate())
            let list = []
            this.pushDateItem(list, new Date())
            this.dayDate = list[0]
        },
        //模式为月份
        initMoth() {
            let _newDate = new Date()
            this.calenList = this.computMothList(_newDate)
            this.dayDate = this.calenList[_newDate.getMonth()]
        },
        //计算得到月列表
        computMothList(date) {
            let list = []
            let year = date.getFullYear()
            for (let i = 1; i <= 12; i++) {
                let moth = ('' + i).padStart(2, 0)
                let item = {
                    year,
                    dMoth: i - 1,
                    moth,
                    showMoth: `${i}月`,
                    txt: `${year}年${moth}月`,
                    calendarTitle: `${year}年`
                }
                list.push(item)
            }
            return list
        },
        //获取当前日期
        getCurentDate() {
            let date = new Date()
            return date
        },
        //计算得到日历列表
        computeDateList(date) {
            let list = []
            let year = date.getFullYear()
            let moth = date.getMonth()
            let tMoth = moth + 1
            let len = 0
            if (this.dayModel['30'].includes(tMoth)) {
                len = 30
            }
            if (this.dayModel['31'].includes(tMoth)) {
                len = 31
            }
            //判断是否闰年
            if (tMoth == 2) {
                if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                    len = 29
                } else {
                    len = 28
                }
            }
            let fristDayDate = new Date(year, moth, 1)
            let fristDay = fristDayDate.getDay()
            //当前月份1号前的日期
            let fristGapDay = fristDay == 0 ? 7 : fristDay
            for (let i = fristGapDay - 1; i >= 1; i--) {
                let date = new Date(+fristDayDate - i * 24 * 60 * 60 * 1000)
                this.pushDateItem(list, date, false)
            }
            for (let i = 0; i < len; i++) {
                let date = new Date(+fristDayDate + i * 24 * 60 * 60 * 1000)
                this.pushDateItem(list, date, true)
            }
            let lastDate = new Date(year, moth, len)
            let lastDateDay = lastDate.getDay()
            if (lastDateDay > 0) {
                for (let i = 1; i <= 7 - lastDateDay; i++) {
                    let date = new Date(+lastDate + i * 24 * 60 * 60 * 1000)
                    this.pushDateItem(list, date, false)
                }
            }
            //分组
            let groupList = []
            let colum = 7
            let rows = list.length / colum
            for (let i = 1; i <= rows; i++) {
                let arr = list.slice((i - 1) * colum, i * colum)
                groupList.push(arr)
            }
            return groupList
        },
        /**
         * 选择日期
         */
        selectCalendar(item) {
            if (this.model == this.modelMap.day) {
                this.dayDate = item
                let date = new Date(item.year, item.dMoth, item.dday)
                this.calenList = this.computeDateList(date)
            } else if (this.model == this.modelMap.moth || this.model == this.modelMap.week) {
                this.dayDate = item
            }
            this.$emit('update:showCalendar', false)
        },
        //当前日期向前
        preDate() {
            if (this.model == this.modelMap.day || this.model == this.modelMap.moth) {
                this.preAndNextDate(-1 * 24 * 60 * 60 * 1000)
            } else if (this.model == this.modelMap.week) {
                this.preAndNextDate(-7 * 24 * 60 * 60 * 1000)
            }
        },
        //当前日期向后
        nextDate() {
            if (this.model == this.modelMap.day) {
                this.preAndNextDate(1 * 24 * 60 * 60 * 1000)
            } else if (this.model == this.modelMap.moth) {
                this.preAndNextDate(31 * 24 * 60 * 60 * 1000)
            } else if (this.model == this.modelMap.week) {
                this.preAndNextDate(7 * 24 * 60 * 60 * 1000)
            }
        },
        //类型为day的日历
        preAndNextDate(timeStap) {
            let { year, dMoth, dday = 1, startWeek, endWeek } = this.dayDate
            let _cDate = new Date(year, dMoth, dday)
            if (this.model == this.modelMap.week) {
                _cDate = timeStap < 0 ? endWeek : startWeek
            }
            let list = []
            let _newDate = new Date(+_cDate + timeStap)
            if (this.model == this.modelMap.day || this.model == this.modelMap.week) {
                this.calenList = this.computeDateList(_newDate)
                this.pushDateItem(list, _newDate)
                this.dayDate = list[0]
            } else if (this.model == this.modelMap.moth) {
                this.calenList = this.computMothList(_newDate)
                this.dayDate = this.calenList[_newDate.getMonth()]
            }
        },
        //日历的
        prev() {
            this.prevAndNextDay(-1 * 24 * 60 * 60 * 1000, true)
        },
        next() {
            if (this.model == this.modelMap.day || this.model == this.modelMap.week) {
                this.prevAndNextDay(1 * 24 * 60 * 60 * 1000, false)
            } else if (this.model == this.modelMap.moth) {
                this.prevAndNextDay(366 * 24 * 60 * 60 * 1000, false)
            }
        },
        //类型为day的日历
        prevAndNextDay(timeStap, isPrev) {
            let { year, dMoth } = this.showDayDate
            //月份从1月1号开始
            if (this.model == this.modelMap.moth) {
                dMoth = 0
            }
            let curentdate = new Date(year, dMoth, 1)

            let newdate = null
            let list = []
            if (this.model == this.modelMap.day || this.model == this.modelMap.week) {
                newdate = new Date(+curentdate + (isPrev ? 1 * timeStap : 31 * timeStap))
                this.calenList = this.computeDateList(newdate)
                this.pushDateItem(list, newdate)
            } else if (this.model == this.modelMap.moth) {
                newdate = new Date(+curentdate + timeStap)
                this.calenList = this.computMothList(newdate)
                list = this.calenList
            }
            this.showDayDate = list[0]
            this.calenTitle = this.showDayDate.calendarTitle
        },
        //获取每项日期
        getDateItem(date, iscurent) {
            let year = date.getFullYear()
            let dMoth = date.getMonth()
            let moth = (dMoth + 1 + '').padStart(2, 0)
            let dday = date.getDate()
            let day = (dday + '').padStart(2, 0)
            let days = this.dayText[date.getDay()]
            let txt = `${moth}月${day}日(${days})`
            let calendarTitle = `${dMoth + 1}月`
            return {
                year,
                moth,
                day,
                days,
                dMoth,
                dday,
                txt,
                calendarTitle,
                iscurent
            }
        },
        //进入队列
        pushDateItem(list, date, iscurent) {
            let item = this.getDateItem(date, iscurent)
            let curentDay = date.getDay()
            if (curentDay == 0) {
                curentDay = 7
            }
            let weekBefore = curentDay - 1
            let weekAfter = 7 - curentDay
            let weekStartDate = date
            let weekEndDate = date
            if (weekBefore > 0) {
                weekStartDate = new Date(+date - weekBefore * 24 * 60 * 60 * 1000)
            }
            if (weekAfter < 7) {
                weekEndDate = new Date(+date + weekAfter * 24 * 60 * 60 * 1000)
            }
            //不是当年需要日历组件显示年
            let curentYear = new Date().getFullYear()
            if (curentYear != item.year) {
                item.calendarTitle = `${item.year}年${item.calendarTitle}`
                item.txt = `${item.year}年${item.txt}`
            }
            if (this.model == this.modelMap.week) {
                let { year, moth, day } = this.getDateItem(weekStartDate)
                let { year: endy, moth: endm, day: endd } = this.getDateItem(weekEndDate)
                item.startWeek = weekStartDate
                item.endWeek = weekEndDate
                if (curentYear == year) {
                    item.txt = `${moth}/${day}~${endm}/${endd}`
                } else {
                    item.txt = `${year}/${moth}/${day}~${endy}/${endm}/${endd}`
                }
            }
            list.push(item)
        }
    }
}
</script>
<style scoped>
.calendar {
    background: #fff;
    padding: 0.2rem 0;
    outline: none;
}
.calendar-box {
    display: block;
    content: '';
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 0;
}

.calendar .c_top {
    height: 1.28rem;
    line-height: 1.28rem;
    -webkit-display: flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    position: relative;
    color: #4c4e52;
}
.c_top .c_arrow {
    width: 1.6rem;
}
.c_top .c_t_txt {
    font-size: 0.42667rem;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: #404040;
}
.c_top .c_arrow {
    width: 1.6rem;
}
table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
}
table th {
    padding: 0.16rem 0;
}
table td {
    text-align: center;
}
table td .box {
    padding: 0.05333rem;
}
table td span {
    width: 0.64rem;
    height: 0.64rem;
    line-height: 0.64rem;
    background: #fff;
    display: inline-block;
    color: #606266;
    margin: 0.05rem;
}
table td.selected span {
    border-radius: 100%;
    color: #fff;
    background-color: #409eff;
}
.c_arrow:before {
    content: '';
    display: inline-block;
    height: 10px;
    width: 10px;
    border-width: 2px 2px 0 0;
    border-color: #898990;
    border-style: solid;
    top: 1px;
    border-radius: 2px;
    position: relative;
}
.c_arrow_left:before {
    -webkit-transform: rotate(225deg);
    transform: rotate(225deg);
}
.c_arrow_right:before {
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}
.month {
    padding: 0.26667rem;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    text-align: center;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
.month li {
    padding: 0.26667rem 0;
    width: 25%;
    padding: 0.26667rem;
    display: inline-block;
    border-radius: 0.26667rem;
    font-size: 0.45333rem;
    color: #525458;
}
.month li.selected {
    color: #525458;
    background: #f2f6fc;
}
.weekSelected,
table td.weekSelected span {
    background-color: #eef3fb;
}

.weekSelected:first-child {
    border-radius: 18px 0 0 18px;
}
.weekSelected:first-child span {
    color: #fff;
}
.weekSelected:last-child {
    border-radius: 0 18px 18px 0;
}
td:first-child,
th:first-child {
    transform: translateX(10px);
}
td:last-child,
th:last-child {
    transform: translateX(-10px);
}
.notcurentday {
    color: #c0c4cc;
}
</style>
