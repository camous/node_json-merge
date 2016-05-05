// JSON Konstruktor für die Überprüfung ob ein Objekt JSON ist
var jsonC = {}.constructor ;

var isJSON = function(json){
	if(json.constructor === jsonC){
		return true ;
	}else{
		return false ;
	}
}

exports.isJSON = isJSON ;


var mergeJSON(json1, json2){
	var result = null ;
	if(isJSON(json2)){
		result = {} ;
		if(isJSON(json1)){
			for(var key in json1){
				result[key] = json1[key] ;
			}
		}

		for(var key in json2){
			if(typeof result[key] === "object" && typeof json2 === "object"){
				result[key] = mergeJSON(result[key], json2[key]) ;
			}else{
				result[key] = json2[key] ;
			}
		}
	}else if(Array.isArray(json1) && Array.isArray(json2)){
		result = json1 ;

		for(var i = 0; i < json2.length; i++){
			if(result.indexOf(json2[i]) === -1){
				result[result.length] = json2[i] ;
			}
		}
	}else{
		result = json2 ;
	}

	return result ;
}

exports.merge = mergeJSON ;