import React from 'react'
import { withRouter } from 'react-router-dom'
import {List,WingBlank, Icon,NavBar} from 'antd-mobile'
import { createForm } from 'rc-form';

const Item = List.Item;
@withRouter
class TransactionDetail extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }

    componentDidMount() {
        var detail = this.props.location.state && this.props.location.state.detail;
        console.log(detail);
        if(detail){ // passed from transaction list page
            this.setState({ 
                data:detail
             });
        }
    }

    handleChange(key,val){
		this.setState({
			[key]:val
		})
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
            <NavBar className='fixd-header' mode='dark'
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.goBack()}
            >Transaction List</NavBar>
            <div style={{marginTop:45}}>
                    <WingBlank>
                        
                        <List id="transaction-list" className="my-list" style={{'height':listHight}}>
                            {this.state.data.map(v=>(
                                <Item key={v.id} className={v.isPay === "1" ? "redFont" : "greenFont"}
                            extra={v.createTime}>{v.name}  SGD {v.isPay === "1" ? "-":""}{v.amount} </Item>
                            ))}
                        </List>
                        {/* <Pagination total={5} current={1} locale={locale} /> */}
                    </WingBlank>
                </div>
           </div>
        )
    }
}

export default createForm()(TransactionDetail)