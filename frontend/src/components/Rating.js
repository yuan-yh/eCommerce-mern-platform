import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

const Rating = ({ rating_value, rating_text }) => {
    return (
        <div className='rating'>
            <span>
                {rating_value >= 1 ? <FaStar /> : rating_value >= 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {rating_value >= 2 ? <FaStar /> : rating_value >= 1.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {rating_value >= 3 ? <FaStar /> : rating_value >= 2.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {rating_value >= 4 ? <FaStar /> : rating_value >= 3.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>
            <span>
                {rating_value >= 5 ? <FaStar /> : rating_value >= 4.5 ? <FaStarHalfAlt /> : <FaRegStar />}
            </span>

            <span className='rating-text'>{rating_text && rating_text}</span>
        </div>
    )
}

export default Rating