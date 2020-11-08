import React from 'react'
import { withRouter } from 'react-router-dom'
import {List,WhiteSpace,WingBlank,NavBar, InputItem, Button} from 'antd-mobile'
import { createForm } from 'rc-form';

const Item = List.Item;
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
        const { getFieldProps } = this.props.form;
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