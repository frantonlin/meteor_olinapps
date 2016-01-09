injectTapEventPlugin();

var {
    Styles,
    RaisedButton,
    FlatButton,
    Dialog,
    TextField,
    Checkbox,
    RefreshIndicator
    } = MUI;
// let ThemeManager = Styles.ThemeManager;
// var { ThemeManager} = Styles;
// myTheme = this.context.muiTheme;

LoginDialog = React.createClass({
  getInitialState() {
    return {
      open: false,
      passwordErrorText: "",
      loading: false
    }
  },
  contextTypes: {
    muiTheme: React.PropTypes.object
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
    if (this.state.loading) {
      this.setState({loading: false});
    } else {
      this.setState(this.getInitialState());
    }
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
      // // ATTEMPT LOGIN
      // var LoginDialog = this;
      // Accounts.callLoginMethod({
      //   methodArguments: [
      //   {
      //     username: username,
      //     password: password,
      //   }],
      //   validateResult: function (result) {
      //     //Custom validation of login on client side can go here
      //     // console.log(result);
      //   },
      //   userCallback: function(error) {
      //     if (error) {
      //       console.log(error);
      //     }
          
      //     // if no errors, we're done!
      //     LoginDialog.handleClose();
      //   }
      // });
      this.setState({loading: true});
      // this.handleClose();
    }
  },
  
  render () {
    const loadingSize = 60;
    let palette = this.context.muiTheme.baseTheme.palette;
    
    console.log(this.state.loading);
    
    const style = {
      dialog: {
        width: '360px'
      },
      loading: {
        backgroundColor: "rgba(0,0,0,0.1)",
        borderRadius: "0",
        boxShadow: "none",
        zIndex: this.state.loading ? "99":"0",
        width: "100%",
        height: "100%",
        padding: (224/2-loadingSize/2+loadingSize/10)+"px "+
            (360/2-loadingSize/2+loadingSize/10)+"px",
        transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms"
      },
      cancelButton : {
        width: '49%',
        float: 'left',
        zIndex: '100'
      },
      loginButton: {
        width: '49%',
        float: 'right'
      },
      checkbox : {
        margin: '10px 0 20px 0'
      }
    }
    
    return (
      <Dialog
          // title="Dialog With Actions"
          // actions={actions}
          modal={false}
          contentStyle={style.dialog}
          open={this.state.open}
          onRequestClose={this.handleClose}>
        <RefreshIndicator
            size={loadingSize}
            left={0}
            top={0}
            loadingColor={palette.accent1Color}
            status={this.state.loading ? "loading":"hide"}
            style={style.loading}/>
        <form className="login-form" onSubmit={this.handleLogin}>
          <Username ref="username" disabled={this.state.loading} />
          <TextField name="password" ref="password"
              type="password" hintText="password"
              disabled={this.state.loading} 
              errorText={this.state.passwordErrorText} 
              onChange={this._handlePasswordChange} fullWidth={true} />
          <Checkbox name="remember" ref="remember"
              label="remember me" disabled={this.state.loading} 
              style={style.checkbox} />
          <FlatButton label="Cancel" onTouchTap={this.handleClose} 
              style={style.cancelButton} />
          <RaisedButton label="Login" type="submit"
              primary={true} disabled={this.state.loading}
              style={style.loginButton} />
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
  componentDidMount() {
    this.focus();
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
          disabled={this.props.disabled}
          errorText={this.state.usernameErrorText} 
          onChange={this._handleUsernameChange} fullWidth={true} />
    );
  }
});