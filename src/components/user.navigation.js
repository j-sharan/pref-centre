import { el, mount } from 'redom';

export default class UserNavigation {
  constructor(opts) {
    this.signOutCallback = opts.signOutCallback;
  }

  render (user) {
    const hello = el('div.username', `Hello! ${user.username}`);
    const signOut = el('a.signout', 'Logout');
    signOut.setAttribute('href', '#');
    signOut.addEventListener('click', this.signOutCallback);
    
    const navbar = el(
      'nav.nav-bar',
      [
        el('.left', el('h1.logo', 'Preference Centre')),
        el('.right', [hello, signOut])
      ]
    )
    return navbar;
  }
}
