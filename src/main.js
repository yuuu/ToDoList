// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = "todos-vuejs-demo";
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    todos.forEach(function(todo, index) {
      todo.id = index;
    });
    todoStorage.uid = todos.length;
    return todos;
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }
};

new Vue({
  el: "#app",
  data: {
    // 使用するデータ
    todos: []
  },
  methods: {
    // 使用するメソッド
    doAdd: function(event, value) {
      var comment = this.$refs.comment;
      if (!comment.value.length) {
        return;
      }
      this.todos.push({
        id: todoStorage.uid++,
        comment: comment.value,
        state: 0
      });
      comment.value = "";
    },
    doChangeState: function(item) {
      item.state = item.state ? 0 : 1;
    },
    doRemove: function(item) {
      var index = this.todos.indexOf(item);
      this.todos.splice(index, 1);
    }
  },
  watch: {
    todos: {
      handler: function(todos) {
        todoStorage.save(todos);
      },
      deep: true
    }
  },
  created: function() {
    this.todos = todoStorage.fetch();
  }
});
