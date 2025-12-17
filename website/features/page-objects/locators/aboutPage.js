class AboutPage {

  async burgerMenu() { return $('#react-burger-menu-btn'); }
  async aboutMenu() { return $('#about_sidebar_link'); }
  async signUpButton() { return $('button=Sign up for free'); }
  async bookButton() { return $('button=Book a demo'); }
 
}
export default new AboutPage();
