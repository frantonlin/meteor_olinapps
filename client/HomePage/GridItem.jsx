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
    // const { title, img, url } = this.props;
    
    const style = {
      // width: '100%',
      display: 'block', 
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      WebkitBoxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)',
      MozBoxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)',
      boxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)'
    }
    
    const gridListStyle = {width: 500, height: 400, overflowY: 'auto', marginBottom: 24};

    return (
      <div key={this.props.item.title} style={Object.assign({backgroundImage: 'url('+this.props.item.img+')'}, style)}>
        <a href={this.props.item.url}><img src={this.props.item.img} style={{width: '200px', opacity: '0'}}/></a>
      </div>
    );
  }
});