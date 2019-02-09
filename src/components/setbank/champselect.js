import React, { Component } from 'react'
import { isBoolean } from 'util';

export class ChampSelect extends Component {
  
  state = {
    fighter: false,
    tank: false, 
    mage: false,
    assassin: false,
    support: false,
    marksman: false
    
  }


  // watches props to add dom event listener to detect outside component clicks
  componentWillReceiveProps(nextProps) {
    
    if (nextProps.display) {
      document.addEventListener('mousedown', this.handleClick, false);
    }
    else {
      
      document.removeEventListener('mousedown', this.handleClick, false);
    }
    
      
    
  }

  // checks for in or out of component click
  handleClick = e => {
    
    if (this.node.contains(e.target) ) {
      return
    }
    this.handleOutsideClick();
  }

  // handles out of component clicks
  handleOutsideClick = e => {
    this.props.toggleVisible();
  }

  // toggles selected champ filter
  toggleSelected = (e) => {
    //console.log(e.target.className);
    let name = e.target.getAttribute('data-name');
    //console.log(name);
    for (let key in this.state) {
      if (key === name) {
        this.setState({[name]: !this.state[name]});
      }
    }
  }

  // sets current working set to picked champ and toggles component
  handleOnClick = name => {
    const { addItemSet, toggleVisible } = this.props;

    addItemSet(name);
    toggleVisible();

  }

  filterSelect = filter => {
    // formats filter for comparison
    const filterUpper = filter.map(e => {
      let word = e.split("");
      word[0] = word[0].toUpperCase();
      return word.join("");
    })
    
    // filters champ prop with filter and returns filtered champ list
    return this.props.champs.filter(function (e){
      return filterUpper.every(el => {
        return (e.tags.indexOf(el) >= 0)
      }) 
    })
  }

  getOptions = () => {
    return Object.keys(this.state)
    .filter( key => typeof this.state[key] === typeof true && this.state[key] === true);
  }
  
  
  render() {


    const { fighter, tank, mage, assassin, support, marksman } = this.state;
    const { display, toggleVisible } = this.props;
    
    const options = this.getOptions();
    const filteredChamps = this.filterSelect(options);
    
    
    
    //console.log(champs);
    return (
      <div ref={node => this.node = node}>
        <div className={`champ-select-container ${display ? "visible" : "invisible"}`}>
          <button type="button" onClick={toggleVisible} className="display">x</button>
          <div className="champ-select-nav">
            <button type="button" onClick={(e) => this.toggleSelected(e)} ><i className={`fighter ${fighter ? " toggled" : ""}`} data-name="fighter"></i></button>
            <button type="button" onClick={(e) => this.toggleSelected(e)} ><i className={`tank ${tank ? " toggled" : ""}`} data-name="tank"></i></button>
            <button type="button" onClick={(e) => this.toggleSelected(e)} ><i className={`mage ${mage ? " toggled" : ""}`} data-name="mage"></i></button>
            <button type="button" onClick={(e) => this.toggleSelected(e)} ><i className={`assassin ${assassin ? " toggled" : ""}`} data-name="assassin"></i></button>
            <button type="button" onClick={(e) => this.toggleSelected(e)} ><i className={`support ${support ? " toggled" : ""}`} data-name="support"></i></button>
            <button type="button" onClick={(e) => this.toggleSelected(e)} ><i className={`marksman ${marksman ? " toggled" : ""}`} data-name="marksman"></i></button>
            <input></input>
          </div>
          
          <div className="champ-select">
          {
            filteredChamps.map((champ, i) => {
              
              let imgSrc = `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champ.id}.png`
              
              return (
                <div data-name={champ.name} key={i} onClick={() => this.handleOnClick(champ.id)}>
                  <img src={imgSrc} alt={`mini-${champ.name} image`}/>
                  <p>{champ.id === "JarvanIV" ? "Jarvan IV" : champ.name.split(/(?=[A-Z])/).join(" ")}</p>
                </div>
              )
            })
          }
          </div>
        </div>
      </div>
    )
  }
}
