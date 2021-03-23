import React from 'react';
import { ReactComponent as Logo } from '../../../assets/images/logo.svg';
import { useContext, useDispatch } from '../../../context';

import logo from '../../../assets/images/lock-logo.png';

const Navbar = () => {
  const { loggedIn, dapp, address } = useContext();
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: 'logout', provider: dapp.provider });
  };

  return (
    <div className="navbar px-4 py-3 flex-nowrap">
      <div className="container-fluid flex-nowrap">
        <div className="d-flex align-items-center mr-3">
        <img  src={logo}  alt="logo" width='30px' height="34px" style={{marginRight: '5px'}} />
          <span className="h4 text-nowrap mb-0 p-0">MGStaking Delegation Manager</span>
        </div>
        {loggedIn && (
          <div className="d-flex align-items-center" style={{ minWidth: 0 }}>
            <small className="d-none d-lg-inline text-muted mr-2">Wallet address: </small>
            <small className="text-truncate">{address}</small>
            <a href="/#" onClick={logOut} className="btn btn-primary btn-sm ml-3">
              Close
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
