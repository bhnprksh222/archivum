
import { useHistory } from "react-router-dom";


import { useSelector, useDispatch } from "react-redux";
import { setAccount } from '../../reducers/accountReducer';
import { RootState } from "../../reducers";
import './header.scss'

import LogoSM from "../../assets/logo-sm.svg?react";
import profile from "../../assets/default_pic.png"


export const Header1 = () => {
  return (
    <div className="header1">
      <div className="logo">
        <LogoSM />
      </div>
    </div>
  )
}



export const Header2 = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const accountNo = useSelector((state: RootState) => state.account.account);

  const handleLogout = () => {
    dispatch(setAccount(null));
    history.push('/')
    history.go(0)
  }

  return (
    <div className="header2">
      <div className='login-top'>
        <LogoSM className='login-top-logosm'
          onClick={() => history.push('/')}
        />
        <div className='login-top-line'></div>
      </div>
      <div className="profile">
        <img src={profile} alt="logo" />
        <div className="profile-info">
          <button onClick={() => handleLogout()}>Logout</button>
          <p className="profile-account_no">{accountNo ? `${accountNo}` : "Not Connected"}</p>
        </div>
      </div>
    </div>
  )
}
