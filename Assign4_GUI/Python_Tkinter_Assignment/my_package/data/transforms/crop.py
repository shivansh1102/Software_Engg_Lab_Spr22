#Imports
import numpy as np
import PIL
from PIL import Image
class CropImage(object):
    '''
        Performs either random cropping or center cropping.
    '''

    def __init__(self, shape, crop_type='center'):
        '''
            Arguments:
            shape: output shape of the crop (h, w)
            crop_type: center crop or random crop. Default: center
        '''
        
        # Write your code here

        self.cropType = crop_type
        self.finalHeight, self.finalWidth = shape
        

    def __call__(self, image):
        '''
            Arguments:
            image (numpy array or PIL image)

            Returns:
            image (numpy array or PIL image)
        '''

        # Write your code here
        if not isinstance(image,PIL.Image.Image): # if given as numpy array, then convert into PIL Image
            img = Image.fromarray(image)

        originalWidth, originalHeight = image.size
        centreX = 0 # X coordinate of center
        centreY = 0 # Y coordinate of center
        if self.cropType == "center" : # Center Crop
            centreX = originalWidth/2
            centreY = originalHeight/2
        else : # Random Crop
            centreX = np.random.randint(self.finalWidth/2, originalWidth - self.finalWidth/2)
            centreY = np.random.randint(self.finalHeight/2, originalHeight - self.finalHeight/2)
            
        #Calculating coordinates
        leftPos = centreX - self.finalWidth/2
        rightPos = centreX + self.finalWidth/2
        topPos = centreY - self.finalHeight/2
        bottomPos = centreY + self.finalHeight/2

        return image.crop((leftPos,topPos,rightPos,bottomPos))
        
# Testing

if __name__ == "__main__" :
    img  = Image.open("testing/7.png")
    crop = CropImage((350,300),"center")
    img = crop(img)
    # img2 = asarray(img.convert("RGB"))
    # print(img2.shape)
    img.show()   

 