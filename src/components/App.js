import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType =(type) => {
    
    this.setState({
      filters:{
        type
      }
    })
  }

adoptPet =(petId) => {
  // debugger
  let newPets = this.state.pets.map(pet => {
    return pet.id === petId ? {...pet, isAdopted: true} : pet
      // return{...pet, isAdopted: true}
      // pet.isAdopted = true
    
  })
  this.setState({
    pets: newPets
  })
  console.log(newPets)

}

  fetchPets = () => {

    if(this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(res => res.json())
      .then(
        (petsArray => this.setState({
        pets: petsArray
      }))
      )
      // console.log(petsArray)
    }

    else if(this.state.filters.type === 'cat'){
      fetch('/api/pets?type=cat')
      .then(res => res.json() )
      .then(
       (cats => this.setState({
         pets: cats
       }))
      )
    }

    else if(this.state.filters.type === 'dog'){
      fetch('/api/pets?type=dog')
      .then(res => res.json() )
      .then(
       (dogs => this.setState({
         pets: dogs
       }))
      )
    }

    else if(this.state.filters.type === 'micropig'){
      fetch('/api/pets?type=micropig')
      .then(res => res.json() )
      .then(
       (micropigs => this.setState({
         pets: micropigs
       }))
      )
    }
   
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
              onChangeType={this.onChangeType}
              fetchPets={this.fetchPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser  
              pets={this.state.pets}
              adoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
