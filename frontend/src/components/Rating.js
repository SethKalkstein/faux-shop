import React from 'react'
import PropTypes from 'prop-types';

const starType = star => {
    const faClass = star >= 1 
                    ?'fas fa-star'
                    : star >= .5 
                    ?'fas fa-star-half-alt' 
                    : 'far fa-star';

    return faClass;
}

const createStars = (value, color) => {
    const stars = [];

    for(let i = 0; i < 5; i ++){
        
        let star = value - i;
        
        stars.push( <i style={{color}} key={ i } className={ starType(star) } /> );
    }

    return stars;
}

const Rating = ({ value, text, color }) => {

    return (
        <div className='rating'>
            <span>{ createStars(value, color) } { text && text } </span>
        </div>
    )
}

Rating.defaultProps = {
    color: '#f8e825',
    value: 0
}

Rating.propTypes = {
    value: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    color: PropTypes.string
}


export default Rating
