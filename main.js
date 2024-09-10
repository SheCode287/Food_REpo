// 

import FoodItem from './fooditem.js';
import FoodList from './foodlist.js';

const foodList = new FoodList();
let isEditing = false;
let editingId = null;

document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    initApp();
  }
});

const initApp = () => {
  const foodEntryForm = document.getElementById('foodEntryForm');
  foodEntryForm.addEventListener('submit', event => {
    event.preventDefault();
    processSubmission();
  });

  const clearAllItemsBtn = document.getElementById('clearAllItems');
  clearAllItemsBtn.addEventListener('click', () => {
    if (foodList.getList().length) {
      const confirmed = confirm('Are you sure you want to clear all items?');
      if (confirmed) {
        foodList.clearList();
        refreshPage();
      }
    }
  });

  const clearCheckedItemsBtn = document.getElementById('clearCheckedItems');
  clearCheckedItemsBtn.addEventListener('click', () => {
    deleteCheckedItems();
  });
};

const processSubmission = () => {
  const pictureValue = document.getElementById('picture');
  const name = document.getElementById('name').value.trim();
  const category = document.getElementById('category').value;

  if (!name || !category) return;
  
  let picture = '';
  if (pictureValue.files.length > 0){
    const file = pictureValue.files[0];

    picture = URL.createObjectURL(file)
  }
  if (isEditing) {
    const item = foodList.getList().find(item => item.getId() === editingId);
    item.setPicture(picture);
    item.setName(name);
    item.setCategory(category);
    isEditing = false;
    editingId = null;
    document.getElementById('submitBtn').textContent = 'Add Food';
  } else {
    const newFoodItem = createFoodItem(picture, name, category);
    foodList.addItemToList(newFoodItem);
  }

  refreshPage();
};

const createFoodItem = (picture, name, category) => {
  const foodItem = new FoodItem();
  foodItem.setId(generateNextId());
  foodItem.setPicture(picture);
  foodItem.setName(name);
  foodItem.setCategory(category);
  return foodItem;
};

const generateNextId = () => {
  const list = foodList.getList();
  if (list.length > 0) {
    return list[list.length - 1].getId() + 1;
  }
  return 1;
};

const refreshPage = () => {
  clearDisplay();
  renderList();
};

const clearDisplay = () => {
  const foodListDiv = document.getElementById('foodList');
  foodListDiv.innerHTML = '';
};

const renderList = () => {
  const list = foodList.getList();
  const foodListDiv = document.getElementById('foodList');

  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'food-item';

    const img = document.createElement('img');
    img.src = item.getPicture();
    img.alt = item.getName();
    img.width =260;
    img.style.border='2px solid black'
    img.style.padding='4px'
    img.style.borderRadius='14px'

    const span = document.createElement('span');
    span.textContent = `${item.getName()} - ${item.getCategory()}`;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.dataset.id = item.getId();

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      editItem(item.getId());
    });

    div.appendChild(checkBox);
    div.appendChild(img);
    div.appendChild(span);
    div.appendChild(editBtn);
    foodListDiv.appendChild(div);
  });
};

const editItem = id => {
  const item = foodList.getList().find(item => item.getId() === id);
  if (item) {
    document.getElementById('picture').value = item.getPicture();
    document.getElementById('name').value = item.getName();
    document.getElementById('category').value = item.getCategory();
    isEditing = true;
    editingId = id;
    document.getElementById('submitBtn').textContent = 'Update Food';
  }
};

const deleteCheckedItems = () => {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    foodList.removeItemFromList(Number(checkbox.dataset.id));
  });
  refreshPage();
};
