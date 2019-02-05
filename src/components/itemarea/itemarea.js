import React, { Component } from 'react';
import { connect } from "react-redux"
import Item from '../item/item';
import { addItemBlock, addItemToBlock } from "../../redux/actions/index";

const mapStateToProps = state => {
  return { itemList: state.itemList, itemBlocks: state.itemBlocks };
}

function mapDispatchToProps(dispatch) {
  return {
    addItemBlock: itemBlock => dispatch(addItemBlock(itemBlock)),
    addItemToBlock: (item, blockID) => dispatch(addItemToBlock(item, blockID)),
  };
}



class ConnectedItemArea extends Component {
  
  
  addItemBlock = () => {
    const { itemBlocks, addItemBlock} = this.props;
    
    const type = `Item Block ${itemBlocks.length + 1}`;
    
    addItemBlock({type, items: []});
  }

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
        { 
          itemList.map((item, key) => {

            if (item[1].maps["10"] !== false || item[1].maps["11"] !== false && item[1].instore !== false) {
              return <Item 
              key={item[0]} 
              itemID={item[0]}
              name={item[1].name}
              img={`http://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item[0]}.png`}
              addItemToBlock={this.addItemToBlock}
            />
            }
          })
          
        }
        <button type="submit" onClick={this.addItemBlock}>Add a new block</button>
      </div>
    )
  }
}

const ItemArea = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemArea);

export default ItemArea;
