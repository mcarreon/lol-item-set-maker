import React, { Component } from 'react';
import { connect } from "react-redux";
import Item from '../item/item';
import { addItemBlock, addItemToBlock, addItemSet } from "../../redux/actions/index";
import { Droppable } from 'react-beautiful-dnd';

const mapStateToProps = state => {
  return { itemList: state.itemList, itemBlocks: state.itemBlocks, itemSets: state.itemSets };
}

function mapDispatchToProps(dispatch) {
  return {
    addItemBlock: itemBlock => dispatch(addItemBlock(itemBlock)),
    addItemToBlock: (item, blockID) => dispatch(addItemToBlock(item, blockID)),
    addItemSet: itemSet => dispatch(addItemSet(itemSet)),
  };
}

class InnerItemList extends Component {

  shouldComponentUpdate(nextProps) {
    console.log('rerender')

    if (this.props.itemList === nextProps.itemList) {
      return false;
    }
    return true;
  }

  render() {
    const { itemList, addItemToBlock } = this.props;
    return itemList.map((item, i) => {
    
      if (item[1].maps["10"] !== false || item[1].maps["11"] !== false && item[1].instore !== false) {
        return <Item 
        key={item[0]} 
        itemID={item[0]}
        name={item[1].name}
        blockID={ null }
        dragID={`${item[0]}`}
        img={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item[0]}.png`}
        addItemToBlock={ addItemToBlock }
        index={i}
      />
      }
    })
    
  }
}



class ConnectedItemArea extends Component {
  //Holds all the Items

  addItemToBlock = (itemID) => {
    const { addItemToBlock } = this.props;
    
    //console.log(itemID);
    const blockID = 0;
    
    addItemToBlock(itemID, blockID);
  }

  render() {

    const { itemList, addItemToBlock } = this.props;
    

    return (
      
      <div>
        <Droppable droppableId={`item-area`} isDropDisabled={true} type="item-block">
          {(provided, snapshot) => (
            <div
              ref={ provided.innerRef }
              style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
              {...provided.droppableProps}
              >
              <InnerItemList 
              itemList={itemList}
              addItemToBlock={addItemToBlock}
              />
            { provided.placeholder ? (this.renderImagePlaceholder()) : null }
          </div>
          )}
        </Droppable>
      </div>
    )
  }
}

const ItemArea = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemArea);

export default ItemArea;
