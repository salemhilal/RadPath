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

// Is something a pending feedback case?
app.filter('pending', function () {
	return function (patients) {
		return patients.filter(function (patient) {
			console.log('is this patient good to go', patient.id, patient.requested_feedback && !patient.requested_feedback.is_fulfilled);
			return patient.requested_feedback &&
					patient.requested_feedback.is_fulfilled === false;
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
	this.patients = data.patients;
	this.radiologists = data.radiologists;
	this.pathologists = data.pathologists;
	this.caseTypes = data.caseTypes;

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

function addNotes(){
	console.log("this: ", $(this));
	$($(this).siblings()[0]).css('display', 'inline-block');
	$(this).parent().css('height', '100');
	$($(this).siblings()[0]).focus();
}
