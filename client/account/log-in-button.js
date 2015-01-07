	Template.logInButton.events({
    'click #login-btn': function (event, template) {
      event.preventDefault();
      Router.go('/sign-in');
    }
});