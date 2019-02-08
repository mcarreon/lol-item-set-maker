import React, { Component } from 'react';
import ItemArea from '../components/itemarea/itemarea';
import { connect } from 'react-redux';
import ItemSet from '../components/itemset/itemset';
import { addItemSet, saveItemSet } from '../redux/actions';
import ItemBank from '../components/itembank/itembank';

function mapDispatchToProps (dispatch) {
  return {
    addItemSet: itemSet => dispatch(addItemSet(itemSet)),
    saveItemSet: () => dispatch(saveItemSet()),
  }
}

const mapStateToProps = state => {
  return { itemSets: state.itemSets, curItemSet: state.curItemSet, champNames: state.champNames};
}



class ConnectedItemsetbuilder extends Component {

  addItemSet = () => {
    const { itemSets, addItemSet, saveItemSet} = this.props;
    //console.log('test');


    const title = `Custom Item Set ${itemSets.length + 1}`;
    const name = "Lux";
    const setID = itemSets.length;
    const type = "custom";
    const map = "any";
    const mode = "any";
    const blocks = [
      {
        type: "Starting Items",
        items: [],
      }, 
      {
        type: "Early Items",
        items: [],
      }, 
      {
        type: "Essential Items",
        items: [],
      }, 
      {
        type: "Standard Items",
        items: [],
      }, 
      {
        type: "Situational Items",
        items: [],
      }, 
      {
        type: "Consumables",
        items: [],
      }]

    saveItemSet();
    addItemSet({title, name, type, map, mode, blocks, setID });
    
  }




  render() {

    const { itemSets, curItemSet, champNames } = this.props;

    let curSetID = curItemSet === null ? -1 : curItemSet.setID;



    return (
      <div className="grid-container">
        <div className="sidebar"></div>
        <div className="item-area"><ItemArea /></div>
        <div className="set-area">
          { 
            curItemSet !== null ? <ItemSet
            setID={curItemSet.setID}
            key={curItemSet.setID}
            title={curItemSet.title}
            blocks={curItemSet.blocks}
            /> : <div></div>
          }
        </div>
        <div className="set-bank">
          <ItemBank 
            addItemSet={this.addItemSet}
            itemSets={itemSets}
            champNames={champNames}
            curItemSetID={curSetID}
          />
        </div>
      </div>
    )
  }
}

const Itemsetbuilder = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemsetbuilder);

export default Itemsetbuilder;