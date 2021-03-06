import React, { Component } from 'react';
import ItemArea from '../components/itemarea/itemarea';
import { connect } from 'react-redux';
import ItemSet from '../components/itemset/itemset';
import { addItemSet, saveItemSet, switchItemSet, clearSets } from '../redux/actions';
import SetBank from '../components/setbank/setbank';

function mapDispatchToProps (dispatch) {
  return {
    addItemSet: itemSet => dispatch(addItemSet(itemSet)),
    saveItemSet: () => dispatch(saveItemSet()),
    switchItemSet: setID => dispatch(switchItemSet(setID)),
    clearSets: () => dispatch(clearSets()),
  }
}

const mapStateToProps = state => {
  return { itemSets: state.itemSets, curItemSet: state.curItemSet, champs: state.champs};
}



class ConnectedItemsetbuilder extends Component {

  addItemSet = (champName) => {
    const { itemSets, addItemSet, saveItemSet} = this.props;
    //console.log('test');


    const title = `Custom Item Set ${itemSets.length + 1}`;
    const name = champName;
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

  switchItemSet = (setID) => {
    const { saveItemSet, switchItemSet } = this.props;

    saveItemSet();
    switchItemSet(setID);
  }

  clearSets = () => {
    this.props.clearSets();
  }


  render() {

    const { itemSets, curItemSet, champs } = this.props;

    let curSetID = curItemSet === null ? -1 : curItemSet.setID;



    return (
      <div className="grid-container">
        <div className="sidebar"></div>
        <div className="item-area"><ItemArea /></div>
        <div className="set-area">
          { 
            curItemSet !== null ? <ItemSet
            key={curItemSet.setID}
            /> : <div></div>
          }
        </div>
        <div className="set-bank">
          <SetBank 
            addItemSet={this.addItemSet}
            itemSets={itemSets}
            champs={champs}
            curItemSetID={curSetID}
            switchItemSet={this.switchItemSet}
            clearSets={this.clearSets}
          />
        </div>
      </div>
    )
  }
}

const Itemsetbuilder = connect(mapStateToProps, mapDispatchToProps)(ConnectedItemsetbuilder);

export default Itemsetbuilder;