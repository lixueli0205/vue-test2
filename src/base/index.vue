<template>
  <div>
    <div>{{ message }}</div>
    <div v-bind:title="message2">鼠标悬停查看动态绑定的信息！</div>
    <div v-if="seen">现在你看到我了</div>
    <ol>
      <li v-for="todo in todos" v-bind:key="todo.text">{{todo.text}}</li>
    </ol>
    <button v-on:click="reverseMessage">反转消息</button>
    <input type="text" v-model="message" />
    <ol>
      <todo-item v-for="item in todos" v-bind:key="item.text" v-bind:todo="item"></todo-item>
    </ol>
  </div>
</template>
<script>
import Vue from 'vue';
// import Vue from "../../node_modules/vue/dist/vue.js";
Vue.component("todo-item", {
  props: ["todo"],
  template: "<li>{{todo.text}}</li>"
});

export default {
  data() {
    return {
      message: "Hello Vue!",
      message2: "页面加载于" + new Date().toLocaleString(),
      seen: true,
      todos: [{ text: "语文" }, { text: "数学" }, { text: "英语" }]
    };
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split("")
        .reverse()
        .join("");
    }
  }
};
</script>
<style lang="stylus" scoped></style>
