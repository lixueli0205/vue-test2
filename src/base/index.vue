<template>
  <div>
    <div>{{ message }}</div>
    <div v-once>不会改变数据：{{ message }}</div>
    <div v-bind:title="message2">鼠标悬停查看动态绑定的信息！</div>
    <div v-if="seen">现在你看到我了</div>
    <ol>
      <li v-for="todo in todos" v-bind:key="todo.text">{{todo.text}}</li>
    </ol>
    <button v-on:click="reverseMessage">反转消息</button>
    <input type="text" v-model="message" />
    <div>使用双大括号：{{rawHtml}}</div>
    <div>
      使用v-html指令：
      <span v-html="rawHtml"></span>
    </div>
    <div v-bind:id="dynamicId">Id</div>
    <button v-bind:disabled="isButtonDisabled">按钮</button>
    <div v-bind:[attributeName]="attributeValue">动态参数</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: "Hello Vue!",
      message2: "页面加载于" + new Date().toLocaleString(),
      seen: true,
      todos: [{ text: "语文" }, { text: "数学" }, { text: "英语" }],
      rawHtml: '<span style="color:red">这是红色的</span>',
      dynamicId: "testid",
      isButtonDisabled: true,
      attributeName: "class",
      attributeValue: "attribute-class"
    };
  },
  methods: {
    reverseMessage() {
      this.message = this.message
        .split("")
        .reverse()
        .join("");
    }
  },
  created: function() {
    console.log("创建实例", this.message);
  }
};
</script>
<style lang="stylus" scoped>
.attribute-class {
  color: green;
}
</style>
