import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Web3 } from 'web3';

import getWeb3 from "../../getWeb3";
import Footer from '../../components/Footer/Footer'

import './login.scss'

import LogoWithCaption from '../../assets/logo-cap.svg?react';
import LogoSM from '../../assets/logo-sm.svg?react';
import MetaMask from '../../assets/metamask.svg?react';

const Login = () => {
    const [isMobile, setMobile] = useState<boolean>(false);
    const [isConnected, setConnected] = useState<boolean | null>(null);
    const [account, setAccount] = useState<string | null>(null)

    const history = useHistory();


    useEffect(() => {
        const get_account = async () => {
            if (window.ethereum) {
                // instantiate Web3 with the injected provider
                const web3 = new Web3(window.ethereum);
                setMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
                await window.ethereum.request({ method: 'eth_requestAccounts' });

                //get the connected accounts
                const accounts = await web3.eth.getAccounts();
                setAccount(accounts[0])
            }
            if (account) {
                setConnected(true);
                history.push("/landing");
            } else {
                setConnected(false);
            }
        }

        get_account()
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
