import { ADD_ITEM_BLOCK, ADD_ITEM_TO_BLOCK, ADD_ITEM_SET, DELETE_ITEM_FROM_BLOCK, SAVE_ITEM_SET, SWITCH_ITEM_SET, CLEAR_ITEM_SETS, CLEAR_BLOCKS_FROM_SET, DELETE_BLOCK_FROM_SET } from '../constants/action-types.js';
import update from 'immutability-helper';

var champions = require ('../../assets/data/champion.json');
var item = require('../../assets/data/item.json');

//console.log(champions.data);

const champs = Object.keys(champions.data).map((key) => {
  return { id: champions.data[key].id.toLowerCase(), name: champions.data[key].name, src: champions.data[key].id,  tags: champions.data[key].tags}
});

//console.log(champs);

const championNames = Object.keys(champions.data);

const items = Object.assign({}, ...Object.keys(item.data).map((key) => {
  return {[Number(key)]: item.data[key]}
}));

console.log(items);
const itemsKeyArray = Object.keys(item.data).map((key) => {
  return [Number(key), JSON.parse(JSON.stringify(item.data[key]))]; 
});




const initialState = {
  itemListObj: items,
  itemList: itemsKeyArray,
  itemBlocks: [],
  itemSets: [],
  curItemSet: null,
  champs: champs,
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
        //console.log('test');
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

    // * switches the item set the user is editing
    case SWITCH_ITEM_SET:
      if (state.curItemSet === null) {
        return update(state, { curItemSet: {$set: state.itemSets[action.payload]} })
      }
      return state;

    // * clears all user sets
    case CLEAR_ITEM_SETS:
      return update(state, { itemSets: {$set: []}, curItemSet: {$set: null}});
    
    //* clears all blocks in specific set
    case CLEAR_BLOCKS_FROM_SET:
      return update(state, { curItemSet: {blocks: {$set: []}}});

    // * Deletes item from specified block id
    case DELETE_ITEM_FROM_BLOCK:
      return state.curItemSet !== null ? update(state, {curItemSet: {blocks: {
        [action.blockID]: { items: {$splice: [[action.itemID, 1]]}} 
      }}}) : state;
    
      // * Deletes specified block from current set
    case DELETE_BLOCK_FROM_SET:
      return state.curItemSet !== null ? update(state, {curItemSet: {blocks: {
        $splice: [[action.blockID, 1]]}}}) : state;

    default:
      return state;
      

  }
}

export default rootReducer;

