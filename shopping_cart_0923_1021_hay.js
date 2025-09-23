// 代码生成时间: 2025-09-23 10:21:25
class ShoppingCart {
  /**
   * Creates a new instance of the ShoppingCart.
   */
  constructor() {
    this.items = []; // Holds the items in the cart
  }

  /**
   * Adds an item to the shopping cart.
   * @param {Object} item - The item to be added to the cart.
   * @param {string} item.id - Unique identifier for the item.
   * @param {string} item.name - Name of the item.
   * @param {number} item.price - Price of the item.
   * @param {number} quantity - The quantity of the item to add.
   */
  addItem(item, quantity) {
    if (!item || typeof item !== 'object' || !item.id || !item.name || !item.price) {
      throw new Error('Invalid item format.');
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
      throw new Error('Invalid quantity.');
    }
    // Check if the item already exists in the cart
    const existingItem = this.items.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      // If found, update the quantity
      existingItem.quantity += quantity;
    } else {
      this.items.push({ ...item, quantity: quantity });
    }
  }

  /**
   * Removes an item from the shopping cart.
   * @param {string} itemId - The ID of the item to be removed.
   * @param {number} quantity - The quantity of the item to remove.
   */
  removeItem(itemId, quantity) {
    if (!itemId) {
      throw new Error('Item ID is required.');
    }
    if (typeof quantity !== 'number' || quantity <= 0) {
      throw new Error('Invalid quantity.');
    }
    this.items = this.items.filter(item => {
      if (item.id === itemId) {
        if (item.quantity > quantity) {
          item.quantity -= quantity;
          return true;
        } else {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Clears the shopping cart.
   */
  clearCart() {
    this.items = [];
  }

  /**
   * Gets the total price of all items in the cart.
   * @returns {number} The total price.
   */
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Returns the list of items in the cart.
   * @returns {Array} The items in the cart.
   */
  getItems() {
    return this.items;
  }
}

// Example usage:
const cart = new ShoppingCart();
cart.addItem({ id: '001', name: 'Item 1', price: 10 }, 2);
cart.addItem({ id: '002', name: 'Item 2', price: 20 }, 1);
console.log('Total Price:', cart.getTotalPrice()); // Output: Total Price: 40
cart.removeItem('001', 1);
console.log('Updated Cart:', cart.getItems()); // Output: Updated Cart: [{ id: '001', name: 'Item 1', price: 10, quantity: 1 }, { id: '002', name: 'Item 2', price: 20, quantity: 1 }]
