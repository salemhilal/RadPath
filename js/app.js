(function(){

var SECONDS_BEFORE_FEEDBACK = 20;
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
	$scope.detailForm = false;				// Display or hide the detail form

	var that = this;						// Def not the angular way

	// Given an ID, gets a radiologist.
	this.getRadiologist = function(id) {
		var r = findObj('id', id, this.radiologists);
		return r.first_name + ' ' + r.last_name;
	};

	// Given an ID, gets a pathologist.
	this.getPathologist = function(id) {
		var p = findObj('id', id, this.pathologists);
		return p.first_name + ' ' + p.last_name;
	};

	// Toggles a star given a patient's ID.
	this.toggleStar = function(id) {
		var p = findObj('id', id, this.patients);
		p.star = !p.star;
	};

	// Shows a context menu for a worklist case.
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

	// Hides any visable context menus (hopefully just one).
	$scope.hideContextMenues = function() {
		$('#worklist table tr').removeClass('context-open');
		$('.context-menu').fadeOut(100);
	};

	// Shows a followup case in detail
	$scope.showCaseDetail = function(patient) {
		$scope.detailCase = patient;
		patient.seen = true;
		$scope.detail = true;
	};

	// Exits the detail view. Isn't Angular just swell? Why is this a function.
	$scope.hideCaseDetail = function() {
		$scope.detail = false;
	};

	$scope.doctorDisplay = function(report) {
		if(report.radiologist_id) {
			return "Radiologist: Dr. " + that.getRadiologist(report.radiologist_id);
		} else if (report.pathologist_id) {
			return "Radiologist: Dr. " + that.getPathologist(report.pathologist_id);
		}
	};

	$scope.last = function(arr) {
		return arr[arr.length - 1];
	}

	$scope.findObjs = findObjs;
	$scope.findObj = findObj;

	// Forgive me Lord, I know not what I'm doing.
	var checkForStella = setInterval(function() {
		var potentiallyStella = that.patients.filter(function (patient) {
			return 	patient.first_name == "Stella" &&
					patient.requested_feedback &&
					patient.requested_feedback.is_fulfilled === false;
		});

		// Is Stella awaiting feedback?
		if (potentiallyStella.length === 1) {
			clearInterval(checkForStella);
			setTimeout(function() {
				$scope.$apply(function() {
					var stella = potentiallyStella[0];
					var newCase = {
						id: 21325232,
						type: 'path',
						date: '1/7/2014',
						diagnosis: 'Infiltrating Ductal Carcinoma',
						fd_cui: 'C1134719',
						location: 'Right Breast',
						procedure: 'Biopsy',
						findings: 'Moderately differentiated | Nottingham Score 6/9',
						classification: 'Malignant',
						pathologist_id: 1
					};

					stella.requested_feedback.is_fulfilled = true;
					stella.seen = false;
					stella.feedback.push(newCase);
					stella.reports.push(newCase);
					console.log("comin atchu");
				});

			}, SECONDS_BEFORE_FEEDBACK * 1000);
		}
	}, 1000);
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
		displayMessage("Feedback Requested Successfully");
	};
});

// $('.addNotes').click(function(){addNotes()});

})();

function addNotes(id){
	$("#notes-"+id + " textarea").css('display', 'inline-block');
	$("#notes-"+id).css('height', '100');
	$("#notes-"+id + " textarea").focus();
}
