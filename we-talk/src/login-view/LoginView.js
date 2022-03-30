
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function LoginView() {
    return (
        <>
            <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundImage: 'url(login_background.png)' }}>
                <div className="container" style={{ margin:'0', position:'absolute', top:'50%',
                left: '50%', msTransform: 'translate(-50%, -50%)', transform: 'translate(-50%, -50%)'}}>
                    <div className="row justify-content-md-center" >
                        <div className="col-xl-6 col-lg-12 me-3 gy-15" style={{ minWidth: "100px" }}>
                            <label style={{
                                 fontSize: '1000%', fontFamily: 'Cascadia Code',
                                color: 'white', textShadow: '1px black'
                            }}>
                                WeTalk
                            </label>
                            <h2 style = {{
                                color: 'white', marginTop:'0px'
                            }}>
                                <i>The right way to connect with friends.</i>
                            </h2>
                        </div>
                        <BrowserRouter>
                            <Routes>
                                <Route path='/' element={
                                    <LoginDialog />

                                }></Route>
                                <Route path='/sign-up' element={
                                    <SignupDialog />
                                }></Route>
                            </Routes>
                        </BrowserRouter>
                    </div>
                </div>
            </div>


        </>
    );
}

function LoginDialog() {
    return (
        <div className="col dflex" >
            <div style={{ background: 'white', borderRadius: '20px', paddingBottom: '20px', paddingTop: '20px' }}>
                <form className="px-4 py-3" style={{ float: 'center' }}>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label> */}
                        <input type="email" className="form-control" id="emailField" placeholder="email@example.com"
                            style={{ lineHeight: '3' }}></input>
                    </div>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label> */}
                        <input type="password" className="form-control" id="passwordField" placeholder="Password"
                            style={{ lineHeight: '3'}}></input>
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="dropdownCheck"></input>
                            <label className="form-check-label" htmlFor="dropdownCheck">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign in</button>
                </form>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/sign-up">New around here? Sign up</a>
                <a className="dropdown-item" href="/">Forgot password?</a>

            </div>
        </div>

    );
}

function SignupDialog() {
    return (
        <div className="col" >
            <div style={{ background: 'white', borderRadius: '20px', paddingBottom: '20px', paddingTop: '20px' }}>
                <form className="px-4 py-3" style={{ float: 'center' }}>
                    <div className="mb-3">
                        {/* <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label> */}
                        <input type="email" className="form-control" id="emailField" placeholder="email@example.com"
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
    );
}

export default LoginView;


