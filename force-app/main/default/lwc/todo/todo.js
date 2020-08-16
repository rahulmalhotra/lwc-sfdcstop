/*
*    Author: Rahul Malhotra
*    Source: SFDC Stop (https://www.sfdcstop.com)
*    Description:- Todo List Component
*    URL:- https://github.com/rahulmalhotra/lwc-sfdcstop
*/
import { LightningElement, track, wire } from 'lwc';
import getTasks from '@salesforce/apex/ToDoListController.getTasks';
import { refreshApex } from '@salesforce/apex';
import insertTask from '@salesforce/apex/ToDoListController.insertTask';
import deleteTask from '@salesforce/apex/ToDoListController.deleteTask';

export default class Todo extends LightningElement {

    // * Array to store all the todo tasks
    @track
    todoTasks = [];

    // * Response variable used in refreshApex
    todoTasksResponse;

    // * Processing variable used for spinner
    processing = true;

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

        if(this.newTask === '') {
            return;
        }

        /*
        *   Unshift function - used to add element at the beginning of the array
        *   Uncomment this to use the unshift function and comment the below push function
        */
        /*
        this.todoTasks.unshift({
            id: this.todoTasks.length + 1,
            name: this.newTask
        });
        */

        this.processing = true;
        insertTask({ subject: this.newTask })
        .then(result => {
            console.log(result);
            // * Push function - used to add element at the end of the array
            this.todoTasks.push({
                id: this.todoTasks.length + 1,
                name: result.Subject,
                recordId: result.Id
            });
            this.newTask = '';
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => this.processing = false);
    }

    /*
    *   This method is used to delete the task from todo list
    *   based on the task id
    */
    deleteTaskFromList(event) {

        let idToDelete = event.target.name;
        let todoTasks = this.todoTasks;
        let todoTaskIndex;
        let recordIdToDelete;

        // * Set processing variable to true
        this.processing = true;

        /*
        *   Method 1 - Finding the index of the task to be deleted
        *   and deleting it using the below command
        */
        for(let i=0; i<todoTasks.length; i++) {
            if(idToDelete === todoTasks[i].id) {
                todoTaskIndex = i;
            }
        }

        recordIdToDelete = todoTasks[todoTaskIndex].recordId;

        // * Delete the task
        deleteTask({ recordId : recordIdToDelete })
        .then(result => {
            console.log(result);
            if(result) {
                // * Comment the below line if you're using one of the two approaches given below
                todoTasks.splice(todoTaskIndex, 1);
            } else {
                console.log('Unable to delete task');
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => this.processing = false);

        /*
        *   Un-Comment any one of the two below methods
        *   which are used to directly splice or delete
        *   the element from the array based on the index.
        *   We're finding the index by using the findIndex()
        *   function available in JavaScript
        */

        // * Method 2
        /*
        todoTasks.splice(
            todoTasks.findIndex(function(todoTask) {
                return todoTask.id === idToDelete;
            })
            , 1
        );
        */

        // * Method 3
        // todoTasks.splice(todoTasks.findIndex(todoTask => todoTask.id === idToDelete), 1);
    }

    /*
    *   This method is used to get the list of todo tasks
    *   from apex controller when the component is initialized
    *   and update the todoTasks js array
    */
    @wire(getTasks)
    getTodoTasks(response) {
        let data = response.data;
        let error = response.error;

        // * Saving the response to be used in refreshApex
        this.todoTasksResponse = response;

        // * Set processing to false if response is received
        if(response.data || response.error)  {
            this.processing = false;
        }
        if(data) {
            console.log('data');
            console.log(data);
            // * Setting up the todo tasks list
            this.todoTasks = [];
            data.forEach(task => {
                this.todoTasks.push({
                    id: this.todoTasks.length + 1,
                    name: task.Subject,
                    recordId: task.Id
                });
            });
        } else if(error) {
            console.log('error');
            console.log(error);
       }
    }

    /*
    *   This method is used to refresh the wire method response
    *   i.e. todoTasks in the browser cache
    */
    refreshTodoList() {
        this.processing = true;
        /*
        *   It'll refresh the data in browser cache only
        *   if there is a change on the server side
        */
        refreshApex(this.todoTasksResponse)
        .finally(() => this.processing = false);
    }
}