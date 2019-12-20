import React from 'react';
import './character.scss';


export default (props) => {
    const { id, name, image, status, species, gender, origin, location, created } = props.data;

    const getYear = (dateString) => {
        return  new Date().getFullYear() - new Date(dateString).getFullYear()
    }

    return (
        <div className="image-content">
            <div className="image">
                <img src={image} alt={id} className="filter-img" />

            </div>
            <div className="image-title">
                <span>{name}</span>
                <span>id: {id} - created {getYear(created)} years ago</span>
            </div>
            <div className="image-content-values">
                <div className="image-content-block">
                    <label>STATUS</label>
                    <span className="label-value">{status}</span>
                </div>

                <div className="image-content-block">
                    <label>SPECIES</label>
                    <span className="label-value">{species}</span>
                </div>

                <div className="image-content-block">
                    <label>GENDER</label>
                    <span className="label-value">{gender}</span>
                </div>
                <div className="image-content-block">
                    <label>ORIGIN</label>
                    <span className="label-value">{origin.name}</span>
                </div>
                <div className="image-content-block">
                    <label>LAST LOCATION</label>
                    <span className="label-value">{location.name}</span>
                </div>
            </div>
        </div>
    )
}