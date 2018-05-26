<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>

  <h1>{{msg}}</h1>
  
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      msg: "This is my message"
    }
  },
  methods:{
    changeTitle(){
      this.msg = "Change this message"
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
