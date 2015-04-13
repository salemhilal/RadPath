(function(){
var app = angular.module('radpath', []);

// Filter for starred cases.
app.filter('starred', function() {
	return function(patients) {
		var filtered = [];
		for (var i = 0; i < patients.length; i++) {
			var patient = patients[i];
			if (patient.star) {
				filtered.push(patient);
			}
		}
		return filtered;
	};
});

// Filter for seen patients. Pass "false" to match unseen patients.
app.filter('seen', function() {
	return function(patients, seen) {
		var filtered = [];
		var seen = (typeof seen === "undefined") ? true : seen;
		for (var i = 0; i < patients.length; i++) {
			var patient = patients[i];
			if (patient.seen === seen) {
				filtered.push(patient);
			}
		}	
		return filtered;
	};
});


// Determine if a patient is in the worklist. 
app.filter('worklist', function() {
	return function(patients) {
		var filtered = [];
		for (var i = 0; i < patients.length; i++) {
			var patient = patients[i];
			if (patient.worklist) {
				filtered.push(patient);
			}
		}	
		return filtered;
	};
});


// Main controller
app.controller('RadPathController', function(){
	this.patients = data.patients;
	this.radiologists = data.radiologists;
	this.pathologists = data.pathologists;

	this.getRadiologist = function(id){
		var r = findObj('id', id, this.radiologists);
		return r.first_name + ' ' + r.last_name;
	};

	this.getPathologist = function(id){
		var p = findObj('id', id, this.pathologists);
		return p.first_name + ' ' + p.last_name;
	};

	this.toggleStar = function(id) {
		console.log('toggling', id);
		var p = findObj('id', id, this.patients);
		p.star = !p.star;
	};
});

app.controller('RequestFeedbackController', function(){
	this.feedbackRequest = {};

	this.requestFeedback = function(patient) {
		var newRequest = this.feedbackRequest;
		newRequest.is_fulfilled = false;
		newRequest.date = new Date();
		patient.requested_feedback = newRequest;

	};
});

})();