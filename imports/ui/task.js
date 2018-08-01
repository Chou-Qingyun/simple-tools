import {Template} from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import './task.html';

Template.task.events({ 
    'click .toggle-checked'() {
        //set the checked property to the opposite of its current value
        Tasks.update(this._id, {
            $set: {checked: ! this.checked },
        });
    },
    'click .delete'() {
        Tasks.remove({_id: this._id});
    },
    'click .text'() {
        Tasks.update(this._id,{
            $set: {text: '修改了'} 
        });
    },
});