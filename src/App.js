import React, { Component } from 'react';
import reactLogo from './logo.svg';
import phLogo from './producthunt.svg';
import {Menu, Container, Input, Item, Loader, Label, Message, Segment} from 'semantic-ui-react';


function ProductItem(props) {
  const post = props.post;
  let postUrl = post.thumbnail.image_url;
  postUrl = postUrl.substring(0,postUrl.indexOf('?'));
  const postDate = new Date(post.day)
  return (
    <Item>
      <Item.Image size='tiny' src={postUrl} />
      <Item.Content>
        <Item.Header as='a' href={post.discussion_url} target='_blank' >{post.name}</Item.Header>
        <Item.Meta>{post.tagline}</Item.Meta>
        <Item.Extra>
          <Label icon='calendar' content={postDate.toDateString()} />
          <Label as='a' content='External Link' icon='external square' href={post.redirect_url}/>
          <Label icon='arrow circle up' content={post.votes_count} />
          <Label as='a' image href={post.user.profile_url}>
            <img src={post.user.image_url['30px']} alt='User avatar' />
            {post.user.name} 
          </Label>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

class PhResults extends Component {
  render() {
     if(this.props.products == null) {
      return null;
    }
    if(this.props.products.length === 0 && this.props.searchString.length > 0){
      return (
          <Message error icon='inbox' size='massive'>Sorry no results for {this.props.searchString}</Message>
        ); 
    }
    const items = this.props.products.map((post,index)=> {
      return (
        <ProductItem post={post} key={post.id}/>
      );
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
      filtered: null,
      searching: true,
      searchString: '',
      accessToken: 'b1eaf7ef066b5d22d3c82c1fe5062077e86d2184b7ca6b22b98f22dbe085c63b'
    }
    this.handleChange = this.handleChange.bind(this);
    // this.handleSearchClick = this.handleSearchClick.bind(this);
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

  // handleSearchClick() {
  //   this.setState({searching:true});
  //   this.getFilteredResults();
  // }

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
                icon='search'
                // {<Icon name='search' inverted circular link onClick={this.handleSearchClick} />}
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
