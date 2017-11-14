import React, { Component } from 'react';
import {Item, Label, Message} from 'semantic-ui-react';

export class PhResults extends Component {
  render() {
    if(this.props.products == null) {
      return null;
    }
    if(this.props.products.length === 0 && this.props.searchString.length > 0){
      return (
          <Message error icon='dislike outline' size='massive'>Sorry no results for {this.props.searchString}</Message>
        )
    }
    const items = this.props.products.map((post,index)=> {
      let postUrl = post.thumbnail.image_url;
      postUrl = postUrl.substring(0,postUrl.indexOf('?'));
      const postDate = new Date(post.day)
      return (
        <Item key={post.id}>
          <Item.Image size='tiny' src={postUrl} />
          <Item.Content>
            <Item.Header as='a' href={post.discussion_url} target='_blank' >{post.name}</Item.Header>
            <Item.Meta>{post.tagline}</Item.Meta>
            <Item.Extra>
              <Label icon='calendar' content={postDate.toLocaleString('en-GB')} />
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
    });

    return (
        <Item.Group divided>
          {items}
        </Item.Group>
    );
  }
}