import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export function LoginView() {
    const onSubmit = function () {
        const userNameField = document.getElementById('userNameField');
        const passwordField = document.getElementById('passwordField');
        console.log(userNameField.value);
        console.log(passwordField.value);
    }


return (
    <>
        <div style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg)', width: '100vw', height: '100vh' }}>
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
                            <form novalidate className="px-4 py-3" style={{ float: 'center' }}>
                                <div className="mb-3">
                                    <div className="input-group has-validation">
                                        <input type="text" className="form-control" placeholder="nameExample" id="validationCustomUsername" aria-describedby="inputGroupPrepend" required style={{ lineHeight: '3' }}  pattern="^([a-zA-Z@*#]{1,8})$" title="name must be only with characters." />
                                        <div className="invalid-feedback">
                                            Please choose a username.
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <div className="input-group has-validation">
                                        <input type="password" className="form-control" placeholder="Password" id="passwordField" aria-describedby="inputGroupPrepend" required style={{ lineHeight: '3' }} pattern="^([a-zA-Z0-9@*#]{1,8})$" title="password must be alphanumeric, and no more than 8 charcters."/>
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

                                <button type="submit" className="btn btn-primary" style={{ marginLeft: '0%', marginBottom: '1%', marginTop: '0%' }} onClick={onSubmit}>Sign in</button>
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
            <div style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg)', width: '100vw', height: '100vh' }}>
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
                                        {/* <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label> */}
                                        <input type="email" className="form-control" id="emailField" placeholder="nameExample"
                                            style={{ lineHeight: '3' }}></input>
                                    </div>
                                    <div className="mb-3">
                                        {/* <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label> */}
                                        <input type="password" className="form-control" id="passwordField" placeholder="Password"
                                            style={{ lineHeight: '3' }}></input>
                                    </div>
                                    <div className="mb-3">
                                        <input type="text" className="form-control" id="displayNameField" placeholder="Display name"
                                            style={{ lineHeight: '3' }}></input>
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

