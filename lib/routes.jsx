// FlowRouter.route( '/', {
//  name: 'home',
//  action: function() {
//   console.log( "Okay, we're on the Index page!" );
//   ReactLayout.render(MainLayout, {
//       content() {
//         return <HomePage />;
//       }
//     });
//  }
// });

FlowRouter.route('/', {
  name: 'launchpad',
  action: function(params) {
    /* The key 'content' is now a function */
    ReactLayout.render(MainLayout, {
      header() {
        return <Header />;
      },
      content() {
        return <Launchpad />;
      }
    });
  }
});