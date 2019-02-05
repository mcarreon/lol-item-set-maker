import { ADD_ITEM_BLOCK, ADD_ITEM_TO_BLOCK } from "../constants/action-types";


export function addItemBlock (payload) {
  return {
    type: ADD_ITEM_BLOCK, payload
  }
};

export function addItemToBlock (payload, blockID) {
  return {
    type: ADD_ITEM_TO_BLOCK, payload, blockID
  }
};