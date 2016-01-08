injectTapEventPlugin();

var {
    Styles,
    RaisedButton,
    FlatButton,
    Dialog,
    TextField,
    Checkbox
    } = MUI;
var { ThemeManager, LightRawTheme } = Styles;

LoginDialog = React.createClass({
  getInitialState() {
    return {
      open: false,
      passwordErrorText: "",
      remember: false
    }
  },
  _handlePasswordChange(e) {
    if (e.target.value == "") {
      this.setPasswordError();
    } else {
      this.setState({passwordErrorText: ""});
    }
  },
  setPasswordError() {
    this.setState({passwordErrorText: "enter a password"});
  },
  setUsernameError() {
    this.refs.username.setUsernameError();
  },
  handleOpen() {
    this.setState({open: true});
  },
  handleClose() {
    this.setState(this.getInitialState());
  }, 
  handleLogin(e) {
    e.preventDefault();
    
    var username = this.refs.username.getValue();
    var password = this.refs.password.getValue();
    var remember = this.refs.remember.isChecked();
    
    console.log("username: %s,   password: %s,   remember: %s", username, password, remember.toString());
    
    var validated = true;
    if (password == "") {
      this.setPasswordError();
      this.refs.password.focus();
      validated = false;
    }
    if (username == "" || !/^[a-zA-Z0-9]+$/.test(e.target.value)) {
      this.setUsernameError();
      this.refs.username.focus();
      validated = false;
    }
    
    if (validated) {
      // ATTEMPT LOGIN
      var LoginDialog = this;
      Accounts.callLoginMethod({
        methodArguments: [
        {
          username: username,
          password: password,
        }],
        validateResult: function (result) {
          //Custom validation of login on client side can go here
          console.log(result);
        },
        userCallback: function(error) {
          if (error) {
            console.log(error);
          }
          
          // if no errors, we're done!
          // console.log(this.LoginDialog.prototype);
          console.log(this);
          LoginDialog.handleClose();
        }
      });
      // this.handleClose();
    }
  },
  
  render () {
    const dialogStyle = {
      width: '360px'
    };
    const leftButtonStyle = {
      width: '49%',
      float: 'left'
    };
    const rightButtonStyle = {
      width: '49%',
      float: 'right'
    };
    const checkboxStyle = {
      margin: '10px 0 20px 0'
    };
    
    return (
      <Dialog
        // title="Dialog With Actions"
        // actions={actions}
        modal={false}
        contentStyle={dialogStyle}
        open={this.state.open}
        onRequestClose={this.handleClose}>
        <form className="login-form" onSubmit={this.handleLogin}>
          <Username ref="username"/>
          <TextField name="password" ref="password"
              type="password" hintText="password" 
              errorText={this.state.passwordErrorText} 
              onChange={this._handlePasswordChange} fullWidth={true} />
          <Checkbox name="remember" ref="remember"
              label="remember me" style={checkboxStyle} />
          <FlatButton label="Cancel" onTouchTap={this.handleClose} 
              style={leftButtonStyle} />
          <RaisedButton label="Login" type="submit"
              primary={true} style={rightButtonStyle} />
        </form>
      </Dialog>
    );
  }
});

// username component for focusing on mount
Username = React.createClass ({
  getInitialState() {
    return {
      usernameErrorText: ""
    }
  },
  _handleUsernameChange(e) {
    if (e.target.value == "" || !/^[a-zA-Z0-9]+$/.test(e.target.value)) {
      this.setUsernameError();
    } else {
      this.setState({usernameErrorText: ""});
    }
  },
  setUsernameError() {
    this.setState({usernameErrorText: "enter a valid username"});
  },
  componentDidMount() {
    this.focus();
  },
  getValue() {
    return this.refs.username.getValue();
  },
  focus() {
    this.refs.username.focus();
  },
  render () { 
    return (
      <TextField name="username" ref="username"
          type="text" hintText="username" 
          errorText={this.state.usernameErrorText} 
          onChange={this._handleUsernameChange} fullWidth={true} />
    );
  }
});