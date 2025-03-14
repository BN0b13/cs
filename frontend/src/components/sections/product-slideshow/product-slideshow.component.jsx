import React, { useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';

import { api } from '../../../config/router';

import 'react-slideshow-image/dist/styles.css';

import {
  slideshowDimensions,
  slideshowSpanText
} from '../../../styles/theme';


const spanStyle = {
  padding: '20px',
  background: 'rgba(0,0,0,0.4)',
  color: '#fff',
  width: '100%',
  textAlign: 'center',
  fontSize: slideshowSpanText
};

const divStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  height: slideshowDimensions
};

const ProductSlideshow = ({ images = [] }) => {
  const [ autoPlay, setAutoPlay ] = useState(true);
  
  useEffect(() => {
    if(images.length === 1) {
      setAutoPlay(false);
    }
  }, []);

    return (
      <div style={{ 'width': slideshowDimensions }}>
        <Slide autoplay={autoPlay} arrows={autoPlay}>
            {images.map((image, index)=> (
                    <div key={index}>
                      {image.link ?
                        <a href={image.link}>
                            <div style={{ ...divStyle, "backgroundImage": `url(${api}${image.path})` }}>
                              {image.caption &&
                                <span style={spanStyle}>{image.caption}</span>
                              }
                            </div>
                        </a>
                      :
                        <div style={{ ...divStyle, "backgroundImage": `url(${api}${image.path})` }}>
                          {image.caption &&
                            <span style={spanStyle}>{image.caption}</span>
                          }
                        </div>
                      }
                    </div>
                ))}
        </Slide>
      </div>
    )
}

export default ProductSlideshow;