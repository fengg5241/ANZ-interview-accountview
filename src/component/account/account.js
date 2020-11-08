import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {List,WhiteSpace,WingBlank,NavBar,Icon, InputItem, Button,DatePicker} from 'antd-mobile'
import { createForm } from 'rc-form';
import axios from 'axios'
import Constants from '../../constants'

const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
const utcOffset = new Date(now.getTime() - (now.getTimezoneOffset() * 60000));

const Item = List.Item;
const Brief = Item.Brief;
@withRouter
class Account extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            passpord:"",
            confirmPassword:""
        }
    }

    logout(){
        localStorage.removeItem("user")
        this.props.history.push("/login")
    }
    
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        const name = localStorage.getItem('user');
        return (
            <div>
                <NavBar className='fixd-header' mode='dark'
                    
                >Me</NavBar>
                <div style={{marginTop:45}}>
                    <WingBlank>
                    <form>
                        <List >
                            <InputItem
                            disabled
                            {...getFieldProps('password', {
                                initialValue: name
                            })}
                            >Name</InputItem>
                        </List>
                        </form>
                        <WhiteSpace />
                        <Button onClick={()=>this.logout()} type='primary'>Logout</Button>
                    </WingBlank>
            </div>
           </div>
        )
    }
}

export default createForm()(Account)