import React from "react";
import "../Styles/Header.css";
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import { GoogleLogin } from 'react-google-login';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-10%',
        transform: 'translate(-50%, -50%)',
        background: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            signupModalIsOpen: false,
            signinpModalIsOpen: false,
            isLoggedIn: false,
            userName: undefined,
            email: undefined,
            password: undefined
        }
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value })

    }
    handleNavigate = () => {
        this.props.history.push('/')
    }
    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }
    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined })
    }
    handleInputChange = (state, event) => {
        this.setState({ [state]: event.target.value })

    }
    render() {
        const { loginModalIsOpen, signupModalIsOpen, signinModalIsOpen, isLoggedIn, userName } = this.state
        return (
            <div>

                <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="header">
                        <div className="header-logo" onClick={this.handleNavigate}>
                            <b>msp</b>
                        </div>
                        {isLoggedIn ? <div class="lg">
                            <div className="logout" onClick={this.handleLogout}>Logout</div>
                            <div className="sigin" onClick={() => this.handleModal('loginModalIsOpen', true)}>{userName}</div>
                        </div> :
                            <div class="lg">
                                <div className="reg" onClick={() => this.handleModal('signupModalIsOpen', true)}>Create an account</div>
                                <div className="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            </div>}
                    </div>

                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="fa fa-close" style={{ float: 'right', marginLeft: "15px", color: 'red' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <button className="btn btn-primary" onClick={() => {
                            this.handleModal('loginModalIsOpen', false);
                            this.handleModal('signinModalIsOpen', true);
                        }}>Login with Credentails</button><br /><br />
                        <GoogleLogin
                            clientId="1088546901368-juqsjp83j8jj39csji2s0n44gp2puevq.apps.googleusercontent.com"
                            buttonText="Continue with Gmail"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>
                <Modal
                    isOpen={signinModalIsOpen}
                    style={customStyles}
                >
                    <div className="fa fa-close" style={{ float: 'right', marginLeft: "15px", color: 'red' }}
                        onClick={() => this.handleModal('signinModalIsOpen', false)}>

                    </div>
                    <form>
                        <div style={{ marginTop: '0px', marginLeft: '40%', fontSize: "20px", color: "blue" }}>Login</div>
                        <label className="form-lable">User Id</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('email', event)} />
                        <label className="form-lable">Password</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('password', event)} />
                        <button className="btn btn-danger" style={{ marginTop: '10px', marginLeft: '35%' }} onClick={this.handleLogin}>Login</button>
                    </form>


                </Modal>
                <Modal
                    isOpen={signupModalIsOpen}
                    style={customStyles}
                >
                    <div className="fa fa-close" style={{ float: 'right', marginLeft: "15px", color: 'red' }}
                        onClick={() => this.handleModal('signupModalIsOpen', false)}>

                    </div>
                    <form>
                        <div style={{ marginTop: '0px', marginLeft: '40%', fontSize: "20px", color: "blue" }}>SignUp</div>
                        <label className="form-lable">Name</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('name', event)} />
                        <label className="form-lable">Email</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('email', event)} />
                        <label className="form-lable">Password</label>
                        <input style={{ width: '370px' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('contactNumber', event)} />
                        <button className="btn btn-danger" style={{ marginTop: '10px', marginLeft: '35%' }} onClick={this.handleSingup}>SignUp</button>
                    </form>


                </Modal>
            </div>

        )
    }
}
export default withRouter(Header);