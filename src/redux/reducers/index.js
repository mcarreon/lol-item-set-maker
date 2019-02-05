import { ADD_ITEM_BLOCK, ADD_ITEM_TO_BLOCK } from '../constants/action-types.js';
import update from 'immutability-helper';

var champions = require ('../../assets/data/champion.json');
var item = require('../../assets/data/item.json');

const championNames = Object.keys(champions.data);
const items = Object.assign({}, ...Object.keys(item.data).map((key) => {
  return {[Number(key)]: item.data[key]}
})); 
const itemsKeyArray = Object.keys(item.data).map((key) => {
  return [Number(key), item.data[key]]; 
});

const initialState = {
  itemListObj: items,
  itemList: itemsKeyArray,
  itemBlocks: [],
};



function rootReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_ITEM_BLOCK: 
      return { ...state, itemBlocks: [ ...state.itemBlocks, action.payload]}
    case ADD_ITEM_TO_BLOCK:
      return state.itemBlocks.length !== 0 ? update(state, {itemBlocks: { [action.blockID]: {items: {$push: [action.payload] }}}}) : state;
    default:
      return state;
      

  }
}

export default rootReducer;

