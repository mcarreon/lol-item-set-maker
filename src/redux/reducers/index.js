import { ADD_ITEM_BLOCK, ADD_ITEM_TO_BLOCK, ADD_ITEM_SET, DELETE_ITEM_FROM_BLOCK, SAVE_ITEM_SET } from '../constants/action-types.js';
import update from 'immutability-helper';

var champions = require ('../../assets/data/champion.json');
var item = require('../../assets/data/item.json');

console.log(champions.data);
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
  itemSets: [],
  curItemSet: null,
  champNames: championNames,
};



function rootReducer(state = initialState, action) {
  switch (action.type) {

    // * Adds item block to current item set
    case ADD_ITEM_BLOCK: 
      return state.curItemSet !== null ? update(state, {curItemSet: {blocks: {$push: [action.payload]}}}) : state;
    
    // * Adds item to block with specified blockID
    case ADD_ITEM_TO_BLOCK:
      return state.curItemSet !== null ? update(state, {curItemSet: { blocks: {[action.blockID]: {items: {$push: [action.payload] }}}}}) : state;
    
    //* Saves item set and frees up current item set slot 
    case SAVE_ITEM_SET: 
      if (state.curItemSet !== null) {
        console.log('test');
        return update(state, { itemSets: {[state.curItemSet.setID]: {$set: state.curItemSet}}, curItemSet: {$set: null}})
      }
      return state;
    // * Adds initial item set to current position and pushes to item set bank
    // * additional item set creation updates current item set in bank, then replaces it
    case ADD_ITEM_SET: 
      if (state.curItemSet === null) {
        return update(state, { curItemSet: {$set: action.payload}, itemSets: {$push: [action.payload]}});
      }
      return state;
    
      // * Deletes item from specified block id
    case DELETE_ITEM_FROM_BLOCK:
      return state.curItemSet !== null ? update(state, {curItemSet: {blocks: {
        [action.blockID]: { items: {$splice: [[action.payload, 1]]}} 
      }}}) : state;

    default:
      return state;
      

  }
}

export default rootReducer;

