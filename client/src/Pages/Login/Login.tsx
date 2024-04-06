import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { ethers } from 'ethers'

import { setAccount } from '../../reducers/accountReducer'
import { setContract } from '../../reducers/contractReducer'
import { setProvider } from '../../reducers/providerReducer'

import Footer from '../../components/Footer/Footer'
import Archivum from '../../artifacts/contracts/Archivum.sol/Archivum.json';

import './login.scss'

import LogoWithCaption from '../../assets/logo-cap.svg?react';
import LogoSM from '../../assets/logo-sm.svg?react';
import MetaMask from '../../assets/metamask.svg?react';
import { RootState } from '../../reducers';

const Login = () => {
    const dispatch = useDispatch();

    const handleSetAccount = (account: string) => {
        dispatch(setAccount(account));
    };
    const handleSetContract = (contract: ethers.Contract) => {
        dispatch(setContract(contract));
    };
    const handleSetProvider = (provider: ethers.BrowserProvider) => {
        dispatch(setProvider(provider));
    };

    const account = useSelector((state: RootState) => state.account.account);
    const provider = useSelector((state: RootState) => state.provider.provider);
    const contract = useSelector((state: RootState) => state.contract.contract);
    const history = useHistory();


    useEffect(() => {
        window.ethereum.on("chainChanged", () => {
            window.location.reload()
        })

        window.ethereum.on("accountsChanged", () => {
            window.location.reload()
        })
    }, [])

    const connect = async () => {
        if (window.ethereum) {
            console.log('detected')
        }
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            })
            const accountNo = accounts[0]
            console.log(accountNo)
            handleSetAccount(accountNo)
            const providerType = new ethers.BrowserProvider(window.ethereum);
            if (providerType) {
                await providerType.send("eth_requestAccounts", []);
                const signer = providerType.getSigner();
                const address = (await signer).getAddress();
                handleSetAccount(`${await address}`);

                let contractAddress = `${import.meta.env.VITE_APP_ARCHIVUM_CONTRACT_ADDRESS}`
                const _contractAddress = new ethers.Contract(
                    contractAddress, Archivum.abi, await signer
                )
                handleSetContract(_contractAddress)
                handleSetProvider(providerType)
                console.log('address', address)
            }

            if (account && contract && provider) {
                history.push('/landing')
                history.go(0)
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <div className='login-top'>
                <LogoSM className='login-top-logosm' onClick={() => history.push('/')} />
                <div className='login-top-line'></div>
            </div>
            <div className='login'>
                <LogoWithCaption className='login-logo' />
                <button className='login-btn'
                    onClick={() => connect()}
                >
                    CONNECT TO METAMASK <MetaMask className="login-btn-metamask" />
                </button>
            </div>
            <Footer />
        </>
    )
}
export default Login
