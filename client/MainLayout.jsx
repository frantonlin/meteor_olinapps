// set default metadata
var metaInfo = [
  {name: "viewport", content: "width=device-width, initial-scale=1.0"},
  {charset: "utf-8"}
];
for (var i = 0; i < metaInfo.length; i++) {
    DocHead.addMeta(metaInfo[i]);
}

injectTapEventPlugin();

var {
    AppCanvas,
    AppBar,
    Styles,
    RaisedButton,
    DatePicker
    } = MUI;
var { ThemeManager, LightRawTheme } = Styles;

let {Colors} = MUI.Styles;
// var myPalette = {
//   primary1Color: Colors.pink500,
//   primary2Color: Colors.pink700,
//   primary3Color: Colors.pink100,
//   accent1Color: Colors.blueGrey500,
//   accent2Color: Colors.blueGrey700,
//   accent3Color: Colors.blueGrey100,
//   textColor: Colors.grey900,
//   alternateTextColor: Colors.white
// }
var myPalette = {
  primary1Color: Colors.blueGrey500,
  primary2Color: Colors.blueGrey700,
  primary3Color: Colors.blueGrey100,
  accent1Color: Colors.pink500,
  accent2Color: Colors.pink700,
  accent3Color: Colors.pink100,
  textColor: Colors.grey900,
  alternateTextColor: Colors.white
}
// var myFontFamily = 'Roboto, sans-serif';

myTheme = ThemeManager.getMuiTheme(LightRawTheme);
myTheme = ThemeManager.modifyRawThemePalette(myTheme, myPalette);
myTheme.appBar.color = myTheme.baseTheme.palette.accent1Color;
// myTheme = ThemeManager.modifyRawThemeFontFamily(myTheme, myFontFamily)

MainLayout = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: myTheme
    };
  },

  render() {
    return ( 
      <AppCanvas>
        {this.props.header()}
        
        {this.props.content()}

        <footer>
          Copyright yeah blah blah
        </footer>
      </AppCanvas>
    );
  }
});

// Async loading of web fonts
// Meteor.startup(function() {
//   // load fonts
//   WebFontConfig = {
//     google: { families: [ 'Roboto:400,300,100,500,700:latin' ] }
//   };
//   (function() {
//     var wf = document.createElement('script');
//     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s);
//     console.log("async fonts loaded", WebFontConfig);
//   })();
// });
