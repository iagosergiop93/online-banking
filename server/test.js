let fun = (a,b) => {
	console.log(a + "  " + b);
}

fun.apply(null,["a","z"]);

let readArg = (f) => {
	let fstr = f.toString();
	console.log(fstr);
	let args = fstr.substring(fstr.indexOf('(')+1, fstr.indexOf(')')).split(',')

	return args;
}

console.log(readArg(fun));
