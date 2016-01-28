//  Creating a Collection for Messages:
Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {

  Meteor.subscribe("messages");

  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.guestBook.helpers({
    'messages': function() {
      return Messages.find({}, {sort: {createdOn: -1}}) || {};
    }
  });

//  Event for the GuestBook Template
  Template.guestBook.events({
    'submit form':function(event,Template){
      event.preventDefault();

      var messageBox = $(event.target).find('textarea[name=guestBookMessage]');
      var messageText = messageBox.val();

      var nameBox = $(event.target).find('input[name=guestName]');
      var name = nameBox.val();

      Messages.insert({message: messageText, name: name, createdOn: Date.now()});

      messageBox.val('');
      nameBox.val('');
      alert(messageText);
    }
  });

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

if (Meteor.isServer){
  //  This code only runs on the server
  Meteor.publish("messages", function() {
    return Messages.find();
  });
}
