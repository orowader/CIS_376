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
	
	result.textContent = jsarray[24]; 
	char1.textContent = jsarray[18]; 
	char2.textContent = jsarray[19]; 
	char3.textContent = jsarray[20]; 
	char4.textContent = jsarray[21]; 
	char5.textContent = jsarray[22]; 
	char6.textContent = jsarray[23]; 
}


