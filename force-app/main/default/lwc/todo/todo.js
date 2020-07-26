import { LightningElement, track } from 'lwc';

export default class Todo extends LightningElement {

    @track
    todoTasks = [];

    newTask = '';

    updateNewTask(event) {
        this.newTask = event.target.value;
    }

    addTaskToList(event) {
        // * Unshift function - used to add element at the beginning of the array
        /*
        *   Uncomment this to use the unshift function and comment the below push function
        this.todoTasks.unshift({
            id: this.todoTasks.length + 1,
            name: this.newTask
        });
        */
        // * Push function - used to add element at the end of the array
        this.todoTasks.push({
            id: this.todoTasks.length + 1,
            name: this.newTask
        });
        this.newTask = '';
    }

}