# Software Lab 

## Python GUI Assignment (tkinter)

This is a follow up assignment to the Python Datascience assignment which we have already completed. In this assignment we will design a GUI using `tkinter` which would have the following overall functionality:

* The GUI would provide the user to select a file from the computer.
* It will have a dropdown menu to toggle between two output options: `Segmentation` and `Bounding-box`
* If `Segmentation` is selected then it should show the segmentation map of the selected image file along with the original image file side-by-side.
* For `Bounding-box` it should display the bounding boxes instead of the segmentation maps.
* We will obtain the segmentation maps and the bounding boxes by taking help from the previous assignment (which you have already done).

## Coding Task:

For this assignment you are expected to modify a single file, which is `ImageViewerGUI.py` which should be maximum 120 lines of code.

1. Define the function `fileClick`: This function should pop-up a dialog for the user to select an input image file. Once the image is selected by the user, it should automatically get the corresponding outputs from the segmentor (call the segmentor from here). Once the output is computed it should be shown automatically based on choice the dropdown button is at.
2. Define the function `process`: Should show the corresponding segmentation or bounding boxes over the input image wrt the choice provided. This function will just show the output, which should have been already computed in the `fileClick` function above. Also, you should handle the case if the user clicks on the `Process` button without selecting any image file.
3. Complete the `main` function and add the required `imports` at the top.

All the details are mentioned as comments in the code file as well.
Note: you need to add your codes at the specified locations only. These sections begin with the flag `####### CODE REQUIRED (START) #######` and end with `####### CODE REQUIRED (END) #######`.

In order to be super clear on how the final GUI should function like, here is a sample video showing it. We would expect something similar to this, but individual creativity and additional functionalities are most welcome and encouraged!

&nbsp;
<p align="center">
(https://drive.google.com/file/d/1BzC7EVKUIOryc8UIH0fxt3mL_GZqjzaQ/view?usp=sharing)
</p>
<p align="center">
Sample Video Link. </p>
&nbsp;

