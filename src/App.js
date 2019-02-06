import React, { Component } from 'react';
import Itemsetbuilder from './pages/itemsetbuilder';
import './css/reset.css';
import { DragDropContext } from 'react-beautiful-dnd';
import { addItemBlock, addItemToBlock, addItemSet, deleteItemFromBlock } from "./redux/actions/index";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return { itemList: state.itemList, itemBlocks: state.itemBlocks, itemSets: state.itemSets };
}

function mapDispatchToProps(dispatch) {
  return {
    addItemBlock: itemBlock => dispatch(addItemBlock(itemBlock)),
    addItemToBlock: (item, blockID) => dispatch(addItemToBlock(item, blockID)),
    addItemSet: itemSet => dispatch(addItemSet(itemSet)),
    deleteItemFromBlock: (item, blockID) => dispatch(deleteItemFromBlock(item, blockID)),
  };
}


class ConnectedApp extends Component {
  
  componentDidMount () {
    
  } 

  onDragEnd = (result) => {

    const { addItemToBlock } = this.props;
    const { destination, source, draggableId, type } = result;
    console.log(result);

    if (result.destination === null) {
      if (source.droppableId !== "item-area") {
        deleteItemFromBlock(source.index, source.droppableId);
      }
      return;
    }
    if (!result.destination) {
      
      // if dragging from an item block to null then delete from item block
      //TODO: make more specific
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    

    

    switch (type) {
      case "item-block": 
        if (draggableId.indexOf('-') !== -1) {
          console.log(draggableId);
          let itemCode = draggableId.split('-');
          addItemToBlock(itemCode[0], destination.droppableId);
        } else {
          addItemToBlock(draggableId, destination.droppableId);
        }
        break;
      default:
        break;
    }


  };
  
  render() {
    return (
      <DragDropContext
      onDragEnd={this.onDragEnd}
      
      >
        <Itemsetbuilder />
      </DragDropContext>
      
    );
  }
}


const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;
