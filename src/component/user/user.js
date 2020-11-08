import React from 'react'
import PropTypes from 'prop-types'
import {List,WingBlank,Toast,NavBar,Button} from 'antd-mobile'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Constants from '../../constants'
import { connect } from 'react-redux'
import {addAccount,initAccounts} from '../../redux/account.redux'

const Item = List.Item;

@connect(
	state=>state.account,
	{addAccount,initAccounts}
)
class User extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentDidMount() {
        if(this.props.accounts.length == 0){
            // this.props.initAccounts(dummyData)
            axios.get(Constants.SERVICE_URL + '/api/accounts').
            then(res=>{
                if(res.status===200){
                    this.props.initAccounts(res.data)
                }   
            }).catch((error) => {
                let errorMessage = error ? error.response ? error.response.data:"Network Error" :"Network Error";
                Toast.info(errorMessage, 5);
            });
        }
    }
    
    render(){
        let listHight = 0;
        if (document.getElementsByClassName('am-tab-bar-bar')[0]) {
            listHight = document.documentElement.clientHeight - 45 - 40 - document.getElementsByClassName('am-tab-bar-bar')[0].offsetHeight
        }else{
            listHight = document.documentElement.clientHeight - 45 - 40 - 50
        }
        return (
            
            <div>
               <NavBar key="1" className='fixd-header' mode='dark'
                rightContent={[
                    <Button size="small" type='primary' onClick={()=>this.props.history.push('/userDetail')}>+</Button>
                ]}
                >Account list</NavBar>

                <div style={{marginTop:45}}> 
                    <WingBlank>
                        <List id="user-list" className="my-list" style={{'height':listHight}}>
                            {this.props.accounts.map(v=>(
                                <Item key={v.id} arrow="horizontal" 
                                className={v.isPending === 1? "orangeFont":""}
                                extra={"SGD   "+v.amount}
                                onClick={()=>this.props.history.push({
                                    pathname: '/TransactionDetail',
                                    state: { detail: v.detail }
                                })}
                                >{v.name}{v.isPending === 1 ? "(Pending)":""}</Item>
                            ))}
                        </List>
                    </WingBlank>

                </div>
            </div>
           
        )
    }
}

export default withRouter(User)