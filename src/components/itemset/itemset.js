import React, { Component } from 'react';
import { connect } from "react-redux";
import ItemBlock from '../itemblock/itemblock';

const mapStateToProps = state => {
  return { itemBlocks: state.itemBlocks, itemList: state.itemList, itemListObj: state.itemListObj};
}



class ConnectedItemSet extends Component {
  
  //needs to know champ
  //needs to know map
  //needs to have array of item blocks
  //need to create delete or update
  
  
  render() {

    const { itemList, itemBlocks, itemListObj } = this.props;
    
    return (
      <div>
        {
          itemBlocks.map((block, i) => {
            
            return <ItemBlock 
            key={i}
            type={block["type"]}
            id={i}
            itemListObj={itemListObj}
            itemBlocks={itemBlocks}
            />
          })
        }
      </div>
    )
  }
}

const ItemSet = connect(mapStateToProps)(ConnectedItemSet);

export default ItemSet;