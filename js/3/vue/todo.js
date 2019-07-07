new Vue({
    el: '#app',
    data: {
        todos: [],
        input: ''
    },
    created() {
      try {
        this.todos = JSON.parse(localStorage.getItem('todos'))
      } catch(err) {
        // just dont load todos
        console.log(err);
      }
    },
    methods: {
      add(evt) {
        if(this.input) {
          this.todos.push({text: this.input, done: false})
          this.save()
        }

        evt.preventDefault()
      },
      mark(index) {
        let todo = this.todos[index];
        if(todo) {
          todo.done = !todo.done
          this.save()
        }
      },
      remove(index) {
        this.todos.splice(index, 1)
        this.save()
      },
      save() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
      }
    }
})
