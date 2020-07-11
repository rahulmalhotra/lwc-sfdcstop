import { LightningElement } from 'lwc';

export default class MyFirstLWC extends LightningElement {

    name = '';

    updateName(event) {
        this.name = event.target.value;
    }
}