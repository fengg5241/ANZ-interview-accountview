import React from 'react'
import { connect } from 'react-redux';
import {NavBar,SearchBar, Button,Flex, Icon,Modal} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navLink/navLink'
import User from '../user/user'
import Account from '../account/account'
function Customer(){
    return <h2>Customer list</h2>
}
function Msg(){
    return <h2>msg list</h2>
}

const prompt = Modal.prompt;


@connect(
    state=>state
)
class Dashboard extends React.Component {

    render(){
        let {pathname} = this.props.location
        if(pathname === '/') pathname = "/user"
        const navList = [
            {
                path:'/user',
                text:'accounts',
                icon:'staff',
                component:User,
                title:'account Info'
            },
            {
                path:'/account',
                text:'me',
                icon:'user',
                component:Account,
                title:'Me'
            }
        ]

        return (
            <div>
                <Switch>
                <Route key="/" exact path="/" component={User}></Route>
                {navList.map(v=>(
                    <Route key={v.path} path={v.path} component={v.component}></Route>
                ))}
            </Switch>
            <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default Dashboard