import React, { Component } from 'react';
import ItemArea from '../components/itemarea/itemarea';
import { connect } from 'react-redux';
import ItemSet from '../components/itemset/itemset';



const mapStateToProps = state => {
  return { itemSets: state.itemSets, curItemSet: state.curItemSet};
}



class ConnectedItemsetbuilder extends Component {


  render() {

    const { itemSets, curItemSet } = this.props;

    return (
      <div>
        <ItemArea />
        
        <div>
        { curItemSet !== null ? <ItemSet
          setID={curItemSet.setID}
          key={curItemSet.setID}
          title={curItemSet.title}
          blocks={curItemSet.blocks}
        /> : <div></div>}
        </div>
      </div>
    )
  }
}

const Itemsetbuilder = connect(mapStateToProps)(ConnectedItemsetbuilder);

export default Itemsetbuilder;