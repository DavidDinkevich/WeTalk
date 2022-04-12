import { getUserByName, addNewUser, setActiveUser } from '../DataBase';
import { useLocation } from 'react-router-dom';
import { hideMediaUploadView } from '../chat-view/ChatView';
import './login-view.css';
import { useNavigate } from 'react-router-dom';

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

const onSubmitLogin = function (navigate) {
    if (checkUserExists()) {
        const username = document.getElementById(`login_form_username_field`).value;
        const password = document.getElementById('login_form_password_field').value;
        //window.location.replace('/chat');
        navigate('/chat', { state: { username:username,password:password } });
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
    const navigate = useNavigate();
    return (

        <div className="login-view-container background">
            <div className="container inner-container" >
                <div className="row justify-content-md-center" >
                    <div className="col-xl-6 col-lg-12 me-3 gy-15" >
                        <label className="words">
                            WeTalk
                        </label>
                        <h2 className="bottomwords" >
                            <i>The right way to connect with friends.</i>
                        </h2>
                    </div>

                    <div className="col dflex nonvalid" >
                        <div>
                            <div className="mb-3">
                                <div className="input-group has-validation">
                                    <input type="text" className="form-control name" placeholder="Username" id="login_form_username_field" aria-describedby="inputGroupPrepend" required pattern="^([a-zA-Z0-9@*#]{1,30})$" title="name must be alphanumeric." />
                                    <div className="invalid-feedback">
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <div className="input-group has-validation">
                                    <input type="password" className="form-control psswrd" placeholder="Password" id="login_form_password_field" aria-describedby="inputGroupPrepend" required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." />
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

                            <button type="button" onClick={() => {onSubmitLogin(navigate)}} className="btn btn-primary submitlogin" >Sign in</button>
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

        <div className="signupview" >
            <div className="container">
                <div className="row justify-content-md-center" >
                    <div className="col-xl-6 col-lg-12 me-3 gy-15">
                        <label className="wetalkview">
                            WeTalk
                        </label>
                        <h2 className='subtitle'>
                            <i>The right way to connect with friends.</i>
                        </h2>
                    </div>

                    <div className="col">
                        <div className="forms">
                            <div className="mb-3">
                                <input type="text" className="form-control input" id="signup_form_username_field" aria-describedby="inputGroupPrepend" required pattern="^([a-zA-Z0-9@*#]{1,30})$" title="name must be alphanumeric." placeholder="Username"
                                ></input>
                            </div>
                            <div id='not_valid_user_name_msg'> </div>
                            <div className="mb-3">
                                <input type="text" className="form-control input" id="signup_form_displayName_field" aria-describedby="inputGroupPrepend" required pattern="^([a-zA-Z0-9@*#]{1,30})$" title="name must be alphanumeric." placeholder="Display name"
                                ></input>
                            </div>
                            <div className="mb-3">
                                <div className="input-group has-validation">
                                    <input type="password" className="form-control input" id="signup_form_password_field" required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." placeholder="Password"
                                    ></input>
                                    <div className="invalid-feedback">
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <input type="password" onKeyUp={checkPasswordsMatch} className="form-control password-input" id="signup_form_confirm_password" placeholder="Confirm Password"
                                    ></input>
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


                            <button type="button" onClick={onSubmitSignup} className="btn btn-primary submitsignup"  >Sign up</button>


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

