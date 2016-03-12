/**
 * @author Rsa
 */

function isPrime(m, n) {
	if (m < 1 || n < 1 || m == n)
		return false;
	while (true) {
		if (m == 0 || n == 0)
			return (m == 1 || n == 1);
		if (m == 1 || n == 1)
			return true;
		if (m == n)
			return false;
		if ((m&1) == 0 && (n&1) == 0)
			return false;
		else if ((m&1) == 0)
			m >>= 1;
		else if ((n&1) == 0)
			n >>= 1;
		else if (n > m)
			n = (n-m)>>1;
		else
			m = (m-n)>>1;
	}
}

function formatFloat(val, frac) {
	val = Math.round(val*Math.pow(10, frac))/Math.pow(10, frac);
	var i = Math.floor(val);
	var res = ('00'+(i%1000)).substr(-3,3);
	if (i < 1000)
		res = i;
	while ((i = Math.floor(i/1000)) > 0) {
		res = (i < 1000 ? i : ('00'+(i%1000)).substr(-3,3))+' '+res;
	}
	if ((val = val-Math.floor(val)) != 0) 
		res += (''+(Math.round(val*Math.pow(10, frac))/Math.pow(10, frac))).substr(1);
	return res; 
}

function formatTime(period) {
	period = Math.round(period*10)/10;
	var days = Math.floor(period/21600);
	var hours = Math.floor((period-days*21600)/3600);
	var mins = Math.floor((period-days*21600-hours*3600)/60);
	if (mins < 10)
		mins = '0'+mins;
	var secs = Math.floor((period-days*21600-hours*3600-mins*60)*10)/10;
	if (secs < 10)
		secs = '0'+secs;
	return (days == 0 ? '' : days+'d ')+hours+':'+mins+":"+secs;
}

function calcOrbits() {
	var minOver = 0.1;
	var limitFOV = 2;
	var maxInclin = 90/180/Math.PI;
	var maxDays = 100;
	var Alt, incPeriod, incAlt;
	var minScanAlt = 0, maxScanAlt = 100000000;
	var minResonance, maxResonance;
	var bodyTurns, satTurns;
	var minSatTurns = Math.ceil(360/totalMaxFOV*(minOver+1));
	var maxSatTurns = Math.ceil(360/totalMinFOV*(minOver+1));
	var bestResBody, bestResSat, minTime = 1000*6*60*60;
	var minFOV, k;
	var orbPeriod, orbAlt;
	var done;
	scanners.forEach(function(scanner, idx) {
		if (scanner[scanAvail] == 0)
			return;
		if (minScanAlt < scanner[scanMinAlt])
			minScanAlt = scanner[scanMinAlt];
		if (maxScanAlt > scanner[scanMaxAlt])
			maxScanAlt = scanner[scanMaxAlt];
	});
	$('#celestial tbody').html("");
	celestialBodies.forEach(function(body, bodyIdx) {
		if (bodyIdx == 0) // Skip the Sun
			return;
		minAlt = minScanAlt;
		if (minAlt < body[cbPeak]+1000)
			minAlt = body[cbPeak]+1000;
		maxAlt = maxScanAlt;
		if (maxAlt > body[cbSOI])
			maxAlt = body[cbSOI];
		incPeriod = Math.cos(maxInclin)*body[cbSideral];
		incAlt = Math.pow(incPeriod*incPeriod/4/Math.PI/Math.PI*body[cbGM], 1/3.)-body[cbRadius];
		if (maxAlt > incAlt)
			maxAlt = incAlt;
		minResonance = body[cbSideral]/(Math.sqrt(Math.pow(minAlt+body[cbRadius], 3)/body[cbGM])*2*Math.PI);
		maxResonance = body[cbSideral]/(Math.sqrt(Math.pow(maxAlt+body[cbRadius], 3)/body[cbGM])*2*Math.PI);
		console.log(body[cbName]+" : "+minAlt+" ("+Math.sqrt(Math.pow(minAlt+body[cbRadius], 3)/body[cbGM])*2*Math.PI+") : "+
									   maxAlt+" ("+Math.sqrt(Math.pow(maxAlt+body[cbRadius], 3)/body[cbGM])*2*Math.PI+") : "+minResonance+" : "+maxResonance);
		minTime = -1;
		for (done = false, bodyTurns = 1; !done && bodyTurns <= maxDays; bodyTurns += 2) {
			satTurns = Math.ceil(bodyTurns*maxResonance);
			if (satTurns < minSatTurns)
				satTurns = minSatTurns;
			var maxSatTurns = Math.floor(bodyTurns*minResonance);
			if (maxSatTurns > maxSatTurns*bodyTurns)
				maxSatTurns = maxSatTurns*bodyTurns;
			if ((satTurns&1) == 0)
				satTurns++;
//			console.log(bodyTurns+": "+satTurns+" -> "+maxSatTurns);
			for (; !done && satTurns <= maxSatTurns; satTurns += 2)
				if (isPrime(bodyTurns, satTurns)) {
					orbPeriod = body[cbSideral]*bodyTurns/satTurns;
					orbAlt = Math.pow(orbPeriod*orbPeriod/4/Math.PI/Math.PI*body[cbGM], 1/3.)-body[cbRadius];
					if (orbAlt >= minAlt && orbAlt <= maxAlt) {
						minFOV = totalMaxFOV;
						scanners.forEach(function(scanner, scanIdx) {
							if (scanner[scanAvail] == 0)
								return;
							var fov = getFOVbyAlt(bodyIdx, scanIdx, orbAlt);
							if (minFOV > fov)
								minFOV = fov;
						});
						k = 3-(bodyTurns&1)-(satTurns&1);
						if (minFOV >= limitFOV && minFOV*satTurns*k >= 360*(1+minOver)) {
							inclinance = Math.acos(orbPeriod/body[cbSideral])/Math.PI*180;
//							console.log(bodyTurns+"/"+satTurns+" : "+orbAlt+" : "+orbPeriod+" : "+minFOV+" : "+(minFOV*satTurns*k)/360+" : "+formatTime(orbPeriod*satTurns));
							var abbr = '';
							scanners.forEach(function(scanner, scanIdx) {
								if (scanner[scanAvail] == 1) {
									var fovtxt = getFOVbyAlt(bodyIdx, scanIdx, orbAlt);
									abbr += scanner[scanName]+' : '+formatFloat(fovtxt, 1)+"\n";
								}
							});
							$('#celestial tbody').append('<tr><td><abbr title="'+abbr+'">'+body[cbName]+'</abbr><td>'+
											bodyTurns+'/'+satTurns+'<td>'+formatFloat(orbAlt, 3)+'<td>'+
											formatFloat(inclinance, 1)+'<td>'+formatTime(orbPeriod)+'<td>'+
											formatTime(orbPeriod*satTurns));
							done = true;
							break;
						}
					}
				}
		}
	}); 
}

$(function() {
	scanners.forEach(function(scanner, idx) {
		$("#scanners").append('<tr data-idx="'+idx+'"'+(scanner[scanAvail] == 1 ? '' : ' class="unavail"')+'><td><a class="btn btn-xs '+
							(scanner[scanAvail] == 1 ? 'btn-success' : 'btn-danger')+
							 '" data-toggle="dropdown" href="#">&nbsp;&nbsp;&nbsp;</a><td>'+scanner[scanName]+'<td>'+formatFloat(scanner[scanMinAlt], 1)+
							 '<td>'+scanner[scanBestAlt]+'<td>'+scanner[scanMaxAlt]+'<td>'+scanner[scanFOV]);
	});
	
	calcOrbits();
	
	$("#scanners").on("click", ".btn", function() {
		var row = $(this).parents("tr");
		if (row.hasClass("unavail")) {
			row.removeClass("unavail");
			scanners[row.data("idx")][scanAvail] = 1;
			$(this).removeClass("btn-danger").addClass("btn-success");
		} else {
			row.addClass("unavail");
			scanners[row.data("idx")][scanAvail] = 0;
			$(this).removeClass("btn-success").addClass("btn-danger");
		}
		setInterval(calcOrbits(), 100);
	});
	

});
