import React, {Component} from 'react';
import { Checkbox, Header, Segment, Input, Item} from 'semantic-ui-react';

export class FiltersMenu extends Component{
	constructor(props){
		super(props);
		this.state = {
			filter: 'none',
			order: 'desc',
			searchString: ''
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e,data){
		let filters = {};
		 if(data.name === 'word') {
			filters['filter'] = this.state.filter;
			filters['order'] = this.state.order;
			filters['searchString'] = e.target.value; //set the new string to search
			this.setState({searchString: e.target.value});
		} else if(data.name === 'order') {
			filters['filter'] = this.state.filter;
			filters['order'] = (data.checked ? 'asc': 'desc') //set the new order
			filters['searchString'] = this.state.searchString;
			this.setState({order: filters['order']});
		} else {
			filters['order'] = this.state.order; //get the stored order
			filters['searchString'] = this.state.searchString; //get the stored search string
			if(data.checked) {
				filters['filter'] = data.name; //set the new filter
				this.setState({filter: data.name});		
			} else { 
				filters['filter'] = 'none'; //no filter applied
				this.setState({filter: 'none'});
			}
		}
		this.props.onChange(filters);
	}

	render(){
		const filter = this.state.filter;
		const order = this.state.order;
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
		    <Header as='h5' attached>Sort by</Header>
		    <Segment attached>
		    	<Item.Group divided>
		      <Item><Checkbox name='votes' label='Votes' checked={filter === 'votes'} toggle onChange={this.handleChange}/></Item>
		      <Item><Checkbox name='username' label='Username' checked={filter === 'username'} toggle onChange={this.handleChange}/></Item>
		      <Item><Checkbox name='product' label='Product Name' checked={filter === 'product'} toggle onChange={this.handleChange} /></Item>
		      <Item><Checkbox name='date' label='Date posted' checked={filter === 'date'} toggle onChange={this.handleChange}/></Item>
		      <Item><Checkbox name='order' checked={order === 'asc'} disabled={filter === 'none'} label='Descending/Ascending' slider onChange={this.handleChange}/></Item>
		      </Item.Group>
		    </Segment>
	    </div>
		);
	}
}