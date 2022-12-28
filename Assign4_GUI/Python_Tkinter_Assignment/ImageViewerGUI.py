####### REQUIRED IMPORTS FROM THE PREVIOUS ASSIGNMENT #######
from my_package.model import InstanceSegmentationModel
from my_package.data import Dataset
from my_package.analysis import plot_visualization
from my_package.data.transforms import FlipImage, RescaleImage, BlurImage, CropImage, RotateImage

####### ADD THE ADDITIONAL IMPORTS FOR THIS ASSIGNMENT HERE #######
from tkinter import *
from tkinter import filedialog 
from tkinter import OptionMenu
from functools import partial
from PIL import ImageTk, Image
import numpy as np
import cv2
import os
# Define the function you want to call when the filebrowser button is clicked.
def fileClick(clicked, dataset, segmentor):

	####### CODE REQUIRED (START) #######
	# This function should pop-up a dialog for the user to select an input image file.
	# Once the image is selected by the user, it should automatically get the corresponding outputs from the segmentor.
	# Hint: Call the segmentor from here, then compute the output images from using the `plot_visualization` function and save it as an image.
	# Once the output is computed it should be shown automatically based on choice the dropdown button is at.
	# To have a better clarity, please check out the sample video.

	# Allowing only jpg type file selection 
	imgTypes = [('jpg Images','*.jpg')]
	#  File Dialog
	global imgName # will use this for checking a condition in process(), so declaring gloablly
	imgName = filedialog.askopenfilename(title = 'Select Image', initialdir = 'data/img/', filetypes = imgTypes)
	if len(imgName) == 0 : #If no image is selected
		return
	# deleting previously written text in Entry widget
	e.delete(0,END)
	# writing name of current image, Assuming images are numbered from 0-9(single digit)
	e.insert(0,"Image : " + imgName[-5])
	#Getting the predictions from the segmentor.

	Dict = dataset[int(imgName[-5])]
	pred_boxes, pred_masks, pred_class, pred_score = segmentor(Dict['image'])
	# Will use this in process(), so declaring them globally
	global origImg, finalSegmentedImg, finalBoundedBoxImg
	#Creating segmented image
	origImg = np.transpose(Dict['image'], (1, 2, 0))
    # Drawing the segmentation maps on the image and saving them.
	finalSegmentedImg = plot_visualization(origImg,pred_masks,pred_boxes,pred_class,"Segmentation")
	finalBoundedBoxImg = plot_visualization(origImg,pred_masks,pred_boxes,pred_class,"Bounding-box")
	# On converting cv2 image to PIL, Segmentation marks color gets randomized so saving cv2 image,
	# reading it as PIL Image and deleting the saved Image
	finalSegmentedImg = cv2.cvtColor(finalSegmentedImg,cv2.COLOR_RGB2BGR)
	cv2.imwrite("SampleFinal.jpg",finalSegmentedImg*256)
	finalSegmentedImg = Image.open("SampleFinal.jpg")
	
	finalBoundedBoxImg = cv2.cvtColor(finalBoundedBoxImg, cv2.COLOR_RGB2BGR)
	cv2.imwrite("SampleFinal2.jpg",finalBoundedBoxImg*256)
	finalBoundedBoxImg = Image.open("SampleFinal2.jpg")

	origImg = Image.open(imgName)
	# Converting to Tkinter Images
	origImg = ImageTk.PhotoImage(origImg)
	finalSegmentedImg = ImageTk.PhotoImage(finalSegmentedImg)
	finalBoundedBoxImg = ImageTk.PhotoImage(finalBoundedBoxImg)
	# adding in left panel
	panelOrigImg.config(image = origImg)
	panelOrigImg.image = origImg
	
	if clicked.get() == "Segmentation" :  # If segmentation is choosen from drop-down
		panelFinalImg.config(image = finalSegmentedImg)
		panelFinalImg.image = finalSegmentedImg
	else : # If bounded-box is choosen from drop-down
		panelFinalImg.config(image = finalBoundedBoxImg)
		panelFinalImg.image = finalBoundedBoxImg
	
	#Deleting the saved Image
	os.remove("SampleFinal.jpg")
	os.remove("SampleFinal2.jpg")
	cv2.waitKey(0)
	cv2.destroyAllWindows()
	####### CODE REQUIRED (END) #######

# `process` function definition starts from here.
# will process the output when clicked.
def process(clicked):

	####### CODE REQUIRED (START) #######
	# Should show the corresponding segmentation or bounding boxes over the input image wrt the choice provided.
	# Note: this function will just show the output, which should have been already computed in the `fileClick` function above.
	# Note: also you should handle the case if the user clicks on the `Process` button without selecting any image file.

	# Catch for No Image Selected
	try : 
		if len(imgName) == 0 :
			print("Choose an image first!")
	except : 
		print("Choose an image first!")
		return
	
	if clicked.get() == "Segmentation" : # If segmentation is choosen from drop-down
		panelFinalImg.config(image = finalSegmentedImg)
		panelFinalImg.image = finalSegmentedImg
	else : # If bounded-box is choosen from drop-down
		panelFinalImg.config(image = finalBoundedBoxImg)
		panelFinalImg.image = finalBoundedBoxImg

	####### CODE REQUIRED (END) #######

# `main` function definition starts from here.
if __name__ == '__main__' :
	####### CODE REQUIRED (START) ####### (2 lines)
	# Instantiate the root window.
	# Provide a title to the root window.
	root = Tk()
	root.title("Shivansh Shukla's Assignment Window")
	root.geometry('1500x700')
	####### CODE REQUIRED (END) #######

	# Setting up the segmentor model.
	annotation_file = './data/annotations.jsonl'
	transforms = []

	# Instantiate the segmentor model.
	segmentor = InstanceSegmentationModel()
	# Instantiate the dataset.
	dataset = Dataset(annotation_file, transforms=transforms)


	# Declare the options.
	options = ["Segmentation", "Bounding-box"]
	clicked = StringVar()
	clicked.set(options[0])

	e = Entry(root, width=70)
	e.grid(row=0, column=0)

	####### CODE REQUIRED (START) #######
	# Declare the file browsing button
	fileButton = Button(root, text = "Choose img" , command = partial(fileClick,clicked, dataset, segmentor))
	fileButton.grid(row = 0, column = 1)
	# Declaring panels for images
	panelOrigImg = Label(root, image = "")
	panelFinalImg = Label(root, image = "")
	panelOrigImg.grid(row = 1, column = 0) # left panel
	panelFinalImg.grid(row = 1, column = 1) # right panel
	####### CODE REQUIRED (END) #######

	####### CODE REQUIRED (START) #######
	# Declare the drop-down button
	dropDown = OptionMenu(root, clicked, *options)
	dropDown.grid(row = 0, column = 2)
	####### CODE REQUIRED (END) #######

	# This is a `Process` button, check out the sample video to know about its functionality
	myButton = Button(root, text="Process", padx = 10, command=partial(process, clicked))
	myButton.grid(row=0, column=3)


	####### CODE REQUIRED (START) ####### (1 line)
	# Execute with mainloop()
	root.mainloop()
	####### CODE REQUIRED (END) #######