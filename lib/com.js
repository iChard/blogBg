var db = require('../conf/db');


let sendJson = (res, data, statusObj,statusCode = 200) => {
	let j = statusObj ? statusObj : {
		result: 100,
		message: 'success'
	};
	if(data) {
		j = Object.assign({}, j, {data: data});
	}
	res.status(statusCode).send(j);

}

let toHump = (str) => {
	let rgp = /\_(\w)/g;
	str = str.replace(rgp, function(all, letter) {
		return letter.toUpperCase();
	})
	return str;
}

let toUnderLine = (str) => {
	let rgp = /([A-Z])/g;
	str = str.replace(rgp, function(all, letter) {
		return '_' + letter.toLowerCase()
	})
	return str;
}

let objectKeyToHump = (obj = {}) => {
	let o = {};
	for(let key in obj) {
		o[toHump(key)] = obj[key]
	}
	return o;
}

let objectKeyToUnderline = (obj = {}) => {
	let o = {};
	for(let key in obj) {
		o[toUnderLine(key)] = obj[key]
	}
	return o;
}

module.exports = {
	sendJson,
	toHump,
	toUnderLine,
	objectKeyToHump,
	objectKeyToUnderline
}