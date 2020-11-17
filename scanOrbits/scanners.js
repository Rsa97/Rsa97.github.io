var scanners = [
	{name:"SCAN RADAR Altimetry Sensor",                               minAlt:  5000, maxAlt: 500000, bestAlt:  5000, fov:5,   avail:1, type:   1},
	{name:"SCAN Multispectral Sensor",                                 minAlt:  5000, maxAlt: 500000, bestAlt:250000, fov:4,   avail:0, type:  24},
	{name:"SCAN SAR Altimetry Sensor",                                 minAlt:  5000, maxAlt: 800000, bestAlt:750000, fov:2,   avail:0, type:   2},
	{name:"R-3B Radar Altimeter",                                      minAlt:  5000, maxAlt: 250000, bestAlt: 70000, fov:1.5, avail:0, type:   1},
	{name:"R-EO-1 Radar Antenna",                                      minAlt: 50000, maxAlt: 500000, bestAlt:100000, fov:3.5, avail:0, type:   1},	
	{name:"MS-1 Multispectral Scanner",                                minAlt: 20000, maxAlt: 250000, bestAlt: 70000, fov:3,   avail:0, type:  12},
	{name:"MS-R Enhanced Multispectral Scanner",                       minAlt: 70000, maxAlt: 400000, bestAlt:300000, fov:1.5, avail:0, type: 140},
	{name:"MS-2A Advanced Multispectral Scanner",                      minAlt:100000, maxAlt: 750000, bestAlt:500000, fov:4,   avail:0, type: 140},
	{name:"VS-1 High Resolution Imager",                               minAlt: 20000, maxAlt: 250000, bestAlt: 70000, fov:1.5, avail:0, type:  64},
	{name:"VS-3 Advanced High Resolution Imager",                      minAlt: 70000, maxAlt: 500000, bestAlt:350000, fov:2.5, avail:0, type:  80},
	{name:"VS-11 Classified Reconnaissance Imager",                    minAlt:100000, maxAlt:1000000, bestAlt:200000, fov:4,   avail:0, type:  80}, 
	{name:"SCAN-R Resource Mapper",                                    minAlt: 20000, maxAlt: 250000, bestAlt: 70000, fov:1,   avail:0, type: 256},
	{name:"SCAN-R2 Advanced Resource Mapper",                          minAlt: 70000, maxAlt: 500000, bestAlt:250000, fov:2.5, avail:0, type: 256},
	{name:"SCAN-RX Hyperspectral Resource Mapper",                     minAlt:100000, maxAlt: 750000, bestAlt:500000, fov:3,   avail:0, type: 256},
	{name:"SAR-X Antenna",                                             minAlt: 70000, maxAlt: 500000, bestAlt:250000, fov:1.5, avail:0, type:   2},
	{name:"SAR-C Antenna",                                             minAlt:500000, maxAlt: 750000, bestAlt:700000, fov:3,   avail:0, type:   2},
	{name:"SAR-L Antenna",                                             minAlt:250000, maxAlt:1000000, bestAlt:500000, fov:4,   avail:0, type:  10},
	{name:"M700 Survey Scanner (stock disabled)",                      minAlt: 15000, maxAlt:7500000, bestAlt:500000, fov:3,   avail:0, type: 128},
	{name:"M4435 Narrow-Band Scanner (stock disabled)",                minAlt: 10000, maxAlt: 500000, bestAlt:150000, fov:2,   avail:0, type: 256},
	{name:"Multi-Spectral Imaging Platform (DMagic Orbital Science)",  minAlt:  5000, maxAlt: 500000, bestAlt:250000, fov:4,   avail:0, type:  24},
	{name:"Magnetometer Ore Scanner (DMagic Orbital Science)",         minAlt: 30000, maxAlt:  60000, bestAlt: 50000, fov:2,   avail:0, type: 256},
	{name:"Soil Moisture Sensor (DMagic Orbital Science)",             minAlt: 50000, maxAlt: 500000, bestAlt:250000, fov:3,   avail:0, type:8192},
];

var totalMaxFOV = 41;
var totalMinFOV = 1;

function getFOVbyAlt(celestialBodyIdx, scannerIdx, altitude) {
	maxAlt = (scanners[scannerIdx].maxAlt === 'lowOrbit' 
	       ? celestialBodies[celestialBodyIdx].lowOrbit
	       : scanners[scannerIdx].maxAlt);
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

