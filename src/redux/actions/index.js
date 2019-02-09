import { ADD_ITEM_BLOCK, ADD_ITEM_TO_BLOCK, ADD_ITEM_SET, DELETE_ITEM_FROM_BLOCK, SAVE_ITEM_SET, SWITCH_ITEM_SET, CLEAR_ITEM_SETS, CLEAR_BLOCKS_FROM_SET, DELETE_BLOCK_FROM_SET } from "../constants/action-types";


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

export function deleteItemFromBlock (itemID, blockID) {
  return {
    type: DELETE_ITEM_FROM_BLOCK, itemID, blockID
  }
};

export function deleteBlockFromSet (blockID) {
  return {
    type: DELETE_BLOCK_FROM_SET, blockID
  }
};

export function saveItemSet () {
  return {
    type: SAVE_ITEM_SET
  };
};

export function switchItemSet (payload) {
  return {
    type: SWITCH_ITEM_SET, payload
  };
};

export function clearSets () {
  return {
    type: CLEAR_ITEM_SETS
  }
};

export function clearBlocks () {
  return {
    type: CLEAR_BLOCKS_FROM_SET
  }
}