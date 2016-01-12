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
    const { name, img, url } = this.props.item;
    
    const style = {
      item: {
        display: 'block', 
        width: '100%',
        height: '100%',
        backgroundSize: '100%',
        // WebkitBoxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)',
        // MozBoxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)',
        boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.05)'
      },
      name: {
        display:'block',
        bottom:'-14px',
        width:'100%',
        fontSize:'14px',
        position:'absolute',
        color:'#555',
        textTransform:'capitalize',
        textAlign: 'center'
      }
    }
    
    // const itemStyle = {
    //   display: 'block',
    //   width: '100%',
    //   height: '100%',
    //   // backgroundImage: `url('${this.props.item.img}')`,
    //   backgroundSize: '100%',
    //   // boxShadow: '0 0 1.25em 0 rgba(0,0,0,.2)',
    //   // backgroundColor:'#fff'
    // };

    return (
      <a href={url}>
        <div className="gridItem" style={Object.assign({backgroundImage: 'url('+img+')'}, style.item)}>
          <span style={style.name}>{name}</span>
        </div>
      </a>
    );
    
    // return <div
    //         style={itemStyle}
    //         className="gridItem"><span className="name">{this.props.item.name}</span></div>;
  }
});