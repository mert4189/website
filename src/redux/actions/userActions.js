import * as actionTypes from './actiontype'

export const setUser = (value) => {
    // Redux store'a mevki bilgisini kaydet
    const action = {
      type: actionTypes.USER,
      payload: value,
    };
  
    // Yerel depolamaya mevki bilgisini setle
    localStorage.setItem('user', JSON.stringify(value));
  
    return action;
  };
  export const setRol = (value) => {
    // Redux store'a mevki bilgisini kaydet
    const action = {
      type: actionTypes.ROL,
      payload: value,
    };
  
    // Yerel depolamaya mevki bilgisini setle
    localStorage.setItem('rol', JSON.stringify(value));
  
    return action;
  };
  export const setAd = (value) => {
    // Redux store'a mevki bilgisini kaydet
    const action = {
      type: actionTypes.AD,
      payload: value,
    };
  
    // Yerel depolamaya mevki bilgisini setle
    localStorage.setItem('ad', JSON.stringify(value));
  
    return action;
  };
  export const setKullanıcı = (value) => {
    // Redux store'a mevki bilgisini kaydet
    const action = {
      type: actionTypes.KULLANICI,
      payload: value,
    };
  
    // Yerel depolamaya mevki bilgisini setle
    localStorage.setItem('kullancı', JSON.stringify(value));
  
    return action;
  };
  export const setAdmin = (value) => {
    // Redux store'a mevki bilgisini kaydet
    const action = {
      type: actionTypes.ADMİN,
      payload: value,
    };
  
    // Yerel depolamaya mevki bilgisini setle
    localStorage.setItem('admin', JSON.stringify(value));
  
    return action;
  };