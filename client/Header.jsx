injectTapEventPlugin();

var {
    AppBar,
    IconButton,
    FlatButton,
    EnhancedButton,
    } = MUI;

let {SvgIcons} = MUI.Libs;

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
    const iconSize = 24;
    const style = {
      icon: {
        position: 'relative',
        boxSizing: 'border-box',
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        padding: iconSize / 2,
        width: iconSize * 2,
        height: iconSize * 2,
        fontSize: 0
      },
      buttonContainer: {
        display: 'block',
        paddingTop: '5px'
      },
      button: {
        color: 'white',
        margin: '0 5px'
      }
    };
    return (
      <div>
        <LoginDialog ref="loginDialog" />
        { this.data.currentUser ?
          <AppBar 
              iconElementLeft={
                <EnhancedButton centerRipple={true} 
                    disableFocusRipple={true} touchRippleColor="white" 
                    touchRippleOpacity={0.4} style={style.icon}>
                  <SvgIcons.ActionHome color="white"/>
                </EnhancedButton>
              }
              // iconElementLeft={<IconButton><SvgIcons.ActionHome/></IconButton>}
              title={<span className="brand-logo">Olin<span className="emph">Apps</span></span>} 
              iconElementRight={
                <span style={style.buttonContainer}>
                <FlatButton label={this.data.currentUser.profile.name}
                    hoverColor="rgba(255,255,255,0.42)" style={style.button}
                    rippleColor="rgba(255,255,255,0.58)" />
                <FlatButton label="Logout" style={style.button}
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
                    disableFocusRipple={true} touchRippleColor="white" 
                    touchRippleOpacity={0.4} style={style.icon}>
                  <SvgIcons.ActionHome color="white"/>
                </EnhancedButton>
              }
              // iconElementLeft={<IconButton><SvgIcons.ActionHome /></IconButton>}
              title={<span className="brand-logo">Olin<span className="emph">Apps</span></span>}
              iconElementRight={
                <span style={style.buttonContainer}>
                  <FlatButton label="Login" style={style.button}
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