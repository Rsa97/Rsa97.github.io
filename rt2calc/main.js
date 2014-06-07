/**
 * @author Rsa
 */

function formatFloat(val, frac) {
	val = Math.round(val*Math.pow(10, frac))/Math.pow(10, frac);
	var i = Math.floor(val);
	var res = ('00'+(i%1000)).substr(-3,3);
	if (i < 1000)
		res = i;
	while ((i = Math.floor(i/1000)) > 0) {
		res = (i < 1000 ? i : ('00'+(i%1000)).substr(-3,3))+' '+res;
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

function calcSyncOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var period = celestialBodies[idx][cbSideral];
	var syncAltitude = Math.pow(period*period/4/Math.PI/Math.PI*celestialBodies[idx][cbGM], 1/3.)-celestialBodies[idx][cbRadius];
	$("#syncOrbit").removeClass("empty").removeClass("error").data("alt", 0);
	if (syncAltitude < 0)
		$("#syncOrbit").html("Ниже поверхности").addClass("error");
	else if (syncAltitude < celestialBodies[idx][cbPeak])
		$("#syncOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx][cbSOI] > 0 && syncAltitude > celestialBodies[idx][cbSOI])
		$("#syncOrbit").html("За пределами сферы влияния").addClass("error");
	else 
		$("#syncOrbit").html("Высота "+formatFloat(syncAltitude, 3)+" м, период "+formatTime(period));
}

function calcResonantOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var resFrom = parseInt("0"+$("#resFrom").val().trim(), 10);
	var resTo = parseInt("0"+$("#resTo").val().trim(), 10);
	$("#resonOrbit").removeClass("empty").removeClass("error");
	if (resFrom <= 0 || resTo <= 0) {
		$("#resonOrbit").html("Ошибка в параметрах").addClass("error");
		return;
	}
	var period = celestialBodies[idx][cbSideral]*resFrom/resTo;
	var resAltitude = Math.pow(period*period/4/Math.PI/Math.PI*celestialBodies[idx][cbGM], 1/3.)-celestialBodies[idx][cbRadius];
	if (resAltitude < 0)
		$("#resonOrbit").html("Ниже поверхности").addClass("error");
	else if (resAltitude < celestialBodies[idx][cbPeak])
		$("#resonOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx][cbSOI] > 0 && resAltitude > celestialBodies[idx][cbSOI])
		$("#resonOrbit").html("За пределами сферы влияния").addClass("error");
	else 
		$("#resonOrbit").html("Высота "+formatFloat(resAltitude, 3)+" м, период "+formatTime(period));
}

function calcFreeAltOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var freeAltitude = parseFloat("0"+$("#freeAlt").val().trim());
	$("#freeAltOrbit").removeClass("empty").removeClass("error");
	if (freeAltitude <= 0)
		$("#freeAltOrbit").html("Ошибка в параметрах").addClass("error");
	else if (freeAltitude < celestialBodies[idx][cbPeak])
		$("#freeAltOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx][cbSOI] > 0 && freeAltitude > celestialBodies[idx][cbSOI])
		$("#freeAltOrbit").html("За пределами сферы влияния").addClass("error");
	else {
		var period = Math.sqrt(Math.pow(freeAltitude+celestialBodies[idx][cbRadius], 3)*4*Math.PI*Math.PI/celestialBodies[idx][cbGM]); 
		$("#freeAltOrbit").html("Высота "+formatFloat(freeAltitude, 3)+" м, период "+formatTime(period));
	}
}

function calcFreeTimeOrbit() {
	var idx = $("#cBodies").data("idx"); 
	if (idx == -1)
		return;
	var period = parseFloat("0"+$("#freeTime").val().trim());
	var freeTimeAltitude = Math.pow(period*period/4/Math.PI/Math.PI*celestialBodies[idx][cbGM], 1/3.)-celestialBodies[idx][cbRadius];
	$("#freeTimeOrbit").removeClass("empty").removeClass("error").data("alt", 0);
	if (freeTimeAltitude <= 0)
		$("#freeTimeOrbit").html("Ошибка в параметрах").addClass("error");
	else if (freeTimeAltitude < celestialBodies[idx][cbPeak])
		$("#freeTimeOrbit").html("Ниже безопасного уровня").addClass("error");
	else if (celestialBodies[idx][cbSOI] > 0 && freeTimeAltitude > celestialBodies[idx][cbSOI])
		$("#freeTimeOrbit").html("За пределами сферы влияния").addClass("error");
	else 
		$("#freeTimeOrbit").html("Высота "+formatFloat(freeTimeAltitude, 3)+" м, период "+formatTime(period));
}

$(function() {
	celestialBodies.forEach(function(body, idx) {
		$("#cBodies").append('<li data-idx="'+idx+'" class="'+(body[cbParent] == -1 ? 'sun' : (body[cbParent] == 0 ? 'planet' : 'moon'))+'">'+
								'<a href="#">'+body[cbName]+'</a>');
	});
	antenns.forEach(function(antenn, idx) {
		$("#antenns").append('<tr data-idx="'+idx+'"><td><a class="btn btn-xs btn-success" data-toggle="dropdown" href="#">&nbsp;&nbsp;&nbsp;</a><td>'+antenn[antName]+'<td>'+formatFloat(antenn[antRadius], 1)+
							 '<td>'+(antenn[antAngle] == 360 ? 'Всенаправленная' : antenn[antAngle]));
	});
	
	$("#cBodies").on("click", "li", function() {
		var idx = $(this).data("idx");
		$("#cBodies").data("idx", idx);
		$("#cBody>button").html(celestialBodies[idx][cbName]+' <span class="caret"></span>');
		$("#cbRadius").html(formatFloat(celestialBodies[idx][cbRadius], 3));
		var mass = celestialBodies[idx][cbMass];
		massExp = Math.floor(Math.log10(mass));
		mass = ''+(mass/Math.pow(10, massExp));
		$("#cbMass").html(Math.floor(mass*10000000)/10000000+'×10<sup>'+massExp+'</sup>');
		var period = celestialBodies[idx][cbSideral];
		$("#cbSideral").html(formatFloat(period, 3)+' с ('+formatTime(period)+')');
		var soi = celestialBodies[idx][cbSOI];
		$("#cbSOI").html(soi == -1 ? '∞' : formatFloat(soi, 1));
		calcSyncOrbit();
		calcResonantOrbit();
		calcFreeAltOrbit();
		calcFreeTimeOrbit();
	});
	
	$("#antenns").on("click", ".btn", function() {
		var row = $(this).parents("tr");
		if (row.hasClass("unavail")) {
			row.removeClass("unavail");
			$(this).removeClass("btn-danger").addClass("btn-success");
		} else {
			row.addClass("unavail");
			$(this).removeClass("btn-success").addClass("btn-danger");
		}
			
	});
	
	$("body").on("click", ".my-show", function() {
		$($(this).data("element")).removeClass("hide");
		$(this).removeClass("my-show").addClass("my-hide");
		$(this).html("▲");
	});

	$("body").on("click", ".my-hide", function() {
		$($(this).data("element")).addClass("hide");
		$(this).removeClass("my-hide").addClass("my-show");
		$(this).html("▼");
	});
	
	$("#resFrom, #resTo").on("keyup", function() { calcResonantOrbit($("#cBodies").data("idx")); });
	$("#resFrom, #resTo").on("cut", function() { calcResonantOrbit($("#cBodies").data("idx")); });
	$("#resFrom, #resTo").on("paste", function() { calcResonantOrbit($("#cBodies").data("idx")); });
	
	$("#freeAlt").on("keyup", function() { calcFreeAltOrbit($("#cBodies").data("idx")); });
	$("#freeAlt").on("cut", function() { calcFreeAltOrbit($("#cBodies").data("idx")); });
	$("#freeAlt").on("paste", function() { calcFreeAltOrbit($("#cBodies").data("idx")); });

	$("#freeTime").on("keyup", function() { calcFreeTimeOrbit($("#cBodies").data("idx")); });
	$("#fretTime").on("cut", function() { calcFreeTimeOrbit($("#cBodies").data("idx")); });
	$("#freeTime").on("paste", function() { calcFreeTimeOrbit($("#cBodies").data("idx")); });
});
