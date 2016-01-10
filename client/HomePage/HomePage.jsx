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
    Avatar,
    EnhancedButton,
    Paper
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
    const itemStyle = {
      height: 160,
      width: 160,
      margin: 10,
      textAlign: 'center',
      display: 'table',
    };
    const paperTextStyle = {
      display: 'table-cell',
      verticalAlign: 'middle'
    }
    return (
      <div className='container'>
        <div className='col-sm-offset-1 col-sm-10'>
          {this.data.currentUser ?
            <div style={{padding: '20px 0'}}>
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
            </div>
          :
            // <div>
            //   <h2>You are not logged in, so there is nothing to display.</h2> 
            // </div>
            <div>
              <h1>Things</h1>
              <div className='row'>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHEEEE</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHEEEE</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHEEEE</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHEEEE</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHEEEE</h2></Paper>
              </div>
              <h1>More Things</h1>
              <div className='row'>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHOAAAA</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHOAAAA</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHOAAAA</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHOAAAA</h2></Paper>
                <Paper style={itemStyle}><h2 style={paperTextStyle}>WHOAAAA</h2></Paper>
              </div>
            </div>
          }
        </div>
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
    const iconSize = 24;
    const iconStyle = {
      position: 'relative',
      boxSizing: 'border-box',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      padding: iconSize / 2,
      width: iconSize * 2,
      height: iconSize * 2,
      fontSize: 0
    };
    return (
      <div>
        <LoginDialog ref="loginDialog" />
        { this.data.currentUser ?
          <AppBar 
              iconElementLeft={
                <EnhancedButton centerRipple={true} 
                    disableFocusRipple={true} touchRippleColor="#fff" 
                    touchRippleOpacity={0.4} style={iconStyle}>
                  <SvgIcons.ActionHome color="#fff"/>
                </EnhancedButton>
              }
              // iconElementLeft={<IconButton><SvgIcons.ActionHome/></IconButton>}
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
          <AppBar 
              iconElementLeft={
                <EnhancedButton centerRipple={true} 
                    disableFocusRipple={true} touchRippleColor="#fff" 
                    touchRippleOpacity={0.4} style={iconStyle}>
                  <SvgIcons.ActionHome color="#fff"/>
                </EnhancedButton>
              }
              // iconElementLeft={<IconButton><SvgIcons.ActionHome /></IconButton>}
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
        }
      </div>
    );
  }
});