import React, {Component} from 'react';
import { Checkbox, Header, Segment, Input, Item} from 'semantic-ui-react';

export class FiltersMenu extends Component{
	constructor(props){
		super(props);
		this.state = {
			filter: 'none',
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e,data){
		if(data.name !== 'order'){
			if(data.checked){
				data['filter'] = data.name;
				this.setState({
					filter: data.name
				});		
			} else{
				data['filter'] = 'none';
				this.setState({
					filter: 'none'
				});
			}
		}
		console.log(data);
		//this.props.onChange(data);
	}

	render(){
		const filter = this.state.filter;
		return (
			<div>
				<Header as='h5' attached='top'>
		      Filters
		    </Header>
		    <Segment attached>
		      <Input fluid onChange={this.handleChange}
	          name='word'
	          icon='search'
	          placeholder='Type to filter'
	        />
		    </Segment>
		    <Header as='h5' attached>
		      Order By
		    </Header>
		    <Segment attached>
		    	<Item.Group divided>
		      <Item><Checkbox name='votes' label='Votes' checked={filter === 'votes'} toggle onChange={this.handleChange}/></Item>
		      <Item><Checkbox name='username' label='Username' checked={filter === 'username'} toggle onChange={this.handleChange}/></Item>
		      <Item><Checkbox name='product' label='Product Name' checked={filter === 'product'} toggle onChange={this.handleChange} /></Item>
		      <Item><Checkbox name='date' label='Date posted' checked={filter === 'date'} toggle onChange={this.handleChange}/></Item>
		      <Item><Checkbox name='order' disabled={filter === 'none' ? true : false} label='Descending/Ascending' slider onChange={this.handleChange}/></Item>
		      </Item.Group>
		    </Segment>
	    </div>
		);
	}
}