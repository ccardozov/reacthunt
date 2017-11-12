import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import {Menu, Segment} from 'semantic-ui-react';


class App extends Component {
  render() {
    return (
	<Menu stackable>
<Segment.Group horizontal>
    <Segment>
		<Menu.Item>
			<img src={logo} alt=''/>
		</Menu.Item>
</Segment>
    <Segment>
<Menu.Item>
Principal
</Menu.Item>
</Segment>
    <Segment></Segment>
  </Segment.Group>
</Menu>
    );
  }
}

export default App;
