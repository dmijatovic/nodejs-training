
import { Vue } from 'vue';

Vue.component('app-header',{
  template:`
    <h1>{{title}}</h1>    
  `,
  props:{
    title:'This is title' 
  }
});