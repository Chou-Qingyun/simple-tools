import { Meteor} from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import './task.js';
import './body.html';

Template.body.onCreated(function bodyOnCreated(){
    this.state = new ReactiveDict();
});

Template.body.helpers({
    tasks() {
        const instance = Template.instance();
        if(instance.state.get('hideCompleted')){
            return Tasks.find({checked:{$ne: true}},{ sort: {createdAt: -1 }});
        }
        // return Tasks.find();
        // show newest tasks at the top
        return Tasks.find({}, {sort: {createdAt: -1}});
    },
    incompleteCount() {
        return Tasks.find({ checked: {$ne: true}}).count();
    }
});

Template.body.events({ 
    'submit .new-task'(event){
        //Prevent default browser form submit
        event.preventDefault();

        //get value from form element
        const target = event.target;
        const text = target.text.value;
        //insert a task into the collection
        Tasks.insert({
            text,
            createdAt: new Date(), //current time
            owner: Meteor.userId(),
            username: Meteor.user().emails[0].address,
        });
        

        //clear form
        target.text.value = '';
    },
    'change .hide-completed input'(event, instance){
        instance.state.set('hideCompleted', event.target.checked);
    },
});