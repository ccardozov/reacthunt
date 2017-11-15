import React, { Component } from 'react';
import {Item, Label, Message, Popup, Button} from 'semantic-ui-react';

function ProductItem(props) {
  const post = props.post;
  let postUrl = post.thumbnail.image_url;
  postUrl = postUrl.substring(0,postUrl.indexOf('?'));
  const postDate = new Date(post.day)
  return (
    <Item>
      <Item.Image size='small' src={postUrl}  />
      <Item.Content  verticalAlign='top'>
        <Item.Header as='a' href={post.discussion_url} target='_blank' >{post.name}</Item.Header>
        <Item.Meta>{post.tagline}</Item.Meta>
        <Item.Extra> 
          <Label as='a' image href={post.user.profile_url} floated='right'>
            <img src={post.user.image_url['30px']} alt='User avatar' />
            {post.user.name} 
          </Label>
        </Item.Extra>
        <Item.Extra>
          <Label icon='calendar' content={postDate.toDateString()} />
          <Popup
            trigger={<Button as='a' target='_blank' href={post.redirect_url} size='mini' icon='external square' />}
            content='Go to external URL'
            size='tiny'
            position='bottom center'
            basic
          />
          <Label icon='arrow circle up' content={post.votes_count} />
         
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export class PhResults extends Component {
  render() {
     if(this.props.products == null) {
      return null;
    }
    if(this.props.products.length === 0 && this.props.searchString.length > 0){
      return (
        <Message
          icon='info'
          header={'Sorry no results for: ' + this.props.searchString }
          content='The string you searched returned 0 results'
        />
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