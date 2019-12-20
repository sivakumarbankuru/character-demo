import React, { useState } from 'react';
import { GENDERS, SPECIES, ORIGIN } from '../../../utils/constants';
import './Filter.scss'

export default (props) => {
    const [genderList, setGenderList] = useState(GENDERS);
    const [speciesList, setSpeciesList] = useState(SPECIES);
    const [originList, setOriginList] = useState(ORIGIN);
    const [selectedItems, setSelectedItems] = useState([
        ...genderList, ...speciesList
    ])

    const getSelectedItems = (toggleItem) => {
        let selectedItemCopy = [...selectedItems]
        let index = selectedItems.findIndex((item) => item.key === toggleItem.key)
        if(index>=0) {
            selectedItemCopy.splice(index, 1)
        } else {
            selectedItemCopy.push(toggleItem)
        }
        console.log('selectedItemsCopy',selectedItemCopy)
        setSelectedItems(selectedItemCopy);
        props.sendSelectedItems(selectedItemCopy);
    }

    const onChecked = (param, i) => {
        let filteritem = param.item
        switch (filteritem) {
            case 'gender':
                let gendersCopy = [...genderList]
                let index = gendersCopy.findIndex((gender) => gender.key === param.key)
                gendersCopy[index].isChecked = !gendersCopy[index].isChecked
                getSelectedItems(gendersCopy[index])
                setGenderList(gendersCopy);
                break;
            case 'species':
                let speciesCopy = [...speciesList]
                let speciesIndex = speciesCopy.findIndex((species) => species.key === param.key)
                speciesCopy[speciesIndex].isChecked = !speciesCopy[speciesIndex].isChecked
                getSelectedItems(speciesCopy[speciesIndex])
                setSpeciesList(speciesCopy);
                break;
            default:
                let originCopy = [...originList]
                originCopy[i].isChecked = !originCopy[i].isChecked
                setOriginList(originCopy);
        }
    }

    const renderGenders = () => {
        return genderList.map((item, i) => {
            return <label className="chekbox-container" key={i}>
                <span className="checkbox-label">
                    {item.key}
                </span>
                <input type="checkbox" checked={item.isChecked}
                    onClick={() => onChecked(item, i)} />
                <span className="checkmark"></span>
            </label>
        })
    }

    const renderSpecies = () => {
        return speciesList.map((item, i) => {
            return <label className="chekbox-container" key={i}>
                <span className="checkbox-label">
                    {item.key}
                </span>
                <input type="checkbox" checked={item.isChecked}
                    onClick={() => onChecked(item, i)} />
                <span className="checkmark"></span>
            </label>
        })
    }

    const renderOrigin = () => {
        return originList.map((item, i) => {
            return <label className="chekbox-container" key={i}>
                <span className="checkbox-label">
                    {item.key}
                </span>
                <input type="checkbox" checked={item.isChecked} 
                onClick={() => onChecked(item, i)} />
                <span className="checkmark"></span>
            </label>
        })
    }

    return (
        <div className="left-wrapper">
            <h3>Filters</h3>
            <div className="filter-box">
                <p className="checkbox-header">Species</p>
                {renderSpecies()}
            </div>
            <div className="filter-box">
                <p className="checkbox-header">Gender</p>
                {renderGenders()}
            </div>
            <div className="filter-box">
                <p className="checkbox-header">Origin</p>
                {renderOrigin()}
            </div>
        </div>
    )
}