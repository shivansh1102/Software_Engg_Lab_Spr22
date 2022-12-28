#Imports
from PIL import Image
import numpy as np
import json
class Dataset(object):
    '''
        A class for the dataset that will return data items as per the given index
    '''

    def __init__(self, annotation_file, transforms = None):
        '''
            Arguments:
            annotation_file: path to the annotation file
            transforms: list of transforms (class instances)
                        For instance, [<class 'RandomCrop'>, <class 'Rotate'>]
        '''
        self.transforms = transforms
        # opening annotation file
        with open(annotation_file, 'r+') as jsonFile:
           jsonList = list(jsonFile)
        # Reading from json file
        self.jsonList = []
        for jsonStr in jsonList:
            self.jsonList.append(json.loads(jsonStr))

    def __len__(self):
        '''
            return the number of data points in the dataset
        '''
        return len(self.jsonList)

    def __getitem__(self, idx):
        '''
            return the dataset element for the index: "idx"
            Arguments:
                idx: index of the data element.

            Returns: A dictionary with:
                image: image (in the form of a numpy array) (shape: (3, H, W))
                gt_png_ann: the segmentation annotation image (in the form of a numpy array) (shape: (1, H, W))
                gt_bboxes: N X 5 array where N is the number of bounding boxes, each 
                            consisting of [class, x1, y1, x2, y2]
                            x1 and x2 lie between 0 and width of the image,
                            y1 and y2 lie between 0 and height of the image.

            You need to do the following, 
            1. Extract the correct annotation using the idx provided.
            2. Read the image, png segmentation and convert it into a numpy array (wont be necessary
                with some libraries). The shape of the arrays would be (3, H, W) and (1, H, W), respectively.
            3. Scale the values in the arrays to be with [0, 1].
            4. Perform the desired transformations on the image.
            5. Return the dictionary of the transformed image and annotations as specified.
        '''
        dataIdx = self.jsonList[idx] # dataset element at index idx
        #Opening JPG & PNG images from the path stored in dataIdx element
        pathJPG = "data/" + dataIdx["img_fn"]
        img = Image.open(pathJPG)
        pathPNG = "data/" + dataIdx["png_ann_fn"]
        png = Image.open(pathPNG)

        # Transforming image as required
        if self.transforms != None:
            for instanceTransform in self.transforms:
                img = instanceTransform(img)
                
        #Converting PIL Image to numpy array and scaling to [0,1]
        img = np.array(img.convert("RGB"))/256
        png = np.array(png.convert("RGB"))/256

        

        # Converting shape from (H,W,3) to (3,H,W)
        img = np.transpose(img, (2, 0, 1))
        png = np.transpose(png, (2, 0, 1))
        # Converting shape of numpy array for png to (1,H,W)
        png = np.array([png[0]])
        # Building gt_bboxes array
        gt_bboxes = []
        for item in dataIdx["bboxes"]:
            topleftX, topleftY, width, height = item['bbox']
            gt_bboxes.append([item['category'],topleftX, topleftY, topleftX+width, topleftY+height])
        # Building final dictionary as stated in comments   
        finalDict = {}
        finalDict = dict({"image":img,"gt_png_ann":png,"gt_bboxes":gt_bboxes})
        return(finalDict)

#Testing
if __name__ == "__main__" : 
    dset = Dataset("data/annotations.jsonl")
    myDict = dset[7]
    print(myDict)






        