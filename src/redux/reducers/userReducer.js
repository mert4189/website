import * as actionTypes from '../actions/actiontype';
import initialState from '../initialState';

export function getUser(state=initialState.user,action){
    switch(action.type){
        case actionTypes.USER:
            return action.payload
        default:
            return state;
    }
}
export function getRol(state=initialState.rol,action){
    switch(action.type){
        case actionTypes.ROL:
            return action.payload
        default:
            return state;
    }
}
export function getAd(state=initialState.ad,action){
    switch(action.type){
        case actionTypes.AD:
            return action.payload
        default:
            return state;
    }
}
export function getKullanıcı(state=initialState.kullanıcı,action){
    switch(action.type){
        case actionTypes.KULLANICI:
            return action.payload
        default:
            return state;
    }
}
export function getAdmin(state=initialState.admin,action){
    switch(action.type){
        case actionTypes.ADMİN:
            return action.payload
        default:
            return state;
    }
}