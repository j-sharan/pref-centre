export default class OktaLogin {
  signIn;
  constructor(config) {
    const { loginWidgetElId, setUser, ...signInConfig } = config;
    this.loginWidgetElId = loginWidgetElId;
    this.setUser = setUser;
    this.signIn = new OktaSignIn(signInConfig)
  }
  async init() {
    try {
      this.signIn.session.get(async (res) => {
        if (res.status === 'ACTIVE') {
          // activate login.
          this.setUser({
            username: res.login,
            userId: res.userId,
          });
        } else {
          this.showSignIn();
        }
      })
    } catch (e) {
      alert('Error', e.message);
    }
  }
  showSignIn() {
    this.signIn.renderEl({ el: '#widget-container'}, (res) => {
      if (res.status === 'SUCCESS') {
        this.signIn.tokenManager.add('id_token', res[0]);
        this.signIn.tokenManager.add('access_token', res[1]);
        alert('Already logged in');
      }
    })
  }
  signOut(callback) {
    return this.signIn.session.close((err) => {
      if (err) {
        return alert('Error while loggin out', err);
      }
      callback();
      this.showSignIn();
    })
  }
}
