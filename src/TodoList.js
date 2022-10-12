import React, { Component, Fragment } from 'react';

class TodoList extends Component {

	// constructor 在组件创建的第一个时刻自动被执行
	constructor(props) {
		super(props);
		// 在组件中创建了两个数据,数据一定定义在state中
		this.state = {
			inputValue: 'hello world',
			list: []
		}
	}

	handleInputChange(e) {
		this.setState({
			inputValue: e.target.value
		})
	}

	render() {
		return (
			<Fragment>
				<input 
					value={this.state.inputValue}
					onChange={this.handleInputChange.bind(this)}
				/>
				<ul>
					<li>learn React</li>
					<li>learn Component</li>
				</ul>
			</Fragment>
		);
	}

}

export default TodoList;