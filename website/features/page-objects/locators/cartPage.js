class CartPage {

  async userNameField() { return $('#user-name'); }
  async passwordField() { return $('#password'); }
  async loginButton() { return $('#login-button'); }
  async title() { return $('.title'); }
  async addItemsToCart(items) { return $(`#add-to-cart-${items}`); }
  async itemsCount(){ return $(`.shopping_cart_badge`); }
  async cart(){ return $(`.shopping_cart_link`); }
  async titleItems(){ return $(`.inventory_item_name`); }

}
export default new CartPage();
