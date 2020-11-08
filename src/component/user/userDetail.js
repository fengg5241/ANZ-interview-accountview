import React from 'react'
import { withRouter } from 'react-router-dom'
import {List,NavBar,Icon, InputItem, Button,Toast} from 'antd-mobile'
import { createForm } from 'rc-form';
import { connect } from 'react-redux'
import {addAccount,initAccounts} from '../../redux/account.redux'

@withRouter
@connect(
	state=>state.account,
	{addAccount,initAccounts}
)
class UserDetail extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            name:'',
            email:'',
            point:0,
            payment:0,
            isNew:true
        }
    }

    componentDidMount() {
        var detail = this.props.location.state && this.props.location.state.detail
        if(detail){ // passed from user list page
            this.setState({ 
                name:detail.name,
                amount:detail.amount,
             });
        }else {
            this.setState({ isNew: true });
        }
    }
    
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
          if (!error) {
            let formData = this.props.form.getFieldsValue();
            this.insert(formData);
          } else {
              let errorStr = "";
              for(let i in error){
                errorStr += error[i].errors[0].message + "   ";
              }
              Toast.info(errorStr, 5);
          }
        });
      }

      insert(formData){
        formData.id = this.props.accounts.length + 1;
        formData.isPending = 1;
        this.props.addAccount(formData);
        this.props.history.goBack();
      }
      
      onReset = () => {
        this.props.form.resetFields();
        setTimeout(() => console.log(this.state), 0);
      }

    handleChange(key,val){
		this.setState({
			[key]:val
		})
    }
    
    validateAccountName = (rule,value,callback) => {
        if(!value || value.length === 0){
            callback(new Error('The account name should not be empty.'));
        }else {
            let reg = new RegExp("^[0-9a-zA-Z]*$");
            if(reg.test(value)){
                callback();
            }else if(value.length > 0){
                callback(new Error('The account name is allowed alpha numeric only.'));
            } 
        }
    }

    validateAmount= (rule,value,callback) => {
        if(!value || value.length === 0){
            callback(new Error('The amount should not be empty.'));
        }else {
            let reg = new RegExp("^[0-9]+(.[0-9]{1,2})?$");
            if(reg.test(value)){
                callback();
            }else if(value.length > 0){
                callback(new Error('The amount is not correct format'));
            } 
        }
    }

    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div>
            <NavBar key="2" className='fixd-header' mode='dark'
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}
            >Detail</NavBar>
            <div style={{marginTop:45}}> 
            <form>
                <List
                    className="date-picker-list"
                >
                    <InputItem
                    placeholder="Account name cannot be empty"
                    error={!!getFieldError('name')}
                    {...getFieldProps('name', {
                        initialValue: this.state.name,
                        rules: [
                        // { required: true, message: 'Account name is required' },
                        { validator:this.validateAccountName}
                        ],
                    })}
                    onErrorClick={() => {
                        Toast.info(getFieldError('name'), 1);
                      }}
                    >Name</InputItem>
                     <InputItem
                    placeholder="Account type cannot be empty"
                    error={!!getFieldError('type')}
                    {...getFieldProps('type', {
                        initialValue: this.state.type,
                        rules: [
                        { required: true, message: 'Account type is required' },
                        ],
                    })}
                    onErrorClick={() => {
                        Toast.info(getFieldError('type'), 1);
                      }}
                    >Type</InputItem>
                    <InputItem
                    placeholder="Amount"
                    error={!!getFieldError('amount')}
                    {...getFieldProps('amount', {
                        initialValue: this.state.amount,
                        rules: [
                            { validator:this.validateAmount},
                            ],
                    })}
                    onErrorClick={() => {
                        Toast.info(getFieldError('amount'), 1);
                      }}
                    >Amount</InputItem>

                    <List.Item>
                    <Button key="1" type="primary" size="small" inline onClick={this.onSubmit}>Submit</Button>
                    <Button key="2" size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>Reset</Button>
                    </List.Item>
                </List>
                </form>
           </div>
           </div>
        )
    }
}

export default createForm()(UserDetail)