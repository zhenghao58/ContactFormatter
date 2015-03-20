'use strict';
String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

//the main program
function process(data) {
	// body...
	var group=[],
	re=	/^\(?(\d{3})\)?[\s-](\d{3})[\s-](\d{4})$/;

	//normalizing function
	function normalize (fname, lname, phone, zip, color) {
		phone = phone.replace(re, '($1) $2-$3');
		var result=fname+' '+lname+'\n';
		result+='Phone Number: '+phone+'\n';
		result+='Zip Code: ' + zip +'\n';
		result+='Color: '+ color.capitalizeFirstLetter()+'\n';
		return result;
	}


	//the normalization loop
	for(var i=0; i<data.length; i++){

		//separate each entry into an array
		var tuple=data[i].split(', ');
		//strip the invalid input
		if(tuple.length<4||tuple.length>5) continue;

		//the first format
		if(tuple[2].match(/^\(\d{3}\)[\s-]\d{3}[\s-]\d{4}$/)
			&&tuple[4].length===5){
			var result=normalize(tuple[1], tuple[0], tuple[2], tuple[4], tuple[3]);
			group.push(result);
			continue;
		}

		//the second format
		if (tuple.length===4
			&&tuple[0].match(/\s/)
			&&tuple[2].length===5
			&&tuple[3].match(/^\d{3}[\s-]\d{3}[\s-]\d{4}$/)) {
			var fname=tuple[0].split(' ')[0];
			var lname=tuple[0].split(' ')[1]
			var result=normalize(fname, lname, tuple[3], tuple[2], tuple[1]);
			group.push(result);
			continue;
		}

		//the third format
		if (tuple[2].length===5&&tuple[3].match(/^\d{3}[\s-]\d{3}[\s-]\d{4}$/)) {
			var result=normalize(tuple[0], tuple[1], tuple[3], tuple[2], tuple[4]);
			group.push(result);
			continue;
		}
	}
	group.sort();
	return group;
}







