import React, { Component } from 'react'

export default class NoMatch extends Component<any, any> {
  render() {
    return (
      <div>
        These aren't the droids you're looking for...
        <br/>
        (Not found)
        <br/>
        <img 
        height="100" 
        src= "https://starwarsblog.starwars.com/wp-content/uploads/2017/06/25-star-wars-quotes-obi-wan-kenobi-identification-tall-1024x576.jpg"/>
      </div>
    )
  }
}
