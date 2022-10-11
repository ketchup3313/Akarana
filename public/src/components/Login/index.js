import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button, Input, message } from 'antd';
import './style.css';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			login: false,
			modal: false,
			user: '',
			password: ''
		}
		this.showModal = this.showModal.bind(this);
		this.hideModal = this.hideModal.bind(this);
		this.changeUser = this.changeUser.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
	}

	showModal() {
		this.setState({
			modal: true
		})
	}

	hideModal() {
		this.setState({
			modal: false
		})
	}

	changeUser(e) {
		this.setState({
			user: e.target.value
		})
	}

	changePassword(e) {
		this.setState({
			password: e.target.value
		})
	}

	checkLogin() {
		const { user, password } = this.state;
		const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`;
		axios.get(url).then(res => {
			const login = res.data.data.login;
			if (login) {
				message.success('登陆成功');
			}else {
				message.error('登陆失败');
			}
		})
	}

	render() {
		const { login } = this.state;
		return (
			<div className='login'>
				{
					login ?
						<Button type="primary">退出</Button> :
						<Button 
							type="primary"
							onClick={this.showModal}
						>
							登陆
						</Button>
				}
				<Modal
          title="登陆"
          visible={this.state.modal}
          onOk={this.checkLogin}
          onCancel={this.hideModal}
        >
          <Input 
          	placeholder='请输入用户名' 
          	style={{ marginBottom: 10 }}
          	value={this.state.user}
          	onChange={this.changeUser}
          />
          <Input
          	placeholder='请输入密码'
          	type='password'
          	value={this.state.password}
          	onChange={this.changePassword}
          />
        </Modal>
			</div>
		)
	}

	componentDidMount() {
		axios.get('http://www.dell-lee.com/react/api/isLogin.json')
			.then(res => {
				const login = res.data.data.login;
				this.setState({ login })
			})
	}

}

export default Login;