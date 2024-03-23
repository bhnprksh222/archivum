import Footer from '../../components/Footer/Footer'
import history from "../../history";

import './login.scss'

import LogoWithCaption from '../../assets/logo-cap.svg?react';
import LogoSM from '../../assets/logo-sm.svg?react';
import MetaMask from '../../assets/metamask.svg?react';

const Login = () => {

    return (
        <>
            <div className='login-top'>
                <LogoSM className='login-top-logosm' onClick={() => history.push('/')} />
                <div className='login-top-line'></div>
            </div>
            <div className='login'>
                <LogoWithCaption className='login-logo' />
                <button className='login-btn'>
                    LOGIN WITH METAMASK <MetaMask className="login-btn-metamask" />
                </button>
            </div>
            <Footer />
        </>
    )
}

export default Login
