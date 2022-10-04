# WP_Calculator



Calculator for WordPress tailored for the headers and footers plugin.

The main calculator is housed in the calculator div, and structured as an html table element. The logic of the calculation is preformed in the calculateTorque() function. Options are included to add kW conversion, etc. Note that kW ratings must be added to the motor dictionary in order for the recommendation function to work properly.

The recommendation function, findCompatible(), checks the inputs of the calculator against an array of js "motor" objects, motors[], and lists motors that satisfy the conditions in a table format. This array can handle any additions of new motors, so long as the formatting is consistent. 

The results table, and recommendation section in general, is hidden until a matching motor is found. 

The clear button may be removed, as clearing is preformed automatically when the calculate button is pressed. Automatic recalculation may also be enabled. 



** NOTE as of 7/8/22: spec sheet link is missing for IEs205-15-1800-460-A
