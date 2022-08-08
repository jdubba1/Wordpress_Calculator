CHANGELOG

7/12
- Added diameter column
- updated naming conventions
- removed missing spec motor
- fixed clear button issue
- fixed sticky results table headers
- added hp / kW conversion and responsive change in results table

7/13
- added torque filtering logic
- results sorted by lowest matching torque first then ascending (BASIC SORTING / ADVANCED SAVING FOR PHASE 2)
- testing performed on kW logic
- repeat "no compatible" issue resolved by switching to ALERT 

7/18

- no compatible motors found bug occurs when calculated in hp and switching to kw (FIX ME)
- add torque shading added (yellow if geq torque and leq max torque)
- added calculate on enter press
- fixed sticky compatible motors div
- leaving calculate button where it is for now to mimic WEN technologies calculator


7/20
- added bootstrap 
- made application more compatible with wordpress
- lots of styling changes
- calculate button moved to bottom right of calculator
- fields clear on clear button press as well as the results

7/21
- removed bootstrap
- even more styling changes
- created appended input fields w custom css to replace those we lost with bootstrap ;(
- fixed alignment issues
- changed to rem units for sizing
- TODO: FIX UNIT SWITCH CALCULATE CHANGE TO CLEAR TABLE

8/08
-test









TODO - PHASE 1:

- move hp kw dropdown to appended text input
- MAKE ROWS CLICKABLE

- order motors in a different way?
- remove specs link and make it so you can just click the table row of the motor you want


- update wordpress code once the above has been completed --INCOMPLETE--
- motor array as JSON file? --INCOMPLETE-- LOW PRIORITY//FORMATTING ISSUES
- FINAL PHASE1 TESTING  -- INCOMPLETE -- 


DISCUSSION
    - catalogue number on right side of table??
    - no compatible motors were found as an alert? or as html element



