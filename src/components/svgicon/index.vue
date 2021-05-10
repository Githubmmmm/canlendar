<!--
 * @Description: 
 * @Author: shufei
 * @Date: 2020-12-28 12:38:24
 * @LastEditTime: 2020-12-30 14:55:21
 * @LastEditors: shufei
-->
<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script>
export default {
    name: 'svgIcon',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'svg-icon ' + this.className
            } else {
                return 'svg-icon'
            }
        }
    }
}
</script>

<style scoped>
.svg-icon {
    pointer-events: none;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
