injectTapEventPlugin();

var {
    Card,
    CardHeader,
    Avatar,
    CardTitle,
    IconButton,
    GridList,
    GridTile
    } = MUI;

let {SvgIcons} = MUI.Libs;

GridItem = React.createClass({
  render () {
    const { name, img, url, networkLock } = this.props.item;
    
    const style = {
      item: {
        display: 'block', 
        width: '100%',
        height: '100%',
        backgroundSize: '100%',
        WebkitBoxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.05)',
        MozBoxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.05)',
        boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.05)'
      },
      vpnLock: {
        position: 'absolute', 
        left: '2px', 
        top: '2px', 
        width: '18px', 
        height: '18px'
      },
      name: {
        display:'inline-block',
        verticalAlign: 'middle',
        width:'100%',
        fontSize:'14px',
        color:'#555',
        textTransform:'capitalize',
        textAlign: 'center',
        lineHeight: 'normal'
      }
    }

    return (
      <a href={url}>
        <div style={Object.assign({backgroundImage: 'url('+img+')'}, style.item)}>
          {networkLock ?
            <SvgIcons.NotificationVpnLock color='rgba(0,0,0,0.2)' style={style.vpnLock}/>
          :
            null
          }
        </div>
        <div style={{height: '2em', lineHeight: '2em'}}>
          <span style={style.name}>{name}</span>
        </div>
      </a>
    );
  }
});