import Vue from 'vue';
// import App from './app.vue';
// import './assets/styles/global.styl';
import App2 from './app2.vue';
import './assets/styles/index.styl';

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App2)
}).$mount(root)
console.log("Hello World from your main file11!");
