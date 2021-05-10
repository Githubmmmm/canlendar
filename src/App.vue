<!--
 * @Description: 
 * @Author: zouxm
 * @Date: 2021-05-10 10:48:32
 * @LastEditTime: 2021-05-10 11:16:42
 * @LastEditors: zouxm
-->
<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
* {
    padding: 0;
    margin: 0;
    list-style: none;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: 0.4rem;
    color: #404040;
}

#nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
html {
    font-size: 41.4px;
}
body {
    font-size: 12px;
}
</style>
