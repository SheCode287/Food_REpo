export default class FoodList {
    constructor() {
      this._list = [];
    }
  
    getList() {
      return this._list;
    }
  
    addItemToList(foodItem) {
      this._list.push(foodItem);
    }
  // if the current fooditem id is not equal the id provided, the food item is kept in new array else it is excluded from the new array created by filter method
    removeItemFromList(id) {
      this._list = this._list.filter(item => item.getId() !== id);
    }

  
    clearList() {
      this._list = [];
    }
  }
  