/* global variables */
var hourcounter = 0;
var minutecounter = 0;
var secondcounter = 0;
var tenthsecondcounter = 0;
var hundredthsecondcounter = 0;

/* function declaration */
function checktimedispatcher() {

/* collect current date/time and localize */
var currentdate=new Date();
var currenttime= currentdate.toLocaleTimeString();
document.getElementById("timerelement").innerHTML= currenttime;

/* update the running timers */
hundredthsecondcounter = hundredthsecondcounter +1;
document.getElementById("hundredthelement").innerHTML= hundredthsecondcounter;
if ( (hundredthsecondcounter%10) == 0 ) {
  tenthsecondcounter = tenthsecondcounter +1;
  document.getElementById("tenthelement").innerHTML= tenthsecondcounter;
  if ( (tenthsecondcounter%10) == 0) {
    secondcounter = secondcounter + 1;
    document.getElementById("secondelement").innerHTML= secondcounter;
    if ( (secondcounter%60) == 0) {
      minutecounter = minutecounter + 1;
      document.getElementById("minuteelement").innerHTML= minutecounter;
      if ( (minutecounter%60) == 0) {
        hourcounter = hourcounter + 1;
        document.getElementById("hourelement").innerHTML= hourcounter;
      } /* END hour check */
    } /* END minute check */
  } /* END second check */
} /* END tenth second check */

} /* END FUNCTION checktimedispatcher */

//-->