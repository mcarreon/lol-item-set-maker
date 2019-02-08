import { ADD_ITEM_BLOCK, ADD_ITEM_TO_BLOCK, ADD_ITEM_SET, DELETE_ITEM_FROM_BLOCK, SAVE_ITEM_SET } from "../constants/action-types";


export function addItemBlock (payload, setID) {
  return {
    type: ADD_ITEM_BLOCK, payload, setID
  }
};

export function addItemToBlock (payload, blockID) {
  return {
    type: ADD_ITEM_TO_BLOCK, payload, blockID
  }
};

export function addItemSet (payload) {
  return {
    type: ADD_ITEM_SET, payload
  }
};

export function deleteItemFromBlock (payload, blockID) {
  return {
    type: DELETE_ITEM_FROM_BLOCK, payload, blockID
  }
};

export function saveItemSet () {
  return {
    type: SAVE_ITEM_SET
  };
};