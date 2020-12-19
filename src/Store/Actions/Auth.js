import * as ActionTypes from '../Actions/actionTypes';
import axios from 'axios';
export const authStart=()=>{
  return{
      type:ActionTypes.AUTH_START
  }
}
export const authSuccess=(token,userId)=>{
    return{
        type:ActionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId

    }
}
export const authFail=(error)=>{
    return{
        type:ActionTypes.AUTH_FAIL,
        error:error

    }
}
export const logout=()=>{
    return{
        type:ActionTypes.AUTH_LOGOUT
      }
}
export const authLogout=(expireTime)=>{
    return dispatch=>{
        setTimeout(()=>{
          dispatch(logout());
        },expireTime*1000)
    }
}
//auth is my async action
export const auth=(email,password,isSignUp)=>{
  return dispatch=>{
      
      dispatch(authStart());
      const authData={
          email:email,
          password:password,
          returnSecureToken:true
      }

      let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBagl4GAjnBUhZeSvquHl8I9HbO7nwS_Hg"
      if(!isSignUp)
      {
          url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBagl4GAjnBUhZeSvquHl8I9HbO7nwS_Hg"
      }
      axios.post(url,authData)
      .then(result=>{
         dispatch(authSuccess(result.data.idToken,result.data.localId));
         dispatch(authLogout(result.data.expiresIn))
         console.log(result);
      })
      .catch(err=>{
          dispatch(authFail(err.response.data.error));
          console.log(err.response.data.error);
      })
      
  }
}