import React, { Component } from 'react';
import { connect } from "react-redux";
import ItemBlock from '../itemblock/itemblock';
import { addItemBlock, saveItemSet, clearBlocks, deleteBlockFromSet } from "../../redux/actions/index";


const mapStateToProps = state => {
  return { itemList: state.itemList, itemListObj: state.itemListObj, itemSets: state.itemSets, curItemSet: state.curItemSet };
}

function mapDispatchToProps(dispatch) {
  return {
    addItemBlock: (itemBlock, setID) => dispatch(addItemBlock(itemBlock, setID)),
    saveItemSet: () => dispatch(saveItemSet()),
    clearBlocks: () => dispatch(clearBlocks()),
    deleteBlockFromSet: blockID => dispatch(deleteBlockFromSet(blockID)),
  }
}


class ConnectedItemSet extends Component {
  

  

  //needs to know champ
  //needs to know map
  //needs to have array of item blocks
  //need to create delete or update
  addItemBlock = (setID) => {
    const { curItemSet, addItemBlock} = this.props;
    
    const type = `Item Block ${curItemSet.blocks.length + 1}`;
    
    
    addItemBlock({type, items: []}, setID);
  }

  deleteBlockFromSet = (blockID) => {
    this.props.deleteBlockFromSet(blockID);
  }
  
  render() {

    const { setID, itemListObj, title, blocks, saveItemSet, clearBlocks } = this.props;
    


    return (
      <div data-set-id={setID} className={`item-set-container`}>
        <div className="item-set-nav">
          <h2>{title}</h2>
          <button type="submit" onClick={() => clearBlocks()}>Clear Blocks</button>
          <button type="button" className="save" onClick={() => saveItemSet()}>x</button>
        </div>
        
        {
          blocks.map((block, i) => {
            
            return <ItemBlock 
            key={i}
            type={block["type"]}
            blockID={i}
            itemListObj={itemListObj}
            blocks={blocks}
            setID={setID}
            deleteBlock={this.deleteBlockFromSet}
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