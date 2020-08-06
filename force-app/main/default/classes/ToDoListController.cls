/*
*	Author:- Rahul Malhotra
*	Description:- This apex class is used as a controller for our Todo List Application
*	Created:- 06/08/2020
*	Last Updated:- 06/08/2020
*	Code Origin:- SFDCStop (https://www.sfdcstop.com/)
*	Tutorial:- Salesforce Lightning Web Component Tutorial Series
*/
public with sharing class ToDoListController {

    /*
    *	Author:- Rahul Malhotra
    *	Description:- This method is used to return a list of tasks
    */
    @AuraEnabled(cacheable=true)
    public static List<Task> getTasks() {
        return [SELECT Subject FROM Task WHERE OwnerId =:UserInfo.getUserId()];
    }
}
