import React, { Component } from 'react';
import reactLogo from './logo.svg';
import phLogo from './producthunt.svg';
import {Menu, Container, Input, Icon, Loader, Item, Label} from 'semantic-ui-react';

class PhResults extends Component {
  render() {
    if(this.props.products == null) {
      return null;
    }
    const items = this.props.products.map((post,index)=> {
        return (<Item key={post.id}>
          <Item.Image src={post.thumbnail.image_url} />
          <Item.Content>
            <Item.Header as='a'>{post.name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{post.day}</span>
            </Item.Meta>
            <Item.Description>{post.tagline}</Item.Description>
            <Item.Extra>
              <Label>{post.votes_count}</Label>
            </Item.Extra>
          </Item.Content>
        </Item>)
    });

    return (
    <Item.Group divided>
      {items}
    </Item.Group>
    );
  }
}

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: null,
      searchString: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    this.getResults('');
  }

  getResults(searchString) {
    fetch('https://api.producthunt.com/v1/posts?access_token=b1eaf7ef066b5d22d3c82c1fe5062077e86d2184b7ca6b22b98f22dbe085c63b')
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        this.setState({
          products: data.posts
        });
      });
  }

  handleChange(event){
    this.setState({
      searchString:event.target.value,
    });
  }

  handleSearchClick() {
    this.setState({products:null});
    this.getResults(this.state.searchString);
  }

  render() {
    return (
      <div>
        <Menu borderless fixed='top'>
        		<Menu.Item>
              <img src={reactLogo} alt='React'/>
        			<img src={phLogo} alt='ProductHunt'/>
            </Menu.Item>
            <Menu.Item header>
              React Hunt! (A React Producthunt API fetcher)
            </Menu.Item>
        </Menu>
        <Container text>
          <Input fluid onChange={this.handleChange}
            icon={<Icon name='search' inverted circular link onClick={this.handleSearchClick} />}
            placeholder='Search Product Hunt...'
          />
          <Loader size='massive' active={!this.state.products ? true : false} >Loading...</Loader>
          <PhResults products={this.state.products} show={this.state.products ? true : false}/>
        </Container>
      </div>
    );
  }
}
