
//get page elements upon submission
function getElements() {
	var q = new Array(18)
	
	//get all user answers for the questions
  q[0] = document.getElementsByName('q1');
  q[1] = document.getElementsByName('q2');
  q[2] = document.getElementsByName('q3');
  q[3] = document.getElementsByName('q4');
  q[4] = document.getElementsByName('q5');
  q[5] = document.getElementsByName('q6');
  q[6] = document.getElementsByName('q7');
  q[7] = document.getElementsByName('q8');
  q[8] = document.getElementsByName('q9');
  q[9] = document.getElementsByName('q10');
  q[10] = document.getElementsByName('q11');
  q[11] = document.getElementsByName('q12');
  q[12] = document.getElementsByName('q13');
  q[13] = document.getElementsByName('q14');
  q[14] = document.getElementsByName('q15');
  q[15] = document.getElementsByName('q16');
  q[16] = document.getElementsByName('q17');
  q[17] = document.getElementsByName('q18');
  
  return q; 
}

//reset the text of the results page 
function resetText() {
	//reset all possible tool created texts 
  char1.textContent = ""; 
  char2.textContent = ""; 
  char3.textContent = ""; 
  char4.textContent = ""; 
  char5.textContent = ""; 
  char6.textContent = "";
  result.textContent = " "; 
}

//initialize jsarray with question descriptions 
function init_jsarray() {
	var jsarray = []; 
	
	
	jsarray[0] = 'Is the class name a noun?: ';
  jsarray[1] = 'Will the class have attributes?: ';
  jsarray[2] = 'If yes, will the class have its own unique attributes?: ';
  jsarray[3] = 'If the class has its own attributes, will they need to be remembered in order for your software to function?: ';
  jsarray[4] = 'If the class has its own attributes, does it have operations involving those attributes?: ';
  jsarray[5] = 'Are any operations changing the value of the attributes?: ';
  jsarray[6] = 'If yes, are all the attributes modifiable?: ';
  jsarray[7] = 'Is there more than one attribute within the class?: ';
  jsarray[8] = 'Could any of the attribute(s) of this class be better represented as of an attribute of another class?: ';
  jsarray[9] = 'If there is more than one attribute, could they ALL be better represented as an attribute of another class?: ';
  jsarray[10] = 'Will each instance of this class have certain attributes shared?: ';
  jsarray[11] = 'Are there more than one common attributes present?: ';
  jsarray[12] = 'If yes, does it apply to ALL instances of the class?: ';
  jsarray[13] = 'Will each instance of this class have certain operations shared?: ';
  jsarray[14] = 'Are there more than one common operation present?: ';
  jsarray[15] = 'If yes, does it apply to ALL instances of the class?: ';
  jsarray[16] = 'Does this class produce information essential to the operation of a solution for the system?: ';
  jsarray[17] = 'Does this class consume information essential to the operation of a solution for the system?: ';
  jsarray[19] = '';
  jsarray[20] = '';
  jsarray[21] = '';
  jsarray[22] = '';
  jsarray[23] = '';
  jsarray[24] = '';
  
  return jsarray;
}


//write the results in their characteristic boxes 
function store_res(char, jsarray, class_name) {
	result.textContent = "Sorry, " + class_name[0].value + " is not a class because: ";

			//if a characteristic fails we print why 
          if (!char[1]) {
            char1.textContent = class_name[0].value + " failed characteristic 1 because it didn't have important attributes for the system."
			jsarray[18] = char1.textContent
          }
          if (!char[2]) {
            char2.textContent = class_name[0].value + " failed characteristic 2 because it didn't have important operations for the system."
			jsarray[19] = char2.textContent
          }
          if (!char[3]) {
            char3.textContent = class_name[0].value + " failed characteristic 3 because this class is better represented as an attribute(s) of another class and should not stand on its own. Failure of this characteristic is critical and leads to failure of the entire class."
			jsarray[20] = char3.textContent
		  } 
          if (!char[4]) {
            char4.textContent = class_name[0].value + " failed characteristic 4 because it didn't share enough attributes between instances of the class."
			jsarray[21] = char4.textContent
		  }
         if (!char[5]) {
            char5.textContent = class_name[0].value + " failed characteristic 5 because it didn't share enough operations between instances of the class."
			jsarray[22] = char5.textContent
		  }
          if (!char[6]) {
            char6.textContent = class_name[0].value + " failed characteristic 6 because the class does not consume or produce information essential to the system which is essential for a class to do. Failure of this characteristic is critical and leads to failure of the entire class.";
			jsarray[23] = char6.textContent
		  }
}

//print results of a form 
function compute_res(flag, naCount, char, jsarray, class_name){
	//if a question was left blank 
    if (flag) {
      result.textContent = "Classification for "  + class_name[0].value + " could not be determined since some necessary question(s) were not completed. Please complete the questionnaire then resubmit."
    }

    //if too many questions were answered N/A we let the user know
    //we can't make a reliable determination on their class 
    else if (naCount >= 8) {
      result.textContent = class_name[0].value + " failed because there was not enough info provided by your answers in the questionnaire. Too many answers may have been labeled as N/A to make a determination.";
    }

    //otherwise we either print the class passed
    //or we print that it failed and which charateristics it failed which led to it failing 
    else {
      var failCount = 0;
      for (var j = 1; j <= 6; ++j) {
        if (!char[j]) {
          ++failCount;
        }
      }
      if (failCount >= 2 || !char[3] || !char[6]) {
        store_res(char, jsarray, class_name);
      }
      else {
        result.textContent = "Congratulations " + class_name[0].value + " is a Class!"
      }
    }
}

//calculate if value is a class 
function isClass() {
  //clarify where we are putting the result text. 
  var result = document.getElementById('result');

  //get name of the class 
  var class_name = document.getElementsByName('classname');

	//reset all possible tool created texts 
  resetText(); 

  var points = 0;
  var naCount = 0;
  var char = new Array(false, false, false, false, false, false, false);
  var flag = false;
  var jsarray = init_jsarray();
  var q = getElements();
  
  
  //if class isn't given a name by the user, then we assign it a default name 
  if (class_name[0].value == "") {
    class_name[0].value = "your class";
  }
  
  //get values to store in array for results later 
  for (var z = 0; z < q.length; z++) {
	  for (var w = 0; w < 3; w++) {
		  
		  if (q[z][w].checked) {
			  jsarray[z] += q[z][w].value; 
		  }
	  }
  }
  

  /*First question is seperate from the rest 
  since if this question is false the class fails anyways,
  saves computational power to not check the rest of the answers*/
  if (q[0][0].checked || q[0][2].checked) {
    char[0] = true;
  }
  else {
    char[0] = false;
  }

 //only if q1 isn't false 
  if (char[0]) {

    /*
    *******************************************************************************
    check the answers for each question and increment 
    variable points by a weighted amount based on the answer. If variable points is 
    still a positive value after all answers have been checked and points has been incremented
    or decremented appropriately, then it passes the given characteristic.
    ********************************************************************************

    ********************************************************************************
    some questions have heavy weights if answered no (ex. a no is a -100 decrement to the 
    points variable) because they are critical to be yes. The yes increment could be smaller for the same question though (ex. +5) to allow for the characteristic to still fail if corresponding
    questions are both answered no.
    ********************************************************************************

    ********************************************************************************
    N/A answers will either be treated as a negative to the point variable or as a +0 
    depending on the contextual importance of not knowing the answer to a prticular question.
    *********************************************************************************
    */ 
	var i = 0
	
	
    for (i = 1; i <= 3; ++i) { //for q2-4
      if (q[i][0].checked)
        if (i == 1) {       //q2 yes is selected
          points += 5;
        }
        else if (i == 2) {  //q3 yes is selected
          points += 1;
        }
        else {              //q4 yes is selected
          points += 1;     
        }
      else if (q[i][1].checked)
        if (i == 1) {      //q2 no is selected (CRITICAL)
          points -= 100;
        }
        else if (i == 2) { //q3 no is selected
          points -= 3;
        }
        else {             //q4 no is selected
          points -= 3; 
        }
      else if (q[i][2].checked)
        if (i == 1) {
          points -= 100;   //q2 N/A is selected (CRITICAL)
          naCount++;
        }
        else if (i == 2) { //q3 N/A is selected
          points += 0;
          naCount++;
        }
        else {             //q4 N/A is selected
          points += 0;
          naCount++;
        }
       //A Question was left unanswered raises a flag, so the program will prompt
       //the user to fill out any empty q's before it calculates an answer 
      else { 
        flag = true;
      }
    }

    //if points is positive it passes the characteristic test 
    if (points >= 0) {
      char[1] = true;
    }

    //reset points so it can be reused during the other characteristic tests
    points = 0;

    /*******************************************************************************
      ALL FUTURE CHARACTERISTICS ARE DETERMINED THE SAME WAY SO THEY WILL NOT BE 
      COMMENTED
     *******************************************************************************/

    for (i = 4; i <= 6; ++i) { //for q5-7
      if (q[i][0].checked)
        if (i == 4) {
          points += 5;
        }
        else if (i == 5) {
          points += 2;
        }
        else {
          points += 1;
        }
      else if (q[i][1].checked)
        if (i == 4) {
          points -= 100;
        }
        else if (i == 5) {
          points -= 6;
        }
        else {
          points -= 1;
        }
      else if (q[i][2].checked)
        if (i == 4) {
          points -= 100;
          naCount++;
        }
        else if (i == 5) {
          points -= 4;
          naCount++;
        }
        else {
          points += 0;
          naCount++;
        }
      else {  //A Question was left unanswered
        flag = true;
      }
    }

    if (points >= 0) {
      char[2] = true;
    }
    points = 0;

    for (i = 7; i <= 9; ++i) { //for q8-10
      if (q[i][0].checked)
        if (i == 7) {
          points += 5;
        }
        else if (i == 8) {
          points -= 1;
        }
        else {
          points -= 100
        }
      else if (q[i][1].checked)
        if (i == 7) {
          points -= 100;
        }
        else if (i == 8) {
          points += 0;
        }
        else {
          points += 1;
        }
      else if (q[i][2].checked)
        if (i == 7) {
          points -= 1;
          naCount++;
        }
        else if (i == 8) {
          points += 0;
          naCount++;
        }
        else {
          points += 0;
          naCount++;
        }
      else {  //A Question was left unanswered
        flag = true;
      }
    }

    if (points >= 0) {
      char[3] = true;
    }
    points = 0;

    for (i = 10; i <= 12; ++i) { //for q11-13
      if (q[i][0].checked)
        if (i == 10) {
          points += 5;
        }
        else if (i == 11) {
          points += 2;
        }
        else {
          points += 5;
        }
      else if (q[i][1].checked)
        if (i == 10) {
          points -= 100;
        }
        else if (i == 11) {
          points -= 1;
        }
        else {
          points -= 100;
        }
      else if (q[i][2].checked)
        if (i == 10) {
          points -= 1;
          naCount++;
        }
        else if (i == 11) {
          points += 0;
          naCount++;
        }
        else {
          points += 0;
          naCount++;
        }
      else {  //A Question was left unanswered
        flag = true;
      }
    }

    if (points >= 0) {
      char[4] = true;
    }
    

    for (i = 13; i <= 15; ++i) { //for q14-16
      if (q[i][0].checked)
        if (i == 13) {
          points += 5;
        }
        else if (i == 14) {
          points += 1;
        }
        else {
          points += 5;
        }
      else if (q[i][1].checked)
        if (i == 13) {
          points -= 100;
        }
        else if (i == 14) {
          points -= 1;
        }
        else {
          points -= 100;
        }
      else if (q[i][2].checked)
        if (i == 13) {
          points -= 1;
          naCount++;
        }
        else if (i == 14) {
          points += 0;
          naCount++;
        }
        else {
          points += 0
          naCount++;
        }
      else {  //A Question was left unanswered
        flag = true;
      }
    }

    if (points >= 0) {
      char[5] = true;
    }
    points = 0;

    for (i = 16; i <= 17; ++i) { //for q17-18
      if (q[i][0].checked)
        if (i == 16) {
          points += 100;
        }
        else {
          points += 100;
        }
      else if (q[i][1].checked)
        if (i == 16) {
          points -= 100;
        }
        else {
          points -= 100;
        }
      else if (q[i][2].checked)
        if (i == 16) {
          points -= 1;
          naCount++;
        }
        else {
          points -= 1;
          naCount++;
        }
      else {  //A Question was left unanswered
        flag = true;
      }
    }

    if (points >= 0) {
      char[6] = true;
    }
   
   //compute the results 
	compute_res(flag, naCount, char, jsarray, class_name); 
  }

  //if the first question was left blank we let the user know
  else if (!q[0][0].checked && !q[0][1].checked && !q[0][2].checked) {
    result.textContent = "Classification for "  + class_name[0].value + " could not be determined since some necessary question(s) were not completed. Please complete the questionnaire then resubmit."
  }

  //if the first question was set as 'no' it automatically fai
  else {
    result.textContent = class_name[0].value + " failed because the name was chosen to not be a noun. In order for a class to be valid the name of it must be a noun. Not naming the class a noun is a critical issue/error, and therefore no other attributes were checked. ";
  }
  
  jsarray[24] = result.textContent;
  
  //store all results in a session variable and navigate to results page 
  sessionStorage.setItem("jsarray", JSON.stringify(jsarray)); 
  window.location.href = 'results.html'; 

}

//return to home page 
function return_page() {
	
	//just send back to home 
	window.location.href = 'index.html';
}

//load the result answer on the results page 
function loadres() {
	
	//load results from answers on index.html 
	
	//get the current results 
	var jsarray = JSON.parse(sessionStorage.getItem("jsarray")); 
	
	//load results history
	var allEnters = JSON.parse(sessionStorage.getItem("jsarray_all")); 
	var entries =JSON.parse(sessionStorage.getItem("entries")); 
	
	//if there is no history yet, initialize it 
	if (allEnters == null) {
		
		entries  = 1; 
		allEnters = []; 
		allEnters[entries - 1] = jsarray; 
		sessionStorage.setItem("jsarray_all", JSON.stringify(allEnters));
		sessionStorage.setItem("entries", entries);
	}
	
	//add to history if it exists 
	else {
		entries += 1
		allEnters[entries - 1] = jsarray; 
		sessionStorage.setItem("jsarray_all", JSON.stringify(allEnters));
		sessionStorage.setItem("entries", entries);
	}
	
	//print results to screen 
	result.textContent = jsarray[24]; 
	char1.textContent = jsarray[18]; 
	char2.textContent = jsarray[19]; 
	char3.textContent = jsarray[20]; 
	char4.textContent = jsarray[21]; 
	char5.textContent = jsarray[22]; 
	char6.textContent = jsarray[23]; 
}

//load all the results on the result history page 
function allRes() {

	//get history 
	var allEnters = JSON.parse(sessionStorage.getItem("jsarray_all")); 
	
	var body = ""; 
	
	if (allEnters != null)  {
	
		//for all the submissions 
		for (var i = 0; i < allEnters.length; i++) {
		
			
			//form body to show history 
			body = "<table name='table'><tr><td>Answers for attempt " + String(i + 1) + "</td></tr> "; 
			
			//show answers to Q's 
			for (var j = 0; j < 18; j++) {
				
				
				body += "<tr><td>" + "Q" + String(j + 1) + ": " + String(allEnters[i][j]) + "</td></tr>"; 
			}
			
			//print the result text 
			body += "<tr><td></td></tr><tr><td>Results: </td></tr>"; 
			
			body += "<tr><td>" + String(allEnters[i][24]) +"</td></tr>"; 
			
			for (var k = 18; k < 24; ++k) {
				if (String(allEnters[i][k]) != "null" && String(allEnters[i][k]) != "") {
					body +="<tr><td>" + String(allEnters[i][k])+"</td></tr>"; 
				}
			}
			
				//add option to send this result from the history to email 
				body +="</table><br><form style='color:antiquewhite'>Input your Email:<input style='margin-left: 90px' type='text' name= 'email'></form><br><button type='button' value = '" + String(i) + "' style='color:black' onclick='email(this.value)'>Email Results</button><br><br><br>"; 
				
				//display on HTML 
				document.body.innerHTML = document.body.innerHTML + body; 
			
		
		}
	}
	else {
	
		//form body to show history 
		body = "<h1> No Results</h1>";
		//display on HTML 
		document.body.innerHTML = document.body.innerHTML + body; 
	
	}
	
}

//send email of results 
function email(index) {
	var jsarray = ''; 

	//value if it is sending only current result from result page 
	if (index == -1) {
		//get our current result from the session variable 
		jsarray = JSON.parse(sessionStorage.getItem("jsarray")); 
		
		
		//make sure the page is still set okay 
		char1.textContent = jsarray[18]; 
		char2.textContent = jsarray[19]; 
		char3.textContent = jsarray[20]; 
		char4.textContent = jsarray[21]; 
		char5.textContent = jsarray[22]; 
		char6.textContent = jsarray[23]; 
		result.textContent = jsarray[24]; 
	}
	else {
		//get history 
		var allEnters = JSON.parse(sessionStorage.getItem("jsarray_all")); 

		//get the submission the user chose to email 
		jsarray = allEnters[index]; 
	}
	
	//start email body 
	var body = 'Answers: '; 
	
	//get the answers to the Qs
	for (var i = 0; i < 18; i++) {
		body += "<br><br>" + "Q" + String(i + 1) + ": " + String(jsarray[i]); 
	}
	
	
	//print the result text and eplanation 
	body += "<br><br>Results: "; 
	body +="<br>" + String(jsarray[24]); 
	
	
	
		if (String(jsarray[18]) != "") {
			body +="<br>" + String(jsarray[18]); 
		}
		if (String(jsarray[19]) != "") {
			body +="<br>" + String(jsarray[19]); 
		}
		if (String(jsarray[20]) != "") {
			body +="<br>" + String(jsarray[20]); 
		}
		if (String(jsarray[21]) != "") {
			body +="<br>" + String(jsarray[21]); 
		}
		if (String(jsarray[22]) != "") {
			body +="<br>" + String(jsarray[22]); 
		}
		if (String(jsarray[23]) != "") {
			body +="<br>" + String(jsarray[23]); 
		}
	
	
	//get name of the email
	var email_name = document.getElementsByName('email');

	
	//send email and response 
	Email.send({
		Host : "smtp.gmail.com",
		Username : "tinytoolcis@gmail.com",
		Password : "resetpass",
		To : email_name[0].value,
		From : "tinytoolcis@gmail.com",
		Subject : "Results",
		Body : body
    }).then(
      message => alert(message)
    );
	
}