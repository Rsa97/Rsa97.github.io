/**
 * @author Rsa
 */

function isPrime(m, n) {
	if (m <= 1 || n <= 1 || m == n)
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
	return days+'.'+hours+':'+mins+":"+secs;
}

function calcRecomendation() {
	var orbAltitude = $("input[name='orbit']:checked").siblings(".orbParam").data("alt");
	var orbPeriod = $("input[name='orbit']:checked").siblings(".orbParam").data("time");
	var idx = $("#cBodies").data("idx");
	var numSats = parseInt("0"+$("#satCount").val(), 10);
	var radius = celestialBodies[idx].radius;
	if (idx == -1 || orbAltitude <= 0 || numSats <= 0) {
		$(".result span").html("");
		return;
	}
	// Склонение орбиты, при котором спутник визуально проходит перпендикулярно экватору
	$("#polarInc").html(orbPeriod > celestialBodies[idx].sideral ? "невозможно" : formatFloat(Math.acos(orbPeriod/celestialBodies[idx].sideral)*180/Math.PI, 2)+" °");
	var maxRange = 0;
	antenns.forEach(function(antenn, idx) {
		if (antenn.avail == 1 && antenn.radius > maxRange)
			maxRange = antenn.radius;
	});
	var satAngle, satDist, waitOrbPe, waitOrbTime;
	var i;
	if (numSats == 1) {
		satAngle = 0;
		satDist = 0;
		waitOrbPe = celestialBodies[idx].peak+1000;
		waitOrbTime = Math.sqrt(Math.pow((orbAltitude+waitOrbPe)/2+radius, 3)*4*Math.PI*Math.PI/celestialBodies[idx].gm);
	} else {
		satAngle = 2*Math.PI/numSats;
		satDist = ((radius+orbAltitude)*Math.sin(satAngle/2)*2);
		for (i = 2; i < 2*numSats; i++) {
			if (isPrime(i, numSats)) {
				waitOrbTime = orbPeriod/numSats*i;
				waitOrbPe =(Math.pow(waitOrbTime*waitOrbTime/4/Math.PI/Math.PI*celestialBodies[idx].gm, 1/3.)-radius)*2-orbAltitude;
				if (waitOrbPe > celestialBodies[idx].peak+1000)
					break;
			}			
		}
	}
	var linkAngleErr = 0;
	var linkDist = satDist;
	var maxAngle = Math.acos(radius/(radius+orbAltitude))*2;
	var angle = Math.PI;
	if (satDist < maxRange) {
		if (maxRange < radius+radius)
			angle = Math.asin(maxRange/2/(radius+orbAltitude))*2;
		if (angle < maxAngle)
			maxAngle = angle;
		linkAngleErr = (maxAngle-satAngle)/2;
		if (linkAngleErr < 0)
			linkAngleErr = 0;
		if (linkAngleErr >= satAngle/2)
			linkAngleErr = satAngle/2;
	}
	var gndAngle = satAngle;
	var gndAngleErr = 0;
	angle = Math.asin(radius/(radius+orbAltitude));
	if (maxRange*maxRange < (radius+orbAltitude)*(radius+orbAltitude)-radius*radius) {
		i = (radius+radius+orbAltitude+maxRange)/2;
		angle = Math.asin(Math.sqrt(i*(i-radius)*(i-radius-orbAltitude)*(i-maxRange))/(radius+orbAltitude)/maxRange);
	}
	var FOV = (radius+orbAltitude)*Math.sin(angle)/radius;
	if (FOV > 1)
		FOV = 1;
	var FOV = 2*(Math.asin(FOV)-angle);
	if (maxRange <= orbAltitude) {
		gndAngle = 0;
	} else {
		gndAngleErr = (FOV*numSats-Math.PI*2)/numSats/2;
		if (gndAngleErr < 0)
			gndAngleErr = 0;
	}
	if (linkAngleErr > gndAngleErr) 
		linkAngleErr = gndAngleErr;
	if (satDist <= maxRange && satAngle < maxAngle)
		$("#satRing").html("возможно").removeClass("error");
	else
		$("#satRing").html("невозможно").addClass("error");
	if (FOV*numSats > Math.PI*2) {
		$("#satGnd").html("непрерывное").removeClass("error");
		$("#gndFullFOV").html("±"+formatFloat(Math.acos(Math.cos(FOV/2)*Math.tan(satAngle/2))*180/Math.PI, 2)+" °");
	} else {
		$("#satGnd").html("фрагментарное").addClass("error");
		$("#gndFullFOV").html("нет");
	}
	$("#gndFOV").html(formatFloat(FOV*180/Math.PI, 2)+" °");
	$("#satAngle").html(formatFloat(satAngle*180/Math.PI, 2)+(linkAngleErr == 0 ? "" : ("±"+formatFloat(linkAngleErr*180/Math.PI,2)))+" °");
	$("#satDist").html(formatFloat(satDist, 3)+" м");
	$("#waitOrbPe").html(formatFloat(waitOrbPe, 3)+" м");
	$("#waitOrbTime").html(formatTime(waitOrbTime));
	$("#waitOrbTotalTime").html(formatTime(waitOrbTime*numSats));
}


function calcOrbitGroup() {
	var orbAltitude = $("input[name='orbit']:checked").siblings(".orbParam").data("alt");
	var orbPeriod = $("input[name='orbit']:checked").siblings(".orbParam").data("time");
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1 || orbAltitude <= 0) {
		$(".result span").html("");
		$("#minSatCount, #minGndCount").html("");
		return;
	}
	var radius = celestialBodies[idx].radius;
	var planetAngle = Math.asin(radius/(radius+orbAltitude));
	$("#planetAngle").html(formatFloat(planetAngle*360/Math.PI, 1)).data("angle", planetAngle);
	// Смотрим минимальное количество спутников по видимости над горизонтом
	var minSats = Math.ceil(Math.PI*2/(Math.PI-planetAngle*2));
	// Находим максимальную дальность имеющихся антенн
	var maxRange = 0;
	antenns.forEach(function(antenn, idx) {
		if (antenn.avail == 1 && antenn.radius > maxRange)
			maxRange = antenn.radius;
	});
	// Рассчитывем количество спутников для организации кольца
	var n = 0;
	if (maxRange == 0) {
		$("#minSatCount").html("∞");
		$("#minGndCount").html("∞");
	} else {
		if (maxRange <= 2*(radius+orbAltitude)) {
			n = Math.ceil(Math.PI/Math.asin(maxRange/2/(radius+orbAltitude)));
			if (n > minSats)
				minSats = n;
		}
		$("#minSatCount").html(minSats);
		// Рассчитывем количество спутников для покрытия поверхности
		if (maxRange <= orbAltitude)
			$("#minGndCount").html("∞");
		else {
			var angle = planetAngle;
			if (maxRange*maxRange < (radius+orbAltitude)*(radius+orbAltitude)-radius*radius) {
				n = (radius+radius+orbAltitude+maxRange)/2;
				angle = Math.asin(Math.sqrt(n*(n-radius)*(n-radius-orbAltitude)*(n-maxRange))/(radius+orbAltitude)/maxRange);
			}
			FOV = 2*(Math.asin((radius+orbAltitude)*Math.sin(angle)/radius)-angle);
			n = Math.ceil(Math.PI*2/FOV);
			if (n > minSats)
				minSats = n;
			$("#minGndCount").html(minSats);
		}
	}
	calcRecomendation();
}

function calcSyncOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var period = celestialBodies[idx].sideral;
	var syncAltitude = Math.pow(period*period/4/Math.PI/Math.PI*celestialBodies[idx].gm, 1/3.)-celestialBodies[idx].radius;
	$("#syncOrbit").removeClass("empty").removeClass("error").data("alt", 0);
	if (syncAltitude < 0)
		$("#syncOrbit").html("Ниже поверхности").addClass("error");
	else if (syncAltitude < celestialBodies[idx].peak)
		$("#syncOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx].soi > 0 && syncAltitude > celestialBodies[idx].soi)
		$("#syncOrbit").html("За пределами сферы влияния").addClass("error");
	else 
		$("#syncOrbit").html("Высота "+formatFloat(syncAltitude, 3)+" м, период "+formatTime(period)).data("alt", syncAltitude).data("time", period);
	if ($("#orb0").prop("checked"))
		calcOrbitGroup();
}

function calcResonantOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var resFrom = parseInt("0"+$("#resFrom").val().trim(), 10);
	var resTo = parseInt("0"+$("#resTo").val().trim(), 10);
	$("#resonOrbit").removeClass("empty").removeClass("error").data("alt", 0);
	if (resFrom <= 0 || resTo <= 0) {
		$("#resonOrbit").html("Ошибка в параметрах").addClass("error");
		return;
	}
	var period = celestialBodies[idx].sideral*resFrom/resTo;
	var resAltitude = Math.pow(period*period/4/Math.PI/Math.PI*celestialBodies[idx].gm, 1/3.)-celestialBodies[idx].radius;
	if (resAltitude < 0)
		$("#resonOrbit").html("Ниже поверхности").addClass("error");
	else if (resAltitude < celestialBodies[idx].peak)
		$("#resonOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx].soi > 0 && resAltitude > celestialBodies[idx].soi)
		$("#resonOrbit").html("За пределами сферы влияния").addClass("error");
	else 
		$("#resonOrbit").html("Высота "+formatFloat(resAltitude, 3)+" м, период "+formatTime(period)).data("alt", resAltitude).data("time", period);
	if ($("#orb1").prop("checked"))
		calcOrbitGroup();
}

function calcFreeAltOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var freeAltitude = parseFloat("0"+$("#freeAlt").val().trim());
	$("#freeAltOrbit").removeClass("empty").removeClass("error").data("alt", 0);
	if (freeAltitude <= 0)
		$("#freeAltOrbit").html("Ошибка в параметрах").addClass("error");
	else if (freeAltitude < celestialBodies[idx].peak)
		$("#freeAltOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx].soi > 0 && freeAltitude > celestialBodies[idx].soi)
		$("#freeAltOrbit").html("За пределами сферы влияния").addClass("error");
	else {
		var period = Math.sqrt(Math.pow(freeAltitude+celestialBodies[idx].radius, 3)*4*Math.PI*Math.PI/celestialBodies[idx].gm); 
		$("#freeAltOrbit").html("Высота "+formatFloat(freeAltitude, 3)+" м, период "+formatTime(period)).data("alt", freeAltitude).data("time", period);
	}
	if ($("#orb2").prop("checked"))
		calcOrbitGroup();
}

function calcFreeTimeOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var period = parseFloat("0"+$("#freeTime").val().trim());
	if (period <= 0)
		$("#freeTimeOrbit").html("Ошибка в параметрах").addClass("error");
	var freeTimeAltitude = Math.pow(period*period/4/Math.PI/Math.PI*celestialBodies[idx].gm, 1/3.)-celestialBodies[idx].radius;
	$("#freeTimeOrbit").removeClass("empty").removeClass("error").data("alt", 0);
	console.log(freeTimeAltitude);
	if (freeTimeAltitude <= 0)
		$("#freeTimeOrbit").html("Ниже поверхности").addClass("error");
	else if (freeTimeAltitude < celestialBodies[idx].peak)
		$("#freeTimeOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx].soi > 0 && freeTimeAltitude > celestialBodies[idx].soi)
		$("#freeTimeOrbit").html("За пределами сферы влияния").addClass("error");
	else 
		$("#freeTimeOrbit").html("Высота "+formatFloat(freeTimeAltitude, 3)+" м, период "+formatTime(period)).data("alt", freeTimeAltitude).data("time", period);
	if ($("#orb3").prop("checked"))
		calcOrbitGroup();
}

$(function() {
	celestialBodies.forEach(function(body, idx) {
		$("#cBodies").append('<li data-idx="'+idx+'" class="'+(body.parent == -1 ? 'sun' : (body.parent == 0 ? 'planet' : 'moon'))+'">'+
								'<a href="#">'+body.name+'</a>');
	});
	
	antenns.forEach(function(antenn, idx) {
		$("#antenns").append('<tr data-idx="'+idx+'" class="mod'+antenn.mod+'"><td><a class="btn btn-sm '+
				     (0 == antenn.avail ? 'unavail btn-danger' : 'btn-success')+
				     '" href="#">&nbsp;&nbsp;&nbsp;</a><td>'+
				     antenn.name+'<td>'+formatFloat(antenn.radius, 1)+'<td>'+
				     (antenn.angle == 360 ? 'Всенаправленная' : antenn.angle));
	});

	mods.forEach(function(mod) {
		var avail = ('RT2' == mod.code) || ('true' == localStorage.getItem('mod'+mod.code));
		$("#mods").append('<li data-mod="'+mod.code+'"><a href="#" class="btn btn-sm'+
				  (avail ? 'btn-success' : 'btn-danger')+
				  '">&nbsp;&nbsp;&nbsp;</a>&nbsp;&nbsp;'+mod.name);
		if (avail)
			$('.mod'+mod.code).show();
		else
			$('.mod'+mod.code).hide().children('a').removeClass('btn-success').addClass('unavail btn-danger');
	});
	
	$('#mods').on("click", "a", function() {
		var mod = $(this).parent('li').data('mod');
		if ('RT2' == mod)
			return;
		if ($(this).hasClass('btn-danger')) {
			$(this).removeClass('btn-danger').addClass('btn-success');
			$('.mod'+mod).show();
			localStorage.setItem('mod'+mod, true);
		} else {
			$(this).removeClass('btn-success').addClass('btn-danger');
			$('.mod'+mod).hide().children('a').removeClass('btn-success').addClass('unavail btn-danger');
			localStorage.setItem('mod'+mod, false);
		}
		calcOrbitGroup();
	});

	$("#cBodies").on("click", "li", function(e) {
		e.preventDefault();
		var idx = $(this).data("idx");
		$("#cBodies").data("idx", idx);
		$("#cBody>button").html(celestialBodies[idx].name+' <span class="caret"></span>');
		$("#cbRadius").html(formatFloat(celestialBodies[idx].radius, 3));
		var mass = celestialBodies[idx].mass;
		massExp = Math.floor(Math.log10(mass));
		mass = ''+(mass/Math.pow(10, massExp));
		$("#cbMass").html(Math.floor(mass*10000000)/10000000+'×10<sup>'+massExp+'</sup>');
		var period = celestialBodies[idx].sideral;
		$("#cbSideral").html(formatFloat(period, 3)+' с ('+formatTime(period)+')');
		var soi = celestialBodies[idx].soi;
		$("#cbSOI").html(soi == -1 ? '∞' : formatFloat(soi, 1));
		calcSyncOrbit();
		calcResonantOrbit();
		calcFreeAltOrbit();
		calcFreeTimeOrbit();
	});
	
	$("#antenns").on("click", ".btn", function(e) {
		e.preventDefault();
		var row = $(this).parents("tr");
		if (row.hasClass("unavail")) {
			row.removeClass("unavail");
			antenns[row.data("idx")].avail = 1;
			$(this).removeClass("btn-danger").addClass("btn-success");
		} else {
			row.addClass("unavail");
			antenns[row.data("idx")].avail = 0;
			$(this).removeClass("btn-success").addClass("btn-danger");
		}
		calcOrbitGroup();
	});
	
	$("body").on("click", ".my-show", function(e) {
		e.preventDefault();
		$($(this).data("element")).removeClass("hide");
		$(this).removeClass("my-show").addClass("my-hide");
		$(this).html("▲");
	});

	$("body").on("click", ".my-hide", function(e) {
		e.preventDefault();
		$($(this).data("element")).addClass("hide");
		$(this).removeClass("my-hide").addClass("my-show");
		$(this).html("▼");
	});
	
	$("input[name='orbit']").change(function() {
		calcOrbitGroup();
	});
	
	$("#resFrom, #resTo").on("keyup", function() { calcResonantOrbit(); });
	$("#resFrom, #resTo").on("cut", function() { calcResonantOrbit(); });
	$("#resFrom, #resTo").on("paste", function() { calcResonantOrbit(); });
	$("#resFrom, #resTo").on("change", function() { calcResonantOrbit(); });
	
	$("#freeAlt").on("keyup", function() { calcFreeAltOrbit(); });
	$("#freeAlt").on("cut", function() { calcFreeAltOrbit(); });
	$("#freeAlt").on("paste", function() { calcFreeAltOrbit(); });
	$("#freeAlt").on("change", function() { calcFreeAltOrbit(); });

	$("#freeTime").on("keyup", function() { calcFreeTimeOrbit(); });
	$("#fretTime").on("cut", function() { calcFreeTimeOrbit(); });
	$("#freeTime").on("paste", function() { calcFreeTimeOrbit(); });
	$("#freeTime").on("change", function() { calcFreeTimeOrbit(); });

	$("#satCount").on("keyup", function() { calcRecomendation(); });
	$("#satCount").on("cut", function() { calcRecomendation(); });
	$("#satCount").on("paste", function() { calcRecomendation(); });
	$("#satCount").on("change", function() { calcRecomendation(); });

});
