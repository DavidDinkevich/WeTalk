
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function LoginView() {
    return (
        <>
            <div style={{position:'absolute', width:'100%', height:'100%', backgroundImage:'url(login_background.png)'}}>
            <div className="container">
                <div className="row justify-content-md-center" style={{marginTop:'20%'}}>
                    <div className="col-xl-6 gy-15" style={{ minWidth: "200px" }}>
                        <label style={{marginTop:'50px', marginRight:'100px', fontSize: '1000%', fontFamily: 'Cascadia Code', 
                                        color:'white', textShadow:'1px black'}}>
                            WeTalk
                        </label>
                    </div>
                    <div className="col" >
                        <div style={{background:'white', borderRadius:'20px', paddingBottom:'20px', paddingTop:'20px'}}>
                        <form className="px-4 py-3" style={{ float: 'center' }}>
                                <div className="mb-3">
                                    {/* <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email address</label> */}
                                    <input type="email" className="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com"
                                        style={{ lineHeight: '3' }}></input>
                                </div>
                                <div className="mb-3">
                                    {/* <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label> */}
                                    <input type="password" className="form-control" id="exampleDropdownFormPassword1" placeholder="Password"
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
                                <button type="submit" className="btn btn-primary">Sign in</button>
                            </form>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="/">New around here? Sign up</a>
                            <a className="dropdown-item" href="/">Forgot password?</a>

                        </div>
                    </div>
                </div>
            </div>


            </div>
            {/* <img src="login_background.png" alt="background" style={{ backgroundSize: 'cover', height: '100%', width: '100%', overflowX: 'hidden', position: 'absolute' }}></img> */}


        </>
    );
}

export default LoginView;


