DocHead.setTitle("Olin Apps");

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

HomePage = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return  {
      currentUser: Meteor.user()
    }
  },
  render () {
    const style = {
      tile: {
        // width: '100%',
        display: 'inline-block', 
        margin: '5px',
        backgroundSize: 'cover',
        WebkitBoxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)',
        MozBoxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)',
        boxShadow: '0.5px 0.5px 8px rgba(0, 0, 0, 0.1), inset 0 0 40px rgba(0, 0, 0, 0.05)'
      }
    }
    
    // images should be 460px squares
    const tilesData = [
      {
        'img': '/img/dashboard/owa.png',
        'title': 'Outlook Web App',
        'url': 'https://webmail.olin.edu/',
      },
      {
        'img': '/img/dashboard/adastra.png',
        'title': 'Ad Astra',
        'url': 'http://scheduler.olin.edu/',
      },
      {
        'img': '/img/dashboard/photos.png',
        'title': 'Olin Images',
        'url': 'http://www.flickr.com/photos/olin/',
      },
      {
        'img': '/img/dashboard/owa.png',
        'title': 'Dinner',
        'url': 'https://webmail.olin.edu/',
      },
      {
        'img': '/img/dashboard/adastra.png',
        'title': 'Midnight Snack',
        'url': 'https://webmail.olin.edu/',
      },
    ];

    const tileElements = tilesData.map(tile => 
        <div key={tile.title} style={Object.assign({backgroundImage: 'url('+tile.img+')'}, style.tile)}>
          <a href={tile.url}><img src={tile.img} style={{width: '200px', opacity: '0'}}/></a>
        </div>
    );
    
    const gridListStyle = {width: 500, height: 400, overflowY: 'auto', marginBottom: 24};

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
            <div style={{padding: '20px 0'}}>
              <h2>External Resources</h2>
                <AbsoluteGrid 
                    items={tilesData}
                    displayObject={(<GridItem />)}
                    dragEnabled={false}
                    zoom={0.7}
                    responsive={true}
                    verticalMargin={42}
                    itemWidth={200}
                    itemHeight={200}
                    />
            </div>
          }
        </div>
      </div>
    );
  }
});