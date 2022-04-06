import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'



const check = function () {
    if (document.getElementById('passwordField').value ==
        document.getElementById('confirmPassword').value) {
        document.getElementById('message').style.color = 'green';
        document.getElementById('message').innerHTML = 'Passwords match!';
    } else {
        document.getElementById('message').style.color = 'red';
        document.getElementById('message').innerHTML = "Passwords don't match";
    }
}

export function LoginView() {
    const onSubmit = function () {
        const userNameField = document.getElementById('userNameField');
        const passwordField = document.getElementById('passwordField');
        console.log(userNameField.value);
        console.log(passwordField.value);
        window.location.replace("/chat");

    }



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
                            <div style={{ background: 'white', borderRadius: '20px', paddingBottom: '20px', paddingTop: '20px' }}>
                                <form action="" onSubmit={() => { onSubmit(); return false; }} className="px-4 py-3" style={{ float: 'center' }}>
                                    <div className="mb-3">
                                        <div className="input-group has-validation">
                                            <input type="text" className="form-control" placeholder="Username" id="userNameField" aria-describedby="inputGroupPrepend" style={{ lineHeight: '3' }} required pattern="^([a-zA-Z@*#]{1,8})$" title="name must be only with characters." />
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="input-group has-validation">
                                            <input type="password" className="form-control" placeholder="Password" id="passwordField" aria-describedby="inputGroupPrepend" style={{ lineHeight: '3' }} required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." />
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

                                    <button type="submit" className="btn btn-primary" style={{ background: '#0D168F', border: 'white', marginLeft: '0%', marginBottom: '1%', marginTop: '0%' }}>Sign in</button>
                                </form>

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
                            <div style={{ background: 'white', borderRadius: '20px', paddingBottom: '20px', paddingTop: '20px' }}>
                                <form className="px-4 py-3" style={{ float: 'center' }}>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="NameField" aria-describedby="inputGroupPrepend" required pattern="^([a-zA-Z@*#]{1,8})$" title="name must be only with characters." placeholder="Username"
                                            style={{ lineHeight: '3' }}></input>
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="passwordField" required pattern="^([a-zA-Z0-9@*#]{8,100})$" title="password must be alphanumeric, minimum 8 charcters." placeholder="Password"
                                            style={{ lineHeight: '3' }}></input>
                                        
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" onKeyUp={check} className="form-control" id="confirmPassword" placeholder="Confirm Password"
                                            style={{ lineHeight: '3' }}></input>
                                            <span id='message'></span>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
                                            <label className="form-check-label" htmlFor="dropdownCheck">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Sign up</button>

                                </form>

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

