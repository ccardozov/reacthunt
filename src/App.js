import React, { Component } from 'react';
import reactLogo from './logo.svg';
import phLogo from './producthunt.svg';
import {PhResults } from './PhResults';
import { Menu, Container, Input, Loader, Segment } from 'semantic-ui-react';


export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      products: null,
      filtered: null,
      searching: true,
      searchString: '',
      accessToken: 'a5d29aef6aa58697eb97035653a259a12ea59f998afccf30062d4571eb909735'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let fetchUrl = 'https://api.producthunt.com/v1/posts/all?access_token='+this.state.accessToken;
    const searchString = this.state.searchString;
    if(searchString !== ''){
      fetchUrl += '&search='+searchString; 
    }
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

  getFilteredResults(searchString){
    if(searchString === '') {
      this.setState({ filtered: null, searching: false});
    } else {
      let filtered = [];
      for(let post of this.state.products) {
        if(post.name.toLowerCase().includes(searchString.toLowerCase()) || post.tagline.toLowerCase().includes(searchString.toLowerCase())){
          filtered.push(post);
        }
      }
      this.setState({filtered: filtered, searching: false});
    }
  }

  handleChange(event){
    this.setState({
      searchString:event.target.value,
      searching: true
    });
    this.getFilteredResults(event.target.value);
  }

  render() {
    return (
      <div>
          <Menu borderless widths={1}>
            <Container text>
              <Menu.Item header>
                  <img size='tiny' src={phLogo} alt='ProductHunt'/>
                  &nbsp;&nbsp;React Hunt!&nbsp;&nbsp;
                  <img size='tiny' src={reactLogo} alt='React'/>
              </Menu.Item>
            </Container>
          </Menu>
          <Container text>
            <Input fluid onChange={this.handleChange}
                loading={this.state.searching}
                icon='search'
                placeholder='Type to filter'
              />
            <Loader size='massive' inline='centered' active={this.state.searching} style={{'marginTop': '0.3em'}}>Loading! Please Wait . . .</Loader>
            <PhResults products={this.state.filtered || this.state.products} searchString={this.state.searchString}/>
          </Container>
          <Segment>
            <Container textAlign='center' >©2017 Corlo</Container>
          </Segment>
      </div>
    );
  }
}
