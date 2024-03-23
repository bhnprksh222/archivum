
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Web3 } from 'web3';


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
  const [connectedAccount, setConnectedAccount] = useState('null')

  useEffect(() => {
    const fetchData = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setConnectedAccount(accounts[0]);
      } else {
        alert('Please download metamask');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="header2">
      <div className='login-top'>
        <LogoSM className='login-top-logosm' onClick={() => history.push('/')} />
        <div className='login-top-line'></div>
      </div>
      <div className="profile">
        <img src={profile} alt="logo" />
        <p className="profile-account_no">{connectedAccount}</p>
      </div>
    </div>
  )
}
