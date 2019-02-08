import React, { Component } from 'react'

export class ChampSelect extends Component {
  
  handleOnClick = (name) => {
    const { addItemSet, toggleVisible } = this.props;

    addItemSet(name);
    toggleVisible();

  }
  
  
  render() {

    const { display, champNames, addItemSet } = this.props;

    return (
      <div className={`champ-select-container ${display ? "visible" : "invisible"}`}>
        <div className="champ-select-nav">test</div>
        <div className="champ-select">
        {
          champNames.map((name, i) => {
            
            let imgSrc = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${name}.png`
            
            return (
              <div data-name={name} key={i} onClick={() => this.handleOnClick(name)}>
                <img src={imgSrc} alt={`mini-${name} image`}/>
                <p>{name}</p>
              </div>
            )
          })
        }
        </div>
      </div>
    )
  }
}
