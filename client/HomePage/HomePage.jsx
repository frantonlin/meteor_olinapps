DocHead.setTitle("Olin Apps");

injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    DatePicker,
    IconButton,
    FlatButton,
    Card,
    CardHeader,
    Avatar
    } = MUI;
// var { ThemeManager, LightRawTheme } = Styles;

let {SvgIcons} = MUI.Libs;

HomePage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return  {
      currentUser: Meteor.user()
    }
  },
  render () {
    return (
      <div style={{padding: '80px',}}>
        {this.data.currentUser ?
          <Card>
            <CardHeader
                title={this.data.currentUser.profile.name}
                subtitle={this.data.currentUser.profile.department+", "+this.data.currentUser.profile.jobtitle}
                avatar={<Avatar style={{color: 'teal'}}>{this.data.currentUser.profile.name.charAt(0)}</Avatar>}/>
            <ul>
              <li>_id: {this.data.currentUser._id}</li>
              <li>username: {this.data.currentUser.username}</li>
              <li>email: {this.data.currentUser.emails[0].email}</li>
              <li>profile:</li>
              <ul>
                <li>name: {this.data.currentUser.profile.name}</li>
                <li>department: {this.data.currentUser.profile.department}</li>
                <li>jobtitle: {this.data.currentUser.profile.jobtitle}</li>
              </ul>
            </ul>
          </Card>
        :
          <div>
            <h2>You are not logged in so there is nothing to display</h2>
          </div>
        }
      </div>
    );
  }
});

Header = React.createClass({
  mixins: [ReactMeteorData],
  
  getMeteorData() {
    return  {
      currentUser: Meteor.user()
    }
  },
  openLoginDialog() {
    this.refs.loginDialog.handleOpen();
  },
  handleLogout() {
    Meteor.logout(function(err) {
      if(err) {
        console.log(err);
      }
    });
  },
  
  render () {
    const buttonStyle = {
      color: 'white',
      margin: '0 5px'
    };
    return (
      <div>
        { this.data.currentUser ?
          <AppBar 
              iconElementLeft={<IconButton><SvgIcons.ActionHome /></IconButton>}
              title={<span className="brand-logo">Olin<span className="emph">Apps</span></span>} 
              iconElementRight={
                <span className="header-buttons">
                <FlatButton label={this.data.currentUser.profile.name}
                    hoverColor="rgba(255,255,255,0.42)" style={buttonStyle}
                    rippleColor="rgba(255,255,255,0.58)" />
                <FlatButton label="Logout" style={buttonStyle}
                    hoverColor="rgba(255,255,255,0.42)"
                    rippleColor="rgba(255,255,255,0.58)"
                    onTouchTap={this.handleLogout} />
                </span>
              } 
          /> 
        :
          <div>
            <LoginDialog ref="loginDialog" />
            <AppBar 
                iconElementLeft={<IconButton><SvgIcons.ActionHome /></IconButton>}
                title={<span className="brand-logo">Olin<span className="emph">Apps</span></span>}
                iconElementRight={
                  <span className="header-buttons">
                    <FlatButton label="Login" style={buttonStyle}
                        hoverColor="rgba(255,255,255,0.42)"
                        rippleColor="rgba(255,255,255,0.58)"
                        onTouchTap={this.openLoginDialog} />
                    
                  </span>
                }
            />
          </div>
        }
      </div>
    );
  }
});