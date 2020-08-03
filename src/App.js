import React, { Component } from 'react';
import reactLogo from './logo.svg';
import phLogo from './producthunt.svg';
import { PhResults } from './PhResults';
import { FiltersMenu } from './FiltersMenu';
import { sortByFilterType } from './Utils';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Grid, Loader, Segment } from 'semantic-ui-react';


export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      products: null,
      filtered: null,
      searching: true,
      searchString: '',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const accessToken = 'a5d29aef6aa58697eb97035653a259a12ea59f998afccf30062d4571eb909735'
    const fetchUrl = 'https://api.producthunt.com/v1/posts/all?access_token='+accessToken;
    fetch(fetchUrl)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        this.setState({
          products: data.posts,
          searching: false
        });
      });
   
  }

  getFilteredResults(data){
    let searchString = data.searchString;
    let filteredPosts = [];
    if(searchString !== '') {
      for(let post of this.state.products) {
        if(post.name.toLowerCase().includes(searchString.toLowerCase()) || post.tagline.toLowerCase().includes(searchString.toLowerCase())){
          filteredPosts.push(post);
        }
      }
      if(filteredPosts.length) {
        if(data.filter !== 'none') {
          filteredPosts.sort(sortByFilterType(data.filter,data.order));
        }
      } 
    } else if(data.filter !== 'none') {
      filteredPosts = this.state.products.slice();
      filteredPosts.sort(sortByFilterType(data.filter,data.order));
    } else {
      filteredPosts = null;
    }
    this.setState({filtered: filteredPosts, searching: false});
  }

  handleChange(data){
    if(data.searchString !== '') { //just to avoid unnecesary setState calls
      this.setState({
        searchString: data.searchString,
        searching: true
      });
    }
    this.getFilteredResults(data);
  }

  render() {
    return (
      <div>
          <Menu borderless>
              <Menu.Item header>
                  <img size='tiny' src={phLogo} alt='ProductHunt'/>
              </Menu.Item>
              <Menu.Item header> 
                React Hunt!
              </Menu.Item>
              <Menu.Item header>
                  <img size='tiny' src={reactLogo} alt='React'/>
              </Menu.Item>
          </Menu>
          <Grid centered stackable>
            <Grid.Column widescreen={3} largeScreen={4} tablet={5}>
              <FiltersMenu onChange={this.handleChange} />
            </Grid.Column>
            <Grid.Column widescreen={6} largeScreen={7} tablet={10}>
              <Segment raised>
                <Loader size='massive' inline='centered' active={this.state.searching} style={{'marginTop': '0.3em'}}>Loading! Please Wait . . .</Loader>
                <PhResults products={this.state.filtered || this.state.products} searchString={this.state.searchString}/>
              </Segment>
            </Grid.Column>
          </Grid>
      </div>
    );
  }
}
