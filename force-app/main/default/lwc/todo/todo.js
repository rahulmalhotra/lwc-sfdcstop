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
        // * Push function - used to add element at the end of the array
        this.todoTasks.push({
            id: this.todoTasks.length + 1,
            name: this.newTask
        });
        this.newTask = '';
    }

}