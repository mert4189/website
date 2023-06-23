import { combineReducers } from "redux";
import {getUser,getRol,getAd,getKullanıcı,getAdmin} from "./reducers/userReducer";

const reducers=combineReducers({
    getUser,
    getRol,
    getAd,
    getKullanıcı,
    getAdmin
 
})


export default reducers;