import React, {Component} from 'react';
import { Radio, Checkbox, Header, Segment, Input, Item} from 'semantic-ui-react';

export class FiltersMenu extends Component{
	constructor(props){
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(filter,e){
		console.log(e.target);
		console.log(filter);
	}
	render(){
		return (
			<div>
				<Header as='h5' attached='top'>
		      Filters
		    </Header>
		    <Segment attached>
		      <Input fluid onChange={this.onChange('word')}
	          icon='search'
	          placeholder='Type to filter'
	        />
		    </Segment>
		    <Header as='h5' attached>
		      Order By
		    </Header>
		    <Segment attached>
		    	<Item.Group divided>
		      <Item><Checkbox label='Votes' toggle onChange={(e)=>{this.onChange('votes',e)}}/></Item>
		      <Item><Checkbox label='Username' toggle onChange={this.onChange('username')}/></Item>
		      <Item><Checkbox label='Product Name' toggle onChange={this.onChange('product')} /></Item>
		      <Item><Checkbox label='Date posted' toggle onChange={this.onChange('date')}/></Item>
		      <Item><Radio label='Descending/Ascending' slider /></Item>
		      </Item.Group>
		    </Segment>
	    </div>
		);
	}
}