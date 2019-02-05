import React, { Component } from 'react';
import './item.css';

export default class Item extends Component {
  
  state = {
    block: false,
  }
  
  render() {

    const { img, name, itemID, addItemToBlock} = this.props;
    


    return (
      <div data-id={itemID} className="item" >
        <img src={img} alt={name + " picture"} onClick={() => addItemToBlock(itemID)}/>
      </div>
    )
  }
}
