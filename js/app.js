(function(){
var app = angular.module('radpath', []);
app.controller('RadPathController', function(){
	this.patients = data.patients;
	this.radiologists = data.radiologists;
	this.pathologists = data.pathologists;

	this.getRadiologist = function(id){
		var r = findObj('id', id, this.radiologists);
		return r.first_name + ' ' + r.last_name;
	}

	this.getPathologist = function(id){
		var p = findObj('id', id, this.pathologists);
		return p.first_name + ' ' + p.last_name;
	}
});

app.controller('RequestFeedbackController', function(){
	this.feedbackRequest = {};

	this.requestFeedback = function(patient) {
		var newRequest = this.feedbackRequest;
		newRequest.is_fulfilled = false;
		newRequest.date = new Date();
		patient.requested_feedback = newRequest;

	}
});

})();