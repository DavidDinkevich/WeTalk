import { getUserByName, addNewUser, setActiveUser } from '../DataBase';
import { useLocation } from 'react-router-dom';
import { hideMediaUploadView } from '../chat-view/ChatView';

const chooseFile = function (textField) {
    const textFieldElement = document.getElementById(textField);
    textFieldElement.click();
}

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
        const displayName = document.getElementById(`login_form_username_field`).value;
        const password = document.getElementById('login_form_password_field').value;
        window.location.replace('/chat');
        console.log('the user exist');
    }
}

const onSubmitSignup = function () {
    const displayName = document.getElementById(`signup_form_username_field`).value;
    const password = document.getElementById('signup_form_password_field').value;

    console.log('in submit sign up');
    if (isUserNameValid()) {
        if (isPasswordValid()) {
            if (checkPasswordsMatch()) {
                console.log(password);
                addNewUser({ name: displayName, password: password, image: '' });
                window.location.replace('/');
            }
        }

    }

}

function isPasswordValid() {
    var password = document.getElementById('signup_form_password_field').value;
    if (password == '') {
        document.getElementById('not_valid_password_msg').style.color = 'red';
        document.getElementById('not_valid_password_msg').innerHTML = "Password can't be empty"
        return false;
    }
    else if (password.length < 8) {
        document.getElementById('not_valid_password_msg').style.color = 'red';
        document.getElementById('not_valid_password_msg').innerHTML = "Password must be at least 8 characters"
        return false;
    }
    else if (password.search(/[a-z]/i) < 0) {
        document.getElementById('not_valid_password_msg').style.color = 'red';
        document.getElementById('not_valid_password_msg').innerHTML = "Password must be alphanumeric"
        return false;
    }
    else if (password.search(/[0-9]/) < 0) {
        document.getElementById('not_valid_password_msg').style.color = 'red';
        document.getElementById('not_valid_password_msg').innerHTML = "Password must be alphanumeric"
        return false;
    }
    return true;

}

function isUserNameValid() {
    var displayName = document.getElementById(`signup_form_username_field`).value;
    if (displayName == '') {
        document.getElementById('not_valid_user_name_msg').style.color = 'red';
        document.getElementById('not_valid_user_name_msg').innerHTML = "User name can't be empty"
        return false;
    }
    if (displayName.search(/[a-z]/i) < 0) {
        document.getElementById('not_valid_user_name_msg').style.color = 'red';
        document.getElementById('not_valid_user_name_msg').innerHTML = "User name  must be alphanumeric"
        return false;
    }
    if (displayName.search(/[0-9]/) < 0) {
        document.getElementById('not_valid_user_name_msg').style.color = 'red';
        document.getElementById('not_valid_user_name_msg').innerHTML = "User name  must be alphanumeric"
        return false;
    }
    return true;
}

export function LoginView() {
    return (

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
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="input-group has-validation">
                                    <input type="password" className="form-control" placeholder="Password" id="login_form_password_field" aria-describedby="inputGroupPrepend" style={{ lineHeight: '3' }} required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." />
                                    <div className="invalid-feedback">
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                {/*<div className="form-check">
                                    <input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
                                    <label className="form-check-label" htmlFor="dropdownCheck">
                                        Remember me
                    </label>
                                </div>*/}
                            </div>

                            <button type="button" onClick={onSubmitLogin} className="btn btn-primary" style={{ background: '#5DC3E7', border: 'white', marginLeft: '0%', marginBottom: '1%', marginTop: '0%' }} >Sign in</button>
                            <br />

                            <span id='user_not_exist_msg'></span>


                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/sign-up">New around here? Sign up</a>
                            {/*<a className="dropdown-item" href="/">Forgot password?</a>*/}

                        </div>
                    </div>

                </div>
            </div>
        </div>


    );
}

export function SignupView() {
    return (

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
                            <div id='not_valid_user_name_msg'> </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" id="signup_form_displayName_field" aria-describedby="inputGroupPrepend" required pattern="^([a-zA-Z0-9@*#]{1,30})$" title="name must be alphanumeric." placeholder="Display name"
                                    style={{ lineHeight: '3' }}></input>
                            </div>
                            <div className="mb-3">
                                <div className="input-group has-validation">
                                    <input type="password" className="form-control" id="signup_form_password_field" required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." placeholder="Password"
                                        style={{ lineHeight: '3' }}></input>
                                    <div className="invalid-feedback">
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input type="password" onKeyUp={checkPasswordsMatch} className="form-control" id="signup_form_confirm_password" placeholder="Confirm Password"
                                        style={{ lineHeight: '3', marginTop: '3%' }}></input>
                                    <span id='pswd_match_msg_id'></span>
                                </div>
                                <div id='not_valid_password_msg'>
                                </div>
                            </div>

                            <div className="mb-3">
                                {/*} <input className="form-control image form1" placeholder='Image'></input>*/}
                                <input type="file" id="upload" accept="image/*" hidden />
                                <label className="addPhoto btn btn-primary" id="photo" for="upload" >Add image</label>
                            </div>


                            <button type="button" onClick={onSubmitSignup} className="btn btn-primary" style={{ background: '#5DC3E7', border: 'white', marginTop: '-3.5%' }} >Sign up</button>


                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">Already have an account? Sign in</a>
                            {/*<a className="dropdown-item" href="/">Forgot password?</a>*/}
                        </div>
                    </div>



                </div>
            </div>
        </div>


    );
}

