Navbar = React.createClass({

  mixins: [ReactMeteorData],

  // Loads relevant data to this.data.*
  getMeteorData() {
    // let query = {};

    // if (this.state.hideCompleted) {
    //   // If hide completed is checked, filter tasks
    //   query = {checked: {$ne: true}};
    // }
    // return {
    //   tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
    //   incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
    //   currentUser: Meteor.user()
    // };

    return  {
      currentUser: Meteor.user()
    }
  },

  showLoginModal() {
    MaterializeModal.form({
      title: null,
      bodyTemplate: "login-form",
      footerTemplate: "login-footer",
      callback: function(error, response) {
        if (response.submit) {
          // Iterate over form results & display.
          // for (var field in response.form) {
          //   Materialize.toast(field + ": " + response.form[field], 5000, "green");
          // }
          // Meteor.call("networkLogin", "MILKYWAY", response.form["username"], response.form["password"]);
          // ATTEMPT LOGIN
          Accounts.callLoginMethod({
            methodArguments: [
            {
              username: response.form["username"],
              password: response.form["password"],
            }],
            validateResult: function (result) {
              //Custom validation of login on client side can go here
            },
            userCallback: function(error) {
              if (error) {
                Materialize.toast(error, 5000, "red");
              }
              //Login happened in pop-up. Close the window after success.
              // close();
            }
          });
        } else {
          // Materialize.toast("Cancelled by user!", 5000, "red");
        }
      }
    });
    // FOCUSING IS HARD
    // React.findDOMNode(this.refs.username).focus();
    // this.refs.username.focus();
    // $("#username").focus();
  },

  render() {
    return (
      <div className="nav-wrapper container">
        <a id="logo-container" href="/" className="brand-logo">Olin<span className="emph">Apps</span></a>

        { this.data.currentUser ?
          <ul className="right hide-on-med-and-down">
            <li><a href="" onClick="">{this.data.currentUser.profile.name}</a></li>
            <li><a href="" onClick={Meteor.logout}>Logout</a></li>
          </ul>
          // <ul className="right hide-on-med-and-down">
          //   <li><a href="" onClick={this.showLoginModal}>{this.data.currentUser.username}</a></li>
          // </ul>
        :
          <ul className="right hide-on-med-and-down">
            <li><a href="" onClick={this.showLoginModal}>Login</a></li>
          </ul>
        }

        <ul id="nav-mobile" className="side-nav">
          <li><a href="#">Login</a></li>
        </ul>
        <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
      </div>
    )
  }
});