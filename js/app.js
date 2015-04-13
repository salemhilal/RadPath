(function(){
var app = angular.module('radpath', []);


/***********************

Filters

We use lots of these, because most of the views
essentially just show subsets of our cases.

***********************/

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
		var isSeen = (typeof seen === "undefined") ? true : seen;
		for (var i = 0; i < patients.length; i++) {
			var patient = patients[i];
			if (patient.seen === isSeen) {
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

// Right click directive
app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
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

	this.showContextMenu = function($event, id) {
		console.log('right click on ' + id);
		console.log('$event', $event);
		$('.small-followup-form')
			.fadeOut(100, function() {
				$('.small-followup-form.form-' + id)
				.css({'top': $event.clientY, 'left': $event.clientX })
				.show();
			});
	};


	this.hideContextMenues = function() {
		$('.small-followup-form').fadeOut(100);
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
