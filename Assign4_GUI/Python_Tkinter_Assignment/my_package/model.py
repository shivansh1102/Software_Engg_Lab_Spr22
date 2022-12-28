import torch
import torch.nn as nn
import torchvision
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
from torchvision.models.detection.mask_rcnn import MaskRCNNPredictor

# Class id to name mapping
COCO_INSTANCE_CATEGORY_NAMES = [
    '__background__', 'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus',
    'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'N/A', 'stop sign',
    'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow',
    'elephant', 'bear', 'zebra', 'giraffe', 'N/A', 'backpack', 'umbrella', 'N/A', 'N/A',
    'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
    'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
    'bottle', 'N/A', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl',
    'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza',
    'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'N/A', 'dining table',
    'N/A', 'N/A', 'toilet', 'N/A', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone',
    'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'N/A', 'book',
    'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'
]

# Class definition for the model
class InstanceSegmentationModel(object):
	'''
    	The blackbox image segmentation model (MaskRCNN).
		Given an image as numpy array (3, H, W), it generates the segmentation masks.
	'''
	# __init__ function
	def __init__(self):
		self.model = torchvision.models.detection.maskrcnn_resnet50_fpn(pretrained=True)
		self.model.eval()

	# function for calling the mask-rcnn model
	def __call__(self, input):
		'''
			Arguments:
				input (numpy array): A (3, H, W) array of numbers in [0, 1] representing the image.

			Returns:
				pred_boxes (list): list of bounding boxes, [[x1 y1 x2 y2], ..] where (x1, y1) are the coordinates of the top left corner 
									and (x2, y2) are the coordinates of the bottom right corner.

				pred_masks (list): list of the segmentation masks for each of the objects detected.

				pred_class (list): list of predicted classes.

				pred_score (list): list of the probability (confidence) of prediction of each of the bounding boxes.				

			Tip:
				You can print the outputs to get better clarity :)
		'''

		input_tensor = torch.from_numpy(input)
		input_tensor = input_tensor.type(torch.FloatTensor)
		input_tensor = input_tensor.unsqueeze(0)
		predictions = self.model(input_tensor)
		#print(predictions) #uncomment this if you want to know about the output structure.

		pred_class = [COCO_INSTANCE_CATEGORY_NAMES[i] for i in list(predictions[0]['labels'].numpy())] # Prediction classes
		pred_masks = list(predictions[0]['masks'].detach().numpy()) # Prediction masks
		pred_boxes = [[(i[0], i[1]), (i[2], i[3])] for i in list(predictions[0]['boxes'].detach().numpy())] # Bounding boxes
		pred_score = list(predictions[0]['scores'].detach().numpy()) # Prediction scores
		
		return pred_boxes, pred_masks, pred_class, pred_score 

