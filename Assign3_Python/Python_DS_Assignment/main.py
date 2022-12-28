#Imports
from my_package import model
from my_package.data import dataset
from my_package.analysis import visualize
from my_package.data.transforms import flip, rescale, blur, crop, rotate
import numpy as np
import cv2

def experiment(annotation_file, segmentor, transforms, outputs):
    '''
        Function to perform the desired experiments

        Arguments:
        annotation_file: Path to annotation file
        segmentor: The image segmentor
        transforms: List of transformation classes
        outputs: path of the output folder to store the images
    '''

    #Create the instance of the dataset.
    data = dataset.Dataset(annotation_file,transforms)
    #Iterate over all data items.
    Dict = data[7]
    #Get the predictions from the segmentor.
    pred_boxes, pred_masks, pred_class, pred_score = segmentor(Dict['image'])

    img = np.transpose(Dict['image'], (1, 2, 0))
    #Draw the segmentation maps on the image and save them.
    img = visualize.plot_visualization(img,pred_masks,pred_boxes,pred_class)
    img = cv2.cvtColor(img,cv2.COLOR_RGB2BGR)
    cv2.imwrite(outputs,img*256)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    #Do the required analysis experiments.
    


def main():
    segmentor = model.InstanceSegmentationModel()
    experiment('./data/annotations.jsonl', segmentor, None, "Outputs/7_A.jpeg") # Sample arguments to call experiment()
    print("First Analysis is Completed")
    experiment('./data/annotations.jsonl', segmentor, [flip.FlipImage('horizontal')], "Outputs/7_B.jpeg")
    print("Second Analysis is Completed")
    experiment('./data/annotations.jsonl', segmentor, [blur.BlurImage(20)], "Outputs/7_C.jpeg")
    print("Third Analysis is Completed")
    experiment('./data/annotations.jsonl', segmentor, [rescale.RescaleImage(2)], "Outputs/7_D.jpeg")
    print("Fourth Analysis is Completed")
    experiment('./data/annotations.jsonl', segmentor, [rescale.RescaleImage(0.5)], "Outputs/7_E.jpeg")
    print("Fifth Analysis is Completed")
    experiment('./data/annotations.jsonl', segmentor, [rotate.RotateImage(-90)], "Outputs/7_F.jpeg")
    print("Sixth Analysis is Completed")
    experiment('./data/annotations.jsonl', segmentor, [rotate.RotateImage(45)], "Outputs/7_G.jpeg")
    print("Seventh Analysis is Completed")

if __name__ == '__main__':
    main()