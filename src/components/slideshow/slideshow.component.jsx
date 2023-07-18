import React from 'react';
import { Slide } from 'react-slideshow-image';

import { api } from '../../config';

import 'react-slideshow-image/dist/styles.css';

const spanStyle = {
  padding: '20px',
  background: 'rgba(0,0,0,0.4)',
  color: '#fff',
  width: '100%',
  textAlign: 'center',
  fontSize: '25px'
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: '600px'
};

const Slideshow = ({ images }) => {

    return (
      <div style={{ 'width': '600px'}}>
        <Slide>
            {images.map((image, index)=> (
                    <div key={index}>
                        <a href={image.link}>
                            <div style={{ ...divStyle, "backgroundImage": `url(${api}${image.path})` }}>
                                <span style={spanStyle}>{image.name}</span>
                            </div>
                        </a>
                    </div>
                ))}
        </Slide>
      </div>
    )
}

export default Slideshow;