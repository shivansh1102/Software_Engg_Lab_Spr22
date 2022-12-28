#Imports
from PIL import Image
import PIL
from torch import imag

class RescaleImage(object):
    '''
        Rescales the image to a given size.
    '''

    def __init__(self, output_size):
        '''
            Arguments:
            output_size (tuple or int): Desired output size. If tuple, output is
            matched to output_size. If int, smaller of image edges is matched
            to output_size keeping aspect ratio the same.
        '''

        # Write your code here
        self.size = output_size

    def __call__(self, image):
        '''
            Arguments:
            image (numpy array or PIL image)

            Returns:
            image (numpy array or PIL image)

            Note: You do not need to resize the bounding boxes. ONLY RESIZE THE IMAGE.
        '''

        img=image
        if not isinstance(image,PIL.Image.Image):
            img = Image.fromarray(image)
            
        res = img
        if isinstance(self.size,tuple):
          res = img.resize(self.size)
        if isinstance(self.size,int) :
          h, w = img.size
          res = img.resize(((self.size * h) , self.size * w))
        #   else:
        #       res = img.resize((self.size * h, (self.size * w)))

        if isinstance(self.size,float) :
          h, w = img.size
          res = img.resize((int(self.size * h) , int(self.size * w)))
        
        return res


        # 640 , 480
        # 