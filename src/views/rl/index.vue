<!--
 * @Description: 
 * @Author: zouxm
 * @Date: 2021-05-07 15:18:44
 * @LastEditTime: 2021-05-10 14:02:31
 * @LastEditors: zouxm
-->
<template>
    <div>
        <div class="toptime">
            <span class="t_btn t_left_btn" @click.stop="preDate">
                <svg-icon icon-class="arrow-left" class="icon" />
            </span>
            <span class="t_txt" @click.stop="selectDate">{{ curTimeTxt }}</span>
            <span class="t_btn t_right_btn" @click.stop="nextDate">
                <svg-icon icon-class="arrow-right" class="icon" />
            </span>
        </div>
        <calendar class="use-calendar" v-show="showCalendar" :curTimeTxt.sync="curTimeTxt" :showCalendar.sync="showCalendar" :model="'day'" ref="calendar"></calendar>
    </div>
</template>
<script>
import calendar from './calendar'
export default {
    components: { calendar },
    data() {
        return {
            curTimeTxt: '',
            showCalendar: false
        }
    },
    computed: {},
    mounted() {
        this.$nextTick(() => {
            document.getElementById('calendar').onblur = () => {
                this.showCalendar = false
            }
        })
    },
    methods: {
        preDate() {
            this.$refs.calendar.preDate()
        },
        nextDate() {
            this.$refs.calendar.nextDate()
        },
        selectDate() {
            this.showCalendar = true
            this.$nextTick(() => {
                document.getElementById('calendar').focus()
            })
        }
    }
}
</script>
<style scoped>
* {
    box-sizing: border-box;
}

.toptime {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    display: -webkit-flex;
    height: 1.30667rem;
    background: #fff;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    position: relative;
}
.toptime .t_left_btn {
    text-align: center;
}

.toptime .t_btn {
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 0 0.26667rem;
}
.toptime .t_txt {
    width: 4.8rem;
    font-size: 0.42667rem;
    text-align: center;
    color: #404040;
    height: 0.8rem;
    line-height: 0.93333rem;
    display: inline-block;
    font-size: 0.37333rem;
}
.toptime .t_btn {
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    padding: 0 0.26667rem;
}
.use-calendar {
    position: fixed;
    top: 0;
}
</style>
