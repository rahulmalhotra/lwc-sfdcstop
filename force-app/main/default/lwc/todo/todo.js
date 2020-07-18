import { LightningElement, track } from 'lwc';

export default class Todo extends LightningElement {

    // * Array to store all the todo tasks
    @track
    todoTasks = [];

    // * Variable to store the new task that you want to add to the list
    newTask = '';

    /*
    *   This method is used to update new task variable
    *   with the value specified in the input field
    */
    updateNewTask(event) {
        this.newTask = event.target.value;
    }

    /*
    *   This method is used to add the value of new task variable
    *   to the list of todo tasks. It'll also clear the input field
    *   by clearing the value of newTask variable after it has been added to list
    */
   addTaskToList(event) {
        this.todoTasks.push({
            id: this.todoTasks.length + 1,
            name: this.newTask
        });
        this.newTask = '';
    }

    /*
    *   This method is used to delete the task from todo list
    *   based on the task id
    */
    deleteTaskFromList(event) {

        let idToDelete = event.target.name;
        let todoTasks = this.todoTasks;
        let todoItemIndex;

        /*
        *   Method 1 - Finding the index of the task to be deleted
        *   and deleting it using the below command
        */
        for (let i = 0; i < todoTasks.length; i++) {
            if(idToDelete === todoTasks[i].id) {
                todoItemIndex =  i;
            }
        }

        // * Comment the below line if you're using one of the two approaches given below
        this.todoTasks.splice(todoItemIndex, 1);

        /*
        *   Un-Comment any one of the two below methods
        *   which are used to directly splice or delete
        *   the element from the array based on the index.
        *   We're finding the index by using the findIndex()
        *   function available in JavaScript
        */

        // * Method 1
        /*
        this.todoTasks.splice(
            this.todoTasks.findIndex(
                function(todoItem) {
                    return todoItem.id == idToDelete;
                }
            ), 1
        );
        */

        // * Method 2
        /*
        this.todoTasks.splice(
            this.todoTasks.findIndex(
                todoItem => todoItem.id == idToDelete
            ), 1
        );
        */
    }
}