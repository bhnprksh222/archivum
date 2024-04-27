import { useHistory } from "react-router-dom";

import './developers.scss'
import LOGO from "../../assets/logo-cap.svg?react";

const Developers = () => {
    const history = useHistory();
    return (
        <>
            <div className='devs'>
                <LOGO
                    className='logo'
                    onClick={() => {
                        history.push('/')
                        history.go(0)
                    }}
                />
                <h1 className='devs-title'>DEVELOPERS</h1>
                <ul>
                    <li className='devs-dev'>Bhanu Prakash AKEPOGU</li>
                    <li className='devs-dev'>Tarun Emmanuel MAJHI</li>
                    <li className='devs-dev'>Vandana CHINTHALA</li>
                    <li className='devs-dev'>Priyanka DABBARA</li>
                </ul>
            </div>
        </>
    )
}

export default Developers
