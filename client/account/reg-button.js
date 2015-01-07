Template.regButton.events({
    'click #reg-btn': function (event, template) {
      event.preventDefault();
      Router.go('/enter-tel');
    }
});