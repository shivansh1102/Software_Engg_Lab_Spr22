#Imports

import PIL
import numpy
from PIL import Image
from numpy import degrees
from numpy import asarray


class RotateImage(object):
    '''
        Rotates the image about the centre of the image.
    '''

    def __init__(self, degrees):
        '''
            Arguments:
            degrees: rotation degree.
        '''
        
        # Write your code here

        self.degree = degrees
        
    def __call__(self, sample):
        '''
            Arguments:
            image (numpy array or PIL image)

            Returns:
            image (numpy array or PIL image)
        '''

        # Write your code here
        if not isinstance(sample,PIL.Image.Image): # if given as numpy array, then convert into PIL Image
            img = Image.fromarray(sample)

        return sample.rotate(self.degree)

# Testing

if __name__ == "__main__" :
    img  = Image.open("testing/7.png")
    rotate = RotateImage(90)
    img = rotate(img)
    img2 = asarray(img.convert("RGB"))
    print(img2.shape)
    img.show()
    # 3,480,640
    # 2,0,1

