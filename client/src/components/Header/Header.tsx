
import { useHistory } from "react-router-dom";


import { useSelector } from "react-redux";
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
  const account = useSelector((state: RootState) => state.account.account);

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
        <p>{account ? account : "Not Connected"}</p>
      </div>
    </div>
  )
}
