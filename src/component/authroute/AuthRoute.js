import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

@withRouter //可以看到history对象
class AuthRoute extends React.Component{
	componentDidMount() {
		const publicList = ['/login']
		const pathname = this.props.location.pathname
		if (publicList.indexOf(pathname)>-1) {
			return null
		}

		if(!localStorage.getItem('user')){
			this.props.history.push('/login')
		}
	}
	render(){
		return null
	}

}
export default AuthRoute