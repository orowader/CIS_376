function loadres() {
	
	jsarray = JSON.parse(sessionStorage.getItem("jsarray")); 
	var allEnters = JSON.parse(sessionStorage.getItem("jsarray_all")); 
	var entries =JSON.parse(sessionStorage.getItem("entries")); 
	
	if (allEnters == null) {
		
		entries  = 1; 
		
		allEnters = []; 
		allEnters[entries - 1] = jsarray; 
		sessionStorage.setItem("jsarray_all", JSON.stringify(allEnters));
		sessionStorage.setItem("entries", entries);
	}
	else {
		entries += 1
		allEnters[entries - 1] = jsarray; 
		sessionStorage.setItem("jsarray_all", JSON.stringify(allEnters));
		sessionStorage.setItem("entries", entries);
	}
	
	char1.textContent = jsarray[18]; 
	char2.textContent = jsarray[19]; 
	char3.textContent = jsarray[20]; 
	char4.textContent = jsarray[21]; 
	char5.textContent = jsarray[22]; 
	char6.textContent = jsarray[23]; 
	result.textContent = jsarray[24]; 
}

function allRes() {
	var allEnters = JSON.parse(sessionStorage.getItem("jsarray_all")); 
	
	
	
	

	for (var i = 0; i < allEnters.length; i++) {
	
		
		var body = '<div>Answers: '; 
		
		for (var j = 0; j < 18; j++) {
			
			
			body += "<br><br>" + "Q" + String(j + 1) + ": " + String(allEnters[i][j]); 
		}
		
		body += "<br><br>Results: "; 
		
		
		
			if (String(allEnters[i][18]) != "") {
				body +="<br>" + String(allEnters[i][18]); 
			}
			if (String(allEnters[i][19]) != "") {
				body +="<br>" + String(allEnters[i][19]); 
			}
			if (String(allEnters[i][20]) != "") {
				body +="<br>" + String(allEnters[i][20]); 
			}
			if (String(allEnters[i][21]) != "") {
				body +="<br>" + String(allEnters[i][21]); 
			}
			if (String(allEnters[i][22]) != "") {
				body +="<br>" + String(allEnters[i][22]); 
			}
			if (String(allEnters[i][23]) != "") {
				body +="<br>" + String(allEnters[i][23]); 
			}
		
		
			body +="<br>" + String(allEnters[i][24]) + '</div>'; 
			
			document.write(body); 
		
	
	}
	
}

