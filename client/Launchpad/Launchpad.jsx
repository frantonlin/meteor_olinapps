DocHead.setTitle("Olin Apps");

injectTapEventPlugin();

var {
    Card,
    CardHeader,
    Avatar,
    CardTitle,
    IconButton,
    GridList,
    GridTile,
    Paper
    } = MUI;

let {SvgIcons} = MUI.Libs;

Launchpad = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return  {
      currentUser: Meteor.user()
    }
  },
  
  getInitialState() {
    for (var groupIndex in LaunchpadData) {
      for (var itemIndex in LaunchpadData[groupIndex].items) {
        var item = LaunchpadData[groupIndex].items[itemIndex];
        item.sort = itemIndex;
        item.key = itemIndex;
        if (!item.img) {
          var colors = ['amber', 'green', 'indigo', 'red'];
          item.img = '/img/geofont/' + colors[Math.floor((Math.random() * 4))] + 
              '/' + item.name.charAt(0).toUpperCase() + '.png';
        }
      }
    }
    return {
      fixSearch: false
    };
  },
  
  componentDidMount() {
    // console.log(LaunchpadData);
    window.addEventListener('scroll', this.onScroll);
  },

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },
  
  onScroll(e) {
    if (!this.state.fixSearch && event.srcElement.body.scrollTop >= 64) {
      this.setState({fixSearch: true});
    } else if (this.state.fixSearch && event.srcElement.body.scrollTop < 64) {
      this.setState({fixSearch: false});
    }
  },
  
  onFilter(event){
    // filter for results by ANDing the keywords together
    // ^(?=.*\bWORD)(?=.*\bWORD).*$
    
    // replace extra whitespace with single space and strip leading space
    var keywords = event.target.value.replace(/\s+/g,' ').replace(/^\s+/,'').split(' ');
    
    // not empty string or just spaces, so filter
    if (keywords[0] !== "") {
      var regex = '^';
      for (var i = 0; i < keywords.length-1; i++) {
        // force text followed by space to match whole words
        regex += '(?=.*\\b' + keywords[i] + '\\b)';
      }
      // last text (not followed by space) can be incomplete word
      regex += '(?=.*\\b' + keywords[keywords.length-1] + ').*$';
      // console.log(keywords + ' | ' + regex);
    
      var search = new RegExp(regex, 'i');
      for (var groupIndex in LaunchpadData) {
        for (var itemIndex in LaunchpadData[groupIndex].items) {
          var item = LaunchpadData[groupIndex].items[itemIndex];
          item.filtered = !item.keywords.match(search);
        }
      }
      this.forceUpdate();
    } else { // emptry string or just spaces, so show all
      for (var groupIndex in LaunchpadData) {
        for (var itemIndex in LaunchpadData[groupIndex].items) {
          var item = LaunchpadData[groupIndex].items[itemIndex];
          item.filtered = false;
        }
      }
      this.forceUpdate();
    }
  },
  
  handleSearch(e) {
    e.preventDefault();
    this.refs.search.blur();
  },
  
  render () {
    const style = {
      searchPaper: {
        padding: '5px 20px',
        width: '100%',
        top: '0',
        position: this.state.fixSearch ? 'fixed':'relative',
        zIndex: '100'
      },
      searchInput: {
        color: '#434343',
        fontSize: '16px',
        backgroundColor: 'transparent',
        border: '0',
        outline: 'none',
        width: '100%',
        // lineHeight: '2em',
        padding: '8px 0',
        WebkitAppearance: 'none'
      },
      launchpadContainer: {
        padding: (this.state.fixSearch ? '54':'10') + 'px 20px 10px 20px',
      }
    }
    
    const launchpad = LaunchpadData.map(group => 
      <div key={group.title} style={{paddingBottom: '30px'}}>
        <h3 style={group.isFirst ? {paddingTop: '0', border:'none'}:{}}>{group.title}</h3>
        <AbsoluteGrid 
            items={group.items}
            displayObject={(<GridItem />)}
            dragEnabled={false}
            zoom={1}
            responsive={true}
            verticalMargin={42}
            itemWidth={128}
            itemHeight={128}
            />
      </div>
    );

    return (
      <div>
        <div>
          <Paper zDepth={1} style={style.searchPaper}>
            <SvgIcons.ActionSearch opacity='0.5' style={{marginTop: '7px', float: 'left'}}/>
            <form onSubmit={this.handleSearch} style={{overflow: 'auto', display: 'block', padding: '0 12px'}}>
              <input placeholder='Search' type='search' 
                  onChange={this.onFilter}
                  ref='search' style={style.searchInput} />
            </form>
          </Paper>
          <div style={style.launchpadContainer}>
            {launchpad}
          </div>
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
            null
          }
        </div>
      </div>
    );
  }
});