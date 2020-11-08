
import axios from 'axios'
import {getRedirectPath} from '../util'
import Constants from '../constants'
const ADD_ACCOUNT_SUCESS = 'ADD_ACCOUNT_SUCESS'
const INIT_ACCOUNT_SUCESS = 'INIT_ACCOUNT_SUCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState={
	accounts:[],
	msg:""
}
// reducer
export function account(state=initState, action){
	switch(action.type){
		case ADD_ACCOUNT_SUCESS:
			return {...state, accounts:[...state.accounts,action.payload]}
		case INIT_ACCOUNT_SUCESS:
			return {...state, accounts:action.payload}
		case ERROR_MSG:
			return {...state, isAuth:false, msg:action.msg}
		default:
			return state
	}
} 

function addAccountSuccess(data){
	return { type:ADD_ACCOUNT_SUCESS , payload:data}
}

function initAccountsSuccess(data){
	return { type:INIT_ACCOUNT_SUCESS , payload:data}
}

function errorMsg(msg){
	return { msg, type:ERROR_MSG }
}

export function addAccount(account){
	return dispatch=>{
		dispatch(addAccountSuccess(account))
	}
}

export function initAccounts(account){
	return dispatch=>{
		dispatch(initAccountsSuccess(account))
	}
}







