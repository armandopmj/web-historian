var app;
$(function() {
  app = {
    //Set default values
    server: 'http://localhost:8080/',

    init: function() {
      // Cache jQuery selectors
      app.$getButton = $('#getButton');
      app.$postButton = $('#postButton');

      // Add listeners
      app.$getButton.on('submit', app.fetch());
      app.$postButton.on('submit', app.send());
    },
    send: function(data) {
      // Clear messages input
      // app.$message.val('');

      console.log("send triggerd");
      // POST the message to the server
      $.ajax({
        url: app.server,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (data) {
          console.log('url sent');
          // COME BACK TO THIS
          //app.fetch();
        },
        error: function (data) {
          console.error('url faild to send');
        }
      });
    },
    fetch: function(animate) {
      console.log("fetch triggerd");

      $.ajax({
        url: app.server,
        type: 'GET',
        contentType: 'application/json',
        // data: { order: '-createdAt'},
        success: function(data) {
          console.log('url fetched');

          var data = JSON.parse( data );
          console.log( data );
          // Don't bother if we have nothing to work with
          if (!data.results || !data.results.length) { return; }

          // NEED TO HANDEL DATA
        },
        error: function(data) {
          console.error('Failed to fetch url');
        }
      });
    },
    clearMessages: function() {
      app.$chats.html('');
    },
    populateMessages: function(results, animate) {
      // Clear existing messages
      app.clearMessages();
      app.stopSpinner();
      if (Array.isArray(results)) {
        // Add all fetched messages
        results.forEach(app.addMessage);
      }

      // Make it scroll to the bottom
      var scrollTop = app.$chats.prop('scrollHeight');
      if (animate) {
        app.$chats.animate({
          scrollTop: scrollTop
        });
      }
      else {
        app.$chats.scrollTop(scrollTop);
      }
    },

    handleSubmit: function(evt) {
      var message = {
        username: app.username,
        text: app.$message.val(),
        roomname: app.roomname || 'lobby'
      };

      app.send(message);

      // Stop the form from submitting
      evt.preventDefault();
    }
  };
}());

