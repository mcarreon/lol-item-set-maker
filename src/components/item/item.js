import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import { deleteItemFromBlock } from '../../redux/actions/index';


function mapDispatchToProps(dispatch) {
  return {
    deleteItemFromBlock: (item, blockID) => dispatch(deleteItemFromBlock(item, blockID)),
  }
}


class ConnectedItem extends Component {
  
  render() {

    const { img, name, itemID, index, blockID, blockItems, dragID, deleteItemFromBlock} = this.props;
    

    return (
      <Draggable draggableId={dragID} index={index} type="item-block">
        {(provided, snapshot) => (
          <div data-id={itemID} className="item" 
          >
            <img src={img} alt={name + " picture"}   ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}/>
            {blockID !== null ? <button type="submit" onClick={() => deleteItemFromBlock(index, blockID)}></button> : ''}
          </div>
        )}
        
      </Draggable>
    )
  }
}

const Item = connect(null, mapDispatchToProps)(ConnectedItem);

export default Item;