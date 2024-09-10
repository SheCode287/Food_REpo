export default class FoodItem {
    constructor() {
      this._id = null;
      this._picture = null;
      this._name = null;
      this._category = null;
    }
  
    setId(id) {
      this._id = id;
    }
  
    setPicture(picture) {
      this._picture = picture;
    }
  
    setName(name) {
      this._name = name;
    }
  
    setCategory(category) {
      this._category = category;
    }
  
    getId() {
      return this._id;
    }
  
    getPicture() {
      return this._picture;
    }
  
    getName() {
      return this._name;
    }
  
    getCategory() {
      return this._category;
    }
  }
  