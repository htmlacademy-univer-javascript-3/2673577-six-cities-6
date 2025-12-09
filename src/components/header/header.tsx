import React from 'react';
import {HeaderLogo} from '../header-logo/header-logo.tsx';
import {HeaderNav} from '../header-nav/header-nav.tsx';

export const Header = React.memo(() => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <HeaderLogo />
        <HeaderNav />
      </div>
    </div>
  </header>
));

Header.displayName = 'Header';
