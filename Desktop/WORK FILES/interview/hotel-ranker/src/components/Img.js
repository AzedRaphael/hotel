import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import required actions.
import {thumbnail} from "@cloudinary/url-gen/actions/resize";

// Import required qualifiers.
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

function Img({uploadedImg}) {

    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dr3djfjwm'
        }
    }); 

    const myImage = cld.image(uploadedImg);
    myImage
        .resize(thumbnail().width(100).height(100).gravity(focusOn(FocusOn.face())))

  return (
    <>
        <AdvancedImage cldImg={myImage} />
    </>
  )
}

export default Img