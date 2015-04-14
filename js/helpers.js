function findObj(attr, value, array) {
	// Find object by attribute value in array
	// Example: var myArray = [{id: 2, color: 'red'}, {id: 3, color: 'orange'}];
	// 			var findObj('id', 2, myArray) => {id:2, color: 'red'}
	var result = array.filter(function(obj) {
	  return obj[attr] == value;
	});
	if (result.length === 1) {
		return result[0];
	}
	else if (result.length === 0) {
		return false;
	}
	else {
		return false;
	}
}

function findObjs(attr, value, array) {
	console.log('this is array', array, attr, value);
	// Find multiple objects by attribute value in array
	var result = array.filter(function(obj) {
	  return obj[attr] == value;
	});
	if (result.length > 0) {
		return result;
	}
	else {
		return false;
	}
}
