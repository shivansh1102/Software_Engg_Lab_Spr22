#Imports
import PIL
from PIL import Image, ImageFilter 

class BlurImage(object):
    '''
        Applies Gaussian Blur on the image.
    '''

    def __init__(self, radius):
        '''
            Arguments:
            radius (int): radius to blur
        '''

        # Write your code here
    
        self.radius = radius

    def __call__(self, image):
        '''
            Arguments:
            image (numpy array or PIL Image)

            Returns:
            image (numpy array or PIL Image)
        '''

        # Write your code here
        if not isinstance(image,PIL.Image.Image): # if given as numpy array, then convert into PIL Image
            img = Image.fromarray(image)

        return image.filter(ImageFilter.GaussianBlur(self.radius))


# Testing

if __name__ == "__main__" :
    img  = Image.open("data/transforms/testing/7.png")
    blur = BlurImage(1)
    img = blur(img)
    # img2 = asarray(img.convert("RGB"))
    # print(img2.shape)
    img.show()

