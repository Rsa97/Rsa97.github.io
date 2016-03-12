var scanName = 0;
var scanMinAlt = 1;
var scanMaxAlt = 2;
var scanBestAlt = 3;
var scanFOV = 4;
var scanPeriod = 5;
var scanType = 6;
var scanAvail = 7;

var scanners = new Array(
	new Array("SCAN RADAR Altimetry Sensor",				 5000,  500000,    5000, 5,   0.5, 1, 1),
	new Array("SCAN Multispectral Sensor",					 5000,  500000,  250000, 4,   0.5, 1, 0),
	new Array("SCAN SAR Altimetry Sensor",					 5000,  800000,  750000, 2,   0.5, 1, 0),
	new Array("M700 Survay Scanner (stock disabled)",			15000, 1000000,  150000, 5,   0.5, 1, 0),
	new Array("M4435 Narrow-Band Scanner (stock disabled)",			10000,  500000,  150000, 3,   0.5, 1, 0),
	new Array("BG-MGN Magnetometer (Extraplanetary Launchpads)",		10000,   71000,   65000, 2,   0.5, 1, 0),
	new Array("BG-OMD2 Orbital Mass Detector (Extraplanetary Launchpads)",	10000,  500000,  200000, 3,   0.5, 1, 0),
	new Array("Planetary Survey Camera (USI Kolonization Systems)",		10000,  500000,  150000, 3,   0.5, 1, 0),
	new Array("KA-100 Detection Array (Karbonite)",				10000,  500000,  150000, 3,   0.5, 1, 0)
//	new Array("KE-S210 Compact Survey Unit",    0,  250000, "любая", 2.5, 1.5, 2, 0),
//	new Array("KE-S110 Medium Survey Unit",     0, 1200000, "любая", 2.5, 0.9, 2, 1)
);

var totalMaxFOV = 41;
var totalMinFOV = 1;

function getFOVbyAlt(celestialBodyIdx, scannerIdx, altitude) {
	if (altitude < scanners[scannerIdx][scanMinAlt] || 
		altitude > scanners[scannerIdx][scanMaxAlt] ||
		altitude < celestialBodies[celestialBodyIdx][cbPeak] ||
		altitude > celestialBodies[celestialBodyIdx][cbSOI])
		return 0.001;
	var bestAlt = (scanners[scannerIdx][scanBestAlt] < celestialBodies[celestialBodyIdx][cbSOI] ? scanners[scannerIdx][scanBestAlt] : celestialBodies[celestialBodyIdx][cbSOI]);
	switch (scanners[scannerIdx][scanType]) {
		case 1: // ScanSat
			var fov = scanners[scannerIdx][scanFOV]*(altitude < bestAlt ? (altitude/bestAlt) : 1)*
				(celestialBodies[celestialBodyIdx][cbRadius] > 600000 ? 1 : Math.sqrt(600000/celestialBodies[celestialBodyIdx][cbRadius]));
			if (fov > 20)
				fov = 20;
			return Math.floor(fov)*2+Math.round(fov-Math.floor(fov))+1; 
			break;
		case 2: // Kethane
			return 2.5;
			break;
		default:
			return 0.001;
	}
}

