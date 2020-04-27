var scanners = [
	{name:"SCAN RADAR Altimetry Sensor",                               minAlt: 5000, maxAlt:    500000, bestAlt:  5000, fov:5, avail:1},
	{name:"SCAN Multispectral Sensor",                                 minAlt: 5000, maxAlt:    500000, bestAlt:250000, fov:4, avail:0},
	{name:"SCAN SAR Altimetry Sensor",                                 minAlt: 5000, maxAlt:    800000, bestAlt:750000, fov:2, avail:0},
	{name:"VS-1 High Resolution Imager",                               minAlt:60000, maxAlt:    200000, bestAlt:150000, fov:2, avail:0},
	{name:"M700 Survay Scanner (stock disabled)",                      minAlt:15000, maxAlt:   1000000, bestAlt:150000, fov:5, avail:0},
	{name:"Multi-Spectral Imaging Platform (DMagic Orbital Science)",  minAlt: 5000, maxAlt:    500000, bestAlt:250000, fov:4, avail:0},
	{name:"Magnetometer Ore Scanner (DMagic Orbital Science)",         minAlt:30000, maxAlt:     60000, bestAlt: 30000, fov:2, avail:0},
	{name:"Soil Moisture Sensor (DMagic Orbital Science)",             minAlt:50000, maxAlt:'lowOrbit', bestAlt:250000, fov:3, avail:0},
	{name:"M4435 Narrow-Band Scanner (stock disabled)",                minAlt:10000, maxAlt:    500000, bestAlt:150000, fov:3, avail:0},
	{name:"BG-MGN Magnetometer (Extraplanetary Launchpads)",           minAlt:10000, maxAlt:     71000, bestAlt: 65000, fov:2, avail:0},
	{name:"BG-OMD2 Orbital Mass Detector (Extraplanetary Launchpads)", minAlt:10000, maxAlt:    500000, bestAlt:200000, fov:3, avail:0},
	{name:"Planetary Survey Camera (USI Kolonization Systems)",        minAlt:10000, maxAlt:    500000, bestAlt:150000, fov:3, avail:0},
	{name:"KA-100 Detection Array (Karbonite)",                        minAlt:10000, maxAlt:    500000, bestAlt:150000, fov:3, avail:0}
];

var totalMaxFOV = 41;
var totalMinFOV = 1;

function getFOVbyAlt(celestialBodyIdx, scannerIdx, altitude) {
	maxAlt = (scanners[scannerIdx].maxAlt === 'lowOrbit' 
	       ? celestialBodies[celestialBodyIdx].lowOrbit
	       : scanners[scannerIdx].maxAlt;
	if (altitude < scanners[scannerIdx].minAlt || 
		altitude > maxAlt ||
		altitude < celestialBodies[celestialBodyIdx].peak ||
		altitude > celestialBodies[celestialBodyIdx].soi)
		return 0.001;
	var bestAlt = (scanners[scannerIdx].bestAlt < celestialBodies[celestialBodyIdx].soi ? scanners[scannerIdx].bestAlt : celestialBodies[celestialBodyIdx].soi);
	var fov = scanners[scannerIdx].fov*(altitude < bestAlt ? (altitude/bestAlt) : 1)
		*(celestialBodies[celestialBodyIdx].radius > 600000 ? 1 : Math.sqrt(600000/celestialBodies[celestialBodyIdx].radius));
	if (fov > 20) {
		fov = 20;
	}
	return Math.floor(fov)*2+Math.round(fov-Math.floor(fov))+1; 
}

