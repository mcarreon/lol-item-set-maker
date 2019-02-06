import React, { Component } from 'react'
import Item from '../item/item';
import { Droppable } from 'react-beautiful-dnd';


export default class Itemblock extends Component {

  // needs an array of items

  
  render() {

    const { itemListObj, blocks, blockID, setID } = this.props;
    let items = [];
    
    // If block already has items then display the items
    if (blocks[blockID] !== undefined && blocks[blockID].items.length !== 0)  {
      items = blocks[blockID].items; 
    } 

    


    return (
      <div data-block-id={blockID} className="item-block">
        <p>{this.props.type}</p>
        <Droppable droppableId={`${blockID}`} type="item-block" direction="horizontal" setID={setID}>
          {(provided, snapshot) => (
            <div
              ref={ provided.innerRef }
              style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
              {...provided.droppableProps}
              className="item-block-droppable"
            >
            {
              items.map((item, i) => {
                
                // sets draggableID and handles duplicates
                let dragID = `${item}-${blockID}-${i}`;

                return <Item
                key={i}
                index={i} 
                itemID={item}
                blockID={blockID}
                blockItems={items}
                name={itemListObj[item].name}
                dragID={dragID}
                img={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item}.png`}
                />
              })
            }
            {provided.placeholder}
          </div>
          )}
        </Droppable>
      </div>
    )
  }
}
