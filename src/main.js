import { el, mount, unmount } from 'redom';

import './global.styles.css';
import OktaLogin from './okta.login';
import UserNavigation from './components/user.navigation';

class Main {
  constructor(rootEl, loginWidgetElId) {
    this.root = document.getElementById(rootEl);
    this.loginWidgetElId = loginWidgetElId;

    this.oktaWidget = null;
    this.navbar = new UserNavigation({
      signOutCallback: this.signOutCallback
    })
    
    this.user = null;
  }

  setUser = (user) => {
    this.user = {
      ...user,
    }
    this.render();
  }

  signOutCallback = () => {
    this.oktaWidget.signOut((err) => {
      this.user = null;
      this.render();
    });
  }

  initialiseOkta() {
    this.oktaWidget = new OktaLogin({
      baseUrl: 'https://login-staging.zeotap.com',
      clientId: '0oa1kkxu0r6xSg2j40x7',
      redirectUri: window.location.origin,
      authParams: {
        pkce: false,
        issuer: 'default',
        responseType: ['code']
      },
      loginWidgetElId: this.loginWidgetElId,
      setUser: this.setUser
    });
    this.oktaWidget.init();
  }

  render() {
    this.root.innerHTML = '';
    if (this.user) {
      const hello = el('div', this.navbar.render(this.user));
      mount(this.root, hello);
    } else {
      this.initialiseOkta();
    }
  }
  init() {
    this.render();
  }
}

new Main('root', 'widget-container').init();
