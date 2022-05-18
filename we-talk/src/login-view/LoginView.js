import { getUserByName, addNewUser, setActiveUser, login } from '../DataBase';
import './login-view.css';
import { useNavigate } from 'react-router-dom';

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
    let user = getUserByName(userNameField.value);

    if (user == null || user.password != passwordField.value) {
        document.getElementById('user_not_exist_msg').style.color = 'red';
        document.getElementById('user_not_exist_msg').innerHTML = "User doesn't exist, please sign up first"
        return false;
    }
    return true;
}

const onSubmitLogin = async function (navigate) {
    const username = document.getElementById(`login_form_username_field`).value;
    const password = document.getElementById(`login_form_password_field`).value;

    const onSuccess = function() {
        setActiveUser(username);
        navigate('/chat', { state: { username:username } });
    }
    const onFail = function() {
        //...
    }

    await login(username, password, onSuccess, onFail);

    // login(username, password);
    // if (checkUserExists()) {
    //     setActiveUser(username);
    //     navigate('/chat', { state: { username:username } });
    // }
}

const onSubmitSignup = function (navigate) {
    const username = document.getElementById(`signup_form_username_field`).value;
    const displayName = document.getElementById(`signup_form_displayName_field`).value;
    const password = document.getElementById('signup_form_password_field').value;
    const imageField = document.getElementById('upload');

    if (isUserNameValid() && isPasswordValid() && checkPasswordsMatch() && getUserByName(username) === undefined) {
        var fReader = new FileReader();
        if (imageField.files.length > 0) {
            fReader.readAsDataURL(imageField.files[0]);

            fReader.onloadend = function (event) {
                addNewUser({ username: username, displayName: displayName, password: password, image: event.target.result });
                setActiveUser(username);
                navigate('/chat', { state: { displayname: displayName } });
            }    
        // window.location.replace('/');
        } else {
            addNewUser({ username: username, displayName: displayName, password: password, image: 'anonymous_profile.webp' });
            setActiveUser(username);
            navigate('/chat', { state: { displayname: displayName } });
        }
    }
    else if (getUserByName(username) !== undefined) {
        alert("Username is already taken, please choose another");
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
    if (displayName === '') {
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
    const navigate = useNavigate();

    const showProfilePhoto = function() {
        let inputField = document.getElementById('upload');
        if (inputField.files.length > 0) {
            var fReader = new FileReader();
            fReader.readAsDataURL(inputField.files[0]);            
            fReader.onloadend = function (event) {
                let profilePhoto = document.getElementById('profile-photo');
                profilePhoto.src = event.target.result;
            }
        }
    }

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
                                <input type="file" id="upload" accept="image/*" onChange={showProfilePhoto} hidden />
                                <label className="addPhoto btn btn-primary" id="photo" htmlFor="upload" style={{width:'200px'}}>Add profile photo</label>
                                <img id='profile-photo' src="anonymous_profile.webp" style={{marginLeft: "30px", width:'40px', height:'40px'}}></img>
                            </div>


                            <button type="button"  onClick={() => {onSubmitSignup(navigate)}} className="btn btn-primary submitsignup"  >Sign up</button>


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

