import React, { Component } from 'react';
import { connect } from "react-redux";
import ItemBlock from '../itemblock/itemblock';
import { addItemBlock } from "../../redux/actions/index";


const mapStateToProps = state => {
  return { itemList: state.itemList, itemListObj: state.itemListObj, itemSets: state.itemSets, curItemSet: state.curItemSet };
}

function mapDispatchToProps(dispatch) {
  return {
    addItemBlock: (itemBlock, setID) => dispatch(addItemBlock(itemBlock, setID)),
  }
}


class ConnectedItemSet extends Component {
  
  //needs to know champ
  //needs to know map
  //needs to have array of item blocks
  //need to create delete or update
  addItemBlock = (setID) => {
    const { itemSets, addItemBlock} = this.props;
    
    const type = `Item Block ${itemSets[setID].blocks.length + 1}`;
    
    
    addItemBlock({type, items: []}, setID);
  }
  
  render() {

    const { setID, itemListObj, title, blocks } = this.props;

    return (
      <div data-set-id={setID}>
        <div>{title}</div>
        {
          blocks.map((block, i) => {
            
            return <ItemBlock 
            key={i}
            type={block["type"]}
            blockID={i}
            itemListObj={itemListObj}
            blocks={blocks}
            setID={setID}
            />
          })
        }
        <button type="submit" onClick={() => this.addItemBlock(setID)}>Add a new block</button>
      </div>
    )
  }
}

const ItemSet = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemSet);

export default ItemSet;