
import axios from 'axios'
import {getRedirectPath} from '../util'
import Constants from '../constants'
const LOGIN_SUCESS = 'LOGIN_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	redirectTo:'',
	isAuth:false,
	msg:'',
	user:'',
	type:'',
	title:''
}
// reducer
export function user(state=initState, action){
	switch(action.type){
		case LOGIN_SUCESS:
			return {...state, msg:'',redirectTo:getRedirectPath(action.payload),isAuth:true,...action.payload}
		case LOAD_DATA:
			return {...state, ...action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state
	}
} 

function loginSuccess(data){
	return { type:LOGIN_SUCESS , payload:data}
}
function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function login({user,pwd}){
	if (!user||!pwd) {
		return errorMsg('UserName or Password cannnot be empty !')
	}
	return dispatch=>{
		let returnUser = {
			password:pwd,
			phone:user
		}
		localStorage.setItem("user",user);
		dispatch(loginSuccess(returnUser))
	}


}







