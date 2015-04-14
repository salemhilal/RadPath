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

// New Follow Up filter for unseen feedback
app.filter('newfollowup', function() {
	return function (patients) {
		return patients.filter(function (patient) {
			return 	patient.requested_feedback &&
					patient.requested_feedback.is_fulfilled &&
					!patient.seen;
		});
	};
});

// Archive, i.e. everything with feedback that isn't in New Follow Up
app.filter('archive', function() {
	return function (patients) {
		return patients.filter(function (patient) {
			return 	patient.requested_feedback &&
					patient.requested_feedback.is_fulfilled &&
					patient.seen;
		});
	};
});

// Determine if a patient is in the worklist.
app.filter('worklist', function() {
	return function(patients) {
		return patients.filter(function (patient) {
			return patient.worklist;
		});
	};
});

// Is something a pending feedback case?
app.filter('pending', function () {
	return function (patients) {
		return patients.filter(function (patient) {
			return patient.requested_feedback &&
					patient.requested_feedback.is_fulfilled === false;
		});
	};
});

// Is something a pending rad case?
// Note: chain this after 'pending' to make sure it's pending.
app.filter('pendingRad', function () {
	return function (patients) {
		return patients.filter(function (patient) {
			var type = patient.requested_feedback.type;
			return 	type.any_radiology ||
					type.breast_mri ||
					type.mammogram ||
					type.other_radiology ||
					type.ultrasound;
		});
	};
});

// Is something a pending path case?
// Note: chain this after 'pending' to make sure it's pending.
app.filter('pendingPath', function () {
	return function (patients) {
		return patients.filter(function (patient) {
			return patient.requested_feedback.type.pathology;
		});
	};
});

/***********************

Directives

Mostly just that one right click one.

***********************/

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


/***********************

Controllers

Because they're cool and generally a good time.

***********************/

// Main controller
app.controller('RadPathController', function($scope) {
	this.patients = data.patients; 			// List of patients
	this.radiologists = data.radiologists;	// List of radiologists
	this.pathologists = data.pathologists;	// List of Pathologists

	$scope.detailCase = {};					// Currently active detailed case
	$scope.detail = false;					// Detail mode toggle

	this.getRadiologist = function(id) {
		var r = findObj('id', id, this.radiologists);
		return r.first_name + ' ' + r.last_name;
	};

	this.getPathologist = function(id) {
		var p = findObj('id', id, this.pathologists);
		return p.first_name + ' ' + p.last_name;
	};

	this.toggleStar = function(id) {
		var p = findObj('id', id, this.patients);
		p.star = !p.star;
	};

	this.showContextMenu = function($event, id) {
		$('#worklist table tr').removeClass('context-open');
		console.log('right click on ' + id);
		$('.context-menu')
			.fadeOut(100, function() {
				$('.context-menu.menu-' + id)
				.css({'top': $event.clientY, 'left': $event.clientX })
				.show();
			});
		$('#patient_'+id).addClass('context-open');
	};

	$scope.hideContextMenues = function() {
		$('#worklist table tr').removeClass('context-open');
		$('.context-menu').fadeOut(100);
	};

	$scope.showCaseDetail = function(patient) {
		$scope.detailCase = patient;
		$scope.detail = true;
	};

	$scope.hideCaseDetail = function() {
		$scope.detail = false;
	};
});

app.controller('RequestFeedbackController', function($scope) {
	$scope.feedbackRequest = {};

	$scope.requestFeedback = function(patient) {
		this.hideContextMenues();
		var newRequest = $scope.feedbackRequest;
		console.log('newRequest', newRequest);
		newRequest.is_fulfilled = false;
		newRequest.date = new Date();
		patient.requested_feedback = newRequest;
		console.log("new patient", patient);
	};
});

// $('.addNotes').click(function(){addNotes()});

})();

function addNotes(id){
	$("#notes-"+id + " textarea").css('display', 'inline-block');
	$("#notes-"+id).css('height', '100');
	$("#notes-"+id + " textarea").focus();
}
