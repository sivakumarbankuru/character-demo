import React, { Component } from 'react';
import { connect } from 'react-redux'
import Filters from './filters';
import { getCharacters, getFilteredCharacters } from '../../actions/dashboardAction';
import Character from './character';
import { GENDERS, SPECIES } from '../../utils/constants';

import './Dashboard.scss'

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFilters: [...GENDERS, ...SPECIES],
            isLoad: true
        }
    }

    componentDidMount() {
        this.props.getCharacters();
        this.setState({ isLoad: false })
    }

    renderCharacter = () => {
        const { filterCharacters } = this.props;
        if (filterCharacters.length > 0) {
            return filterCharacters.map((item, i) => {
                return <Character data={item} key={i} />
            })
        } else {
            return <p>No Records Found</p>
        }
    }

    sortById = (e) => {
        if (e.target.value) {
            const { filterCharacters } = this.props;
            let sortBy = e.target.value;
            let sortedResult = []
            let filterCharactersCopy = [...filterCharacters]
            switch (sortBy) {
                case 'desc':
                    sortedResult = filterCharactersCopy.sort((a, b) => b.id - a.id);
                    break;
                default:
                    sortedResult = filterCharactersCopy.sort((a, b) => a.id - b.id);
            }
            this.props.getFilteredCharacters(sortedResult)
        }
    }

    getSelectedItems = (filterItems) => {
        this.setState({ selectedFilters: filterItems })
        const { characters } = this.props;
        let genderValues = []
        let speciesValues = []
        filterItems.forEach((item) => {
            if (item.item === 'gender' && item.isChecked) {
                genderValues.push(item.key)
            } else if(item.isChecked) {
                speciesValues.push(item.key)
            }
        })
        let filterResult = []
        if (filterItems.length > 0) {
            characters.forEach((character) => {
                if (genderValues.length > 0 && speciesValues.length > 0) {
                    if (genderValues.indexOf(character.gender) !== -1 && speciesValues.indexOf(character.species) !== -1) {
                        filterResult.push(character)
                    }
                }
                else if (genderValues.length > 0 && speciesValues.length === 0) {
                    if (genderValues.indexOf(character.gender) !== -1) {
                        filterResult.push(character)
                    }
                } else if (speciesValues.length > 0 && genderValues.length === 0) {
                    if (speciesValues.indexOf(character.species) !== -1) {
                        filterResult.push(character)
                    }
                }
            })
        }
        this.props.getFilteredCharacters(filterResult)
    }

    onCloseChip(i) {
        const { selectedFilters } = this.state;
        selectedFilters[i].isChecked = false;
        this.setState({ selectedFilters: selectedFilters })
    }

    renderChips = () => {
        const { selectedFilters } = this.state;
        return selectedFilters.map((item, i) => {
            if (item.isChecked) {
                return <div class="chip" key={i}>
                    <div class="chip-content">{item.key}</div>
                    <div class="chip-close" onClick={() => this.onCloseChip(i)}>
                        <svg class="chip-svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></svg>
                    </div>
                </div>
            } else {
                return null
            }
        })
    }

    render() {
        return (
            <div className="wrapper">
                <div className="header">
                    <p class="header-text">Sapient</p>
                </div>
                <div className="container-box">
                    <Filters sendSelectedItems={this.getSelectedItems} selectedFilters={this.state.selectedFilters} />
                    <div className="right-wrapper">
                        <p className="checkbox-header">Selected Filter</p>
                        <div className="selected-filters">
                            {this.renderChips()}
                        </div>
                        <div className="filter-dropdown">
                            <select defaultValue='' onChange={this.sortById}>
                                <option value='' selected disabled>Sort By Id</option>
                                <option value='asc'>Ascending</option>
                                <option value='desc'>Descending</option>
                            </select>
                        </div>

                        <div className="image-content-wrapper">
                            {this.renderCharacter()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return {
        characters: store.dashboard.characters,
        isLoading: store.dashboard.isLoading,
        filterCharacters: store.dashboard.filterCharacters
    }
}


const mapDisptachToProps = {
    getCharacters,
    getFilteredCharacters
}

export default connect(mapStateToProps, mapDisptachToProps)(Dashboard)