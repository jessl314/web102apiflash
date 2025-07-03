import React from 'react'

const Gallery = ({ images }) => {
    return (
        <div className="image-container">
            <h2> Your Screenshot Gallery!</h2>
            {/* if images array exists and its length is > 0
            we loop through images and for each url/array index we... 
            create a list element with key index and put the image in */}
            {images && images.length > 0 ? (
                images.map((pic, index) => (
                    <li className="gallery" key={index}>
                        <img
                        className="gallery-screenshot"
                        src={pic}
                        alt="Undefined screenshot from query"
                        width="500"
                        />
                    </li>
                ))
            ) : (
                <div> <h3>You haven't made a screenshot yet!</h3></div>
            )}

        </div>
    )
}

export default Gallery;