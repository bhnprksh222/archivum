import './login.scss'
import LogoWithCaption from '../../assets/logo-cap.svg?react';
import LogoSM from '../../assets/logo-sm.svg?react';

const Login = () => {
    return (
        <>
            <div className='login-top'>
                <LogoSM className='login-top-logosm' />
                <div className='login-top-line'></div>
            </div>
            <div className='login'>
                <LogoWithCaption className='login-logo' />
                <button className='login-btn'>LOGIN WITH METAMASK</button>
            </div>
            <p className='login-footer'>Developed with ❤️ by <span>@Kanyaraasi</span></p>
        </>
    )
}

export default Login
