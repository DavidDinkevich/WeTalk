import { getUserByName, addNewUser } from '../DataBase';
import { useLocation } from 'react-router-dom';

const checkPasswordsMatch = function () {
    let passwordFieldID = `signup_form_password_field`;
    let passwordVerifyFieldID = `signup_form_confirm_password`;
    if (document.getElementById(passwordFieldID).value ==
        document.getElementById(passwordVerifyFieldID).value) {
        document.getElementById('pswd_match_msg_id').style.color = 'green';
        document.getElementById('pswd_match_msg_id').innerHTML = 'Passwords match!';
        return true;
    } else {
        document.getElementById('pswd_match_msg_id').style.color = 'red';
        document.getElementById('pswd_match_msg_id').innerHTML = "Passwords don't match";
        return false;
    }
}

const checkUserExists = function () {
    const userNameField = document.getElementById('login_form_username_field');
    const passwordField = document.getElementById('login_form_password_field');
    console.log(userNameField.value);
    console.log(passwordField.value);
    let user = getUserByName(userNameField.value);

    if (user == null || user.password != passwordField.value) {
        document.getElementById('user_not_exist_msg').style.color = 'red';
        document.getElementById('user_not_exist_msg').innerHTML = "User doesn't exist - please sign up before!"
        return false;
    }
    return true;
}

const onSubmitLogin = function () {
    if (checkUserExists()) {
        const userName = document.getElementById(`login_form_username_field`).value;
        const password = document.getElementById('login_form_password_field').value;
        window.location.replace('/chat');
        console.log('the user exist');
    }
}

const onSubmitSignup = function () {

    console.log('in submit sign up');

    if (checkPasswordsMatch()) {
        const userName = document.getElementById(`signup_form_username_field`).value;
        const password = document.getElementById('signup_form_password_field').value;
        console.log(userName);
        console.log(password);
        addNewUser({ name: userName, password: password, image: '' });
        window.location.replace('/chat');


    }
}

export function LoginView() {
    return (
        <>
            <div style={{ backgroundImage: '/main_background.png', width: '100vw', height: '100vh' }}>
                <div className="container" style={{ margin: '100', paddingTop: '7%', left: '50%' }}>
                    <div className="row justify-content-md-center" >
                        <div className="col-xl-6 col-lg-12 me-3 gy-15" style={{ paddingLeft: '0%' }}>
                            <label style={{
                                fontSize: '1000%', fontFamily: 'Cascadia Code',
                                color: 'white', textShadow: '1px black'
                            }}>
                                WeTalk
                            </label>
                            <h2 style={{
                                color: 'white', marginTop: '-6%', marginLeft: '2%'
                            }}>
                                <i>The right way to connect with friends.</i>
                            </h2>
                        </div>

                        <div className="col dflex" >
                            <div style={{ background: 'white', borderRadius: '20px', padding: '2%' }}>

                                <div className="mb-3">
                                    <div className="input-group has-validation">
                                        <input type="text" className="form-control" placeholder="Username" id="login_form_username_field" aria-describedby="inputGroupPrepend" style={{ lineHeight: '3' }} required pattern="^([a-zA-Z0-9@*#]{1,30})$" title="name must be alphanumeric." />
                                        <div className="invalid-feedback">
                                            Please choose a username.
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="input-group has-validation">
                                        <input type="password" className="form-control" placeholder="Password" id="login_form_password_field" aria-describedby="inputGroupPrepend" style={{ lineHeight: '3' }} required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." />
                                        <div className="invalid-feedback">
                                            Please choose a username.
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
                                        <label className="form-check-label" htmlFor="dropdownCheck">
                                            Remember me
                                        </label>
                                    </div>
                                </div>

                                <button type="button" onClick={onSubmitLogin} className="btn btn-primary" style={{ background: '#0D168F', border: 'white', marginLeft: '0%', marginBottom: '1%', marginTop: '0%' }} >Sign in</button>
                                <br />

                                <span id='user_not_exist_msg'></span>


                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/sign-up">New around here? Sign up</a>
                                <a className="dropdown-item" href="/">Forgot password?</a>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

export function SignupView() {
    return (
        <>
            <div style={{ backgroundImage: '/main_background.png', width: '100vw', height: '100vh' }}>
                <div className="container" style={{ margin: '100', paddingTop: '7%', left: '50%' }}>
                    <div className="row justify-content-md-center" >
                        <div className="col-xl-6 col-lg-12 me-3 gy-15" style={{ paddingLeft: '0%' }}>
                            <label style={{
                                fontSize: '1000%', fontFamily: 'Cascadia Code',
                                color: 'white', textShadow: '1px black'
                            }}>
                                WeTalk
                            </label>
                            <h2 style={{
                                color: 'white', marginTop: '-6%', marginLeft: '2%'
                            }}>
                                <i>The right way to connect with friends.</i>
                            </h2>
                        </div>

                        <div className="col" >
                            <div style={{ background: 'white', borderRadius: '20px', padding: '2%' }}>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="signup_form_username_field" aria-describedby="inputGroupPrepend" required pattern="^([a-zA-Z0-9@*#]{1,30})$" title="name must be alphanumeric." placeholder="Username"
                                        style={{ lineHeight: '3' }}></input>
                                </div>
                                <div className="mb-3">
                                    <input type="password" className="form-control" id="signup_form_password_field" required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." placeholder="Password"
                                        style={{ lineHeight: '3' }}></input>

                                </div>
                                <div className="mb-3">
                                    <input type="password" onKeyUp={checkPasswordsMatch} className="form-control" id="signup_form_confirm_password" placeholder="Confirm Password"
                                        style={{ lineHeight: '3' }}></input>
                                    <span id='pswd_match_msg_id'></span>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check">
                                        <input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
                                        <label className="form-check-label" htmlFor="dropdownCheck">
                                            Remember me
                                        </label>
                                    </div>
                                </div>


                                <button type="button" onClick={onSubmitSignup} className="btn btn-primary" style={{ background: '#0D168F', border: 'white' }} >Sign up</button>


                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="/">Already have an account? Sign in</a>
                                <a className="dropdown-item" href="/">Forgot password?</a>
                            </div>
                        </div>



                    </div>
                </div>
            </div>


        </>
    );
}

