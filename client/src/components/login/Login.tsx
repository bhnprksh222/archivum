import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import getWeb3 from "../../getWeb3";
import Footer from '../Footer/Footer'

import './login.scss'

import LogoWithCaption from '../../assets/logo-cap.svg?react';
import LogoSM from '../../assets/logo-sm.svg?react';
import MetaMask from '../../assets/metamask.svg?react';

const Login = () => {
    const [isMobile, setMobile] = useState<boolean>(false);
    const [isConnected, setConnected] = useState<boolean | null>(null);

    const history = useHistory();


    useEffect(() => {
        setMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        const currentAddress = window.ethereum.selectedAddress;
        if (currentAddress) {
            setConnected(true);
            history.push("/landing");
        } else {
            setConnected(false);
        }
    });

    const connectMetamask = async () => {
        try {
            await getWeb3();

            history.push("/landing");
        } catch (error) {
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`
            );
            console.error(error);
        }
    }

    if (isConnected === null || isConnected === true) {
        return <h1>Connecting...</h1>;
    } else if (isConnected === false) {
        return (
            <>
                <div className='login-top'>
                    <LogoSM className='login-top-logosm' onClick={() => history.push('/')} />
                    <div className='login-top-line'></div>
                </div>
                <div className='login'>
                    <LogoWithCaption className='login-logo' />
                    <button className='login-btn' onClick={() => connectMetamask()}>
                        CONNECT TO METAMASK <MetaMask className="login-btn-metamask" />
                    </button>
                </div>
                <Footer />
            </>
        )
    }
}

export default Login
