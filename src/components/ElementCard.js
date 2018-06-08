import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import InnerElement from './InnerElement.js'
import './App.css'

class ElementCard extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
          data: [],
          isLoading: false,
          name: ''
        }
      }

      componentWillreceiveProps() {
        this.setState({ name: this.props.name});
      }

      componentDidMount() {
        const xhr = new XMLHttpRequest();
        console.log(this.props.name);
        console.log(this.props.variant);
        xhr.open('GET', 'https://swapi.co/api/' + this.props.variant + '/?search=' + this.props.name, true);
        xhr.send();
        this.setState({ isLoading: true })
    
        xhr.onreadystatechange = () => {
          if (xhr.readyState !== 4) {
            return false
          }
    
          if (xhr.status !== 200) {
            console.log(xhr.status + ': ' + xhr.statusText)
          } else {
            this.setState({
              data: JSON.parse(xhr.responseText),
              isLoading: false,
            })
          }
        }
      }
	renderElement(){
        const { data } = this.state
        if (data.results !== undefined) {
            if (this.props.variant === 'people') {

              const films = [];
              const vehicles = [];
              const starships = [];
              const species = [];

              for (var i = 0; i < this.state.data.results[0].films.length; i++) {
                films[i] = this.state.data.results[0].films[i];
              }
              for (var i = 0; i < this.state.data.results[0].vehicles.length; i++) {
                vehicles[i] = this.state.data.results[0].vehicles[i];
              }
              for (var i = 0; i < this.state.data.results[0].starships.length; i++) {
                starships[i] = this.state.data.results[0].starships[i];
              }
              for (var i = 0; i < this.state.data.results[0].species.length; i++) {
                species[i] = this.state.data.results[0].species[i];
              }

              function changeSymbol(str) {
                if (str !== undefined) {
                    const newstr = str.replace(/é/i, 'e');
                    return newstr;
                }
              }

              const filmsList = films.map((film, index) =>
                <InnerElement key={index} url={film}/>
              );
              const vehiclesList = vehicles.map((vehicle, index) =>
                <InnerElement key={index} url={vehicle}/>
              );
              const starshipsList = starships.map((starship, index) =>
                <InnerElement key={index} url={starship}/>
              );
              const speciesList = species.map((species, index) =>
                <InnerElement key={index} url={species}/>
              );

              return (
                  
                    <div className = 'card__container'>
                      
                      <div className = 'card__blocks'>
                        <div className = 'card__left-block'>

                          <div className = 'card__top-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Birth year:</p>
                              <p className = 'card__text-small'>{data.results[0].birth_year}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Homeworld:</p>
                              <div><InnerElement url={data.results[0].homeworld}/></div>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Species:</p>
                              <div>{speciesList}</div>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Gender:</p>
                              <p className = 'card__text-small'>{data.results[0].gender}</p>
                            </div>
                          </div>

                          <div className = 'card__bottom-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Height:</p>
                              <p className = 'card__text-small'>{data.results[0].height}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Mass:</p>
                              <p className = 'card__text-small'>{data.results[0].mass}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Skin color:</p>
                              <p className = 'card__text-small'>{data.results[0].skin_color}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Hair color:</p>
                              <p className = 'card__text-small'>{data.results[0].hair_color}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Eye color:</p>
                              <p className = 'card__text-small'>{data.results[0].eye_color}</p>
                            </div>
                          </div>

                        </div>

                        <div className = 'card__center-block'>
                          <div className = 'card__image-container'>
                            <img className = 'card__image' src={'./img/' + changeSymbol(data.results[0].name) + '.jpg'} />
                            <p className = 'card__name'><span className = 'card__span'>[ </span>{data.results[0].name}<span className = 'card__span'> ]</span></p>
                          </div>
                        </div>
                      
                        <div className = 'card__right-block'>
                          <div className = 'card__top-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text-small'>Vehicles:</p>
                              <div>{vehiclesList}</div>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text-small'>Starships:</p>
                              <div>{starshipsList}</div>
                            </div>
                          </div>
                          <div className = 'card__bottom-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text-small'>Films:</p>
                              <div>{filmsList}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                )
          }

          if (this.props.variant === 'planets') {

              const residents = [];
              const films = [];

              for (var i = 0; i < this.state.data.results[0].films.length; i++) {
                films[i] = this.state.data.results[0].films[i];
              }
              for (var i = 0; i < this.state.data.results[0].residents.length; i++) {
                residents[i] = this.state.data.results[0].residents[i];
              }

              const filmsList = films.map((film, index) =>
                <InnerElement key={index} url={film}/>
              );
              const residentsList = residents.map((resident, index) =>
                <InnerElement key={index} url={resident}/>
              );

              return (
                  
                    <div className = 'card__container'>
                      
                      <div className = 'card__blocks'>
                        <div className = 'card__left-block'>

                          <div className = 'card__top-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Rotation period:</p>
                              <p className = 'card__text-small'>{data.results[0].rotation_period}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Orbital period:</p>
                              <p className = 'card__text-small'>{data.results[0].orbital_period}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Diameter:</p>
                              <p className = 'card__text-small'>{data.results[0].diameter}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Gravity:</p>
                              <p className = 'card__text-small'>{data.results[0].gravity}</p>
                            </div>
                          </div>

                          <div className = 'card__bottom-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Climate:</p>
                              <p className = 'card__text-small'>{data.results[0].climate}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Surface water:</p>
                              <p className = 'card__text-small'>{data.results[0].surface_water}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Population:</p>
                              <p className = 'card__text-small'>{data.results[0].population}</p>
                            </div>
                            <div className = 'card__row'>
                              <p className = 'card__text'>Terrain:</p>
                              <p className = 'card__text-small'>{data.results[0].terrain}</p>
                            </div>
                          </div>

                        </div>

                        <div className = 'card__center-block'>
                          <div className = 'card__image-container'>
                            <img className = 'card__image-planet' src={'./img/' + data.results[0].name + '.jpg'} />
                            <p className = 'card__name'><span className = 'card__span'>[ </span>{data.results[0].name}<span className = 'card__span'> ]</span></p>
                          </div>
                        </div>
                      
                        <div className = 'card__right-block'>
                          <div className = 'card__top-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text-small'>Vehicles:</p>
                              <div>{residentsList}</div>
                            </div>
                          </div>

                          <div className = 'card__bottom-block'>
                            <div className = 'card__row'>
                              <p className = 'card__text-small'>Films:</p>
                              <div>{filmsList}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                )


          }

          if (this.props.variant === 'vehicles') {

            const pilots = [];
            const films = [];

            for (var i = 0; i < this.state.data.results[0].films.length; i++) {
              films[i] = this.state.data.results[0].films[i];
            }
            for (var i = 0; i < this.state.data.results[0].pilots.length; i++) {
              pilots[i] = this.state.data.results[0].pilots[i];
            }

            const filmsList = films.map((film, index) =>
              <InnerElement key={index} url={film}/>
            );
            const pilotsList = pilots.map((pilot, index) =>
              <InnerElement key={index} url={pilot}/>
            );

            return (
                
                  <div className = 'card__container'>
                    
                    <div className = 'card__blocks'>
                      <div className = 'card__left-block'>

                        <div className = 'card__top-block'>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Model:</p>
                            <p className = 'card__text-small'>{data.results[0].model}</p>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Manufacturer:</p>
                            <p className = 'card__text-small'>{data.results[0].manufacturer}</p>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Cost in credits:</p>
                            <p className = 'card__text-small'>{data.results[0].cost_in_credits}</p>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Length:</p>
                            <p className = 'card__text-small'>{data.results[0].length}</p>
                          </div>
                        </div>

                        <div className = 'card__bottom-block'>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Max speed:</p>
                            <p className = 'card__text-small'>{data.results[0].max_atmosphering_speed} atm</p>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Crew:</p>
                            <p className = 'card__text-small'>{data.results[0].crew}</p>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Passengers:</p>
                            <p className = 'card__text-small'>{data.results[0].passengers}</p>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Cargo capacity:</p>
                            <p className = 'card__text-small'>{data.results[0].cargo_capacity}</p>
                          </div>
                        </div>

                      </div>

                      <div className = 'card__center-block'>
                        <div className = 'card__image-container'>
                          <img className = 'card__image-planet' src={'./img/' + data.results[0].name + '.jpg'} />
                          <p className = 'card__name'><span className = 'card__span'>[ </span>{data.results[0].name}<span className = 'card__span'> ]</span></p>
                        </div>
                      </div>
                    
                      <div className = 'card__right-block'>
                        <div className = 'card__top-block'>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Consumables:</p>
                            <p className = 'card__text-small'>{data.results[0].consumables}</p>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text'>Vehicle class:</p>
                            <p className = 'card__text-small'>{data.results[0].vehicle_class}</p>
                          </div>
                        </div>

                        <div className = 'card__bottom-block'>
                          <div className = 'card__row'>
                            <p className = 'card__text-small'>Pilots:</p>
                            <div>{pilotsList}</div>
                          </div>
                          <div className = 'card__row'>
                            <p className = 'card__text-small'>Films:</p>
                            <div>{filmsList}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                
              )


        }


        if (this.props.variant === 'starships') {

          const pilots = [];
          const films = [];

          for (var i = 0; i < this.state.data.results[0].films.length; i++) {
            films[i] = this.state.data.results[0].films[i];
          }
          for (var i = 0; i < this.state.data.results[0].pilots.length; i++) {
            pilots[i] = this.state.data.results[0].pilots[i];
          }

          const filmsList = films.map((film, index) =>
            <InnerElement key={index} url={film}/>
          );
          const pilotsList = pilots.map((pilot, index) =>
            <InnerElement key={index} url={pilot}/>
          );

          return (
              
                <div className = 'card__container'>
                  
                  <div className = 'card__blocks'>
                    <div className = 'card__left-block'>

                      <div className = 'card__top-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Model:</p>
                          <p className = 'card__text-small'>{data.results[0].model}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Manufacturer:</p>
                          <p className = 'card__text-small'>{data.results[0].manufacturer}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Cost in credits:</p>
                          <p className = 'card__text-small'>{data.results[0].cost_in_credits}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Length:</p>
                          <p className = 'card__text-small'>{data.results[0].length}</p>
                        </div>
                      </div>

                      <div className = 'card__bottom-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Max speed:</p>
                          <p className = 'card__text-small'>{data.results[0].max_atmosphering_speed} atm</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Crew:</p>
                          <p className = 'card__text-small'>{data.results[0].crew}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Passengers:</p>
                          <p className = 'card__text-small'>{data.results[0].passengers}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Cargo capacity:</p>
                          <p className = 'card__text-small'>{data.results[0].cargo_capacity}</p>
                        </div>
                      </div>

                    </div>

                    <div className = 'card__center-block'>
                      <div className = 'card__image-container'>
                        <img className = 'card__image-planet' src={'./img/' + data.results[0].name + '.jpg'} />
                        <p className = 'card__name'><span className = 'card__span'>[ </span>{data.results[0].name}<span className = 'card__span'> ]</span></p>
                      </div>
                    </div>
                  
                    <div className = 'card__right-block'>
                      <div className = 'card__top-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Consumables:</p>
                          <p className = 'card__text-small'>{data.results[0].consumables}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Hyperdrive rating:</p>
                          <p className = 'card__text-small'>{data.results[0].hyperdrive_rating}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>MGLT:</p>
                          <p className = 'card__text-small'>{data.results[0].MGLT}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Starship class:</p>
                          <p className = 'card__text-small'>{data.results[0].starship_class}</p>
                        </div>
                      </div>

                      <div className = 'card__bottom-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text-small'>Pilots:</p>
                          <div>{pilotsList}</div>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text-small'>Films:</p>
                          <div>{filmsList}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
            )


         }


         if (this.props.variant === 'species') {

          const people = [];
          const films = [];

          for (var i = 0; i < this.state.data.results[0].people.length; i++) {
            people[i] = this.state.data.results[0].people[i];
          }
          for (var i = 0; i < this.state.data.results[0].films.length; i++) {
            films[i] = this.state.data.results[0].films[i];
          }

          const filmsList = films.map((film, index) =>
            <InnerElement key={index} url={film}/>
          );
          const peopleList = people.map((people, index) =>
            <InnerElement key={index} url={people}/>
          );

          return (
              
                <div className = 'card__container'>
                  
                  <div className = 'card__blocks'>
                    <div className = 'card__left-block'>

                      <div className = 'card__top-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Classification:</p>
                          <p className = 'card__text-small'>{data.results[0].classification}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Designation:</p>
                          <p className = 'card__text-small'>{data.results[0].designation}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Average height:</p>
                          <p className = 'card__text-small'>{data.results[0].average_height}</p>
                        </div>
                      </div>

                      <div className = 'card__bottom-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Skin colors:</p>
                          <p className = 'card__text-small'>{data.results[0].skin_colors}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Hair_colors:</p>
                          <p className = 'card__text-small'>{data.results[0].hair_colors}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Eye colors:</p>
                          <p className = 'card__text-small'>{data.results[0].eye_colors}</p>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Average lifespan:</p>
                          <p className = 'card__text-small'>{data.results[0].average_lifespan}</p>
                        </div>
                      </div>

                    </div>

                    <div className = 'card__center-block'>
                      <div className = 'card__image-container'>
                        <img className = 'card__image' src={'./img/' + data.results[0].name + '.jpg'} />
                        <p className = 'card__name'><span className = 'card__span'>[ </span>{data.results[0].name}<span className = 'card__span'> ]</span></p>
                      </div>
                    </div>
                  
                    <div className = 'card__right-block'>
                      <div className = 'card__top-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Homeworld:</p>
                          <div><InnerElement url={data.results[0].homeworld}/></div>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text'>Language:</p>
                          <p className = 'card__text-small'>{data.results[0].language}</p>
                        </div>
                      </div>

                      <div className = 'card__bottom-block'>
                        <div className = 'card__row'>
                          <p className = 'card__text-small'>People:</p>
                          <div>{peopleList}</div>
                        </div>
                        <div className = 'card__row'>
                          <p className = 'card__text-small'>Films:</p>
                          <div>{filmsList}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
            )


        }


      }
    }
    
    render() {
        return (
          <div className = 'card'>
              {this.renderElement()}
          </div>
        )
      }
}

export default ElementCard;