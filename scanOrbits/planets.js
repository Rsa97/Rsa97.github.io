/**
 * @author Rsa
 */

// Название, радиус, сидерический период, масса, SOI, высота атмосферы/препятствий, апоапсис, периапсис, родитель
var cbName = 0;
var cbRadius = 1;
var cbSideral = 2;
var cbMass = 3;
var cbSOI = 4;
var cbPeak = 5;
var cbApo = 6;
var cbPeri = 7;
var cbGM = 8;
var cbParent = 9;
var celestialBodies = new Array(
	new Array("Sun", 261600000, 432000, 1.7565670e28, -1, 1300, 0, 0, 1.1723328e18, -1),		                          // 0
	new Array("Moho", 250000, 1210000, 2.5263617e21, 9646663, 6817, 6315765980, 4210510628, 1.6860938e11, 0),           // 1
	new Array("Eve", 700000, 80500, 1.2244127e23, 85109365, 96709, 9931011387, 9734357701, 8.1717302e12, 0),            // 2
	new Array("Gilly", 13000, 28255, 1.2420512e17, 126123.27, 6400, 48825000, 14175000, 8289449.8, 2),               // 3
	new Array("Kerbin", 600000, 21600, 5.2915793e22, 84159286, 69078, 13599840256, 13599840256, 3.5316000e12, 0),       // 4
	new Array("Mun", 200000, 138984.38, 9.7600236e20, 2429559.1, 7062, 12000000, 12000000, 6.5138398e10, 4),            // 5 
	new Array("Minmus", 60000, 40400, 2.6457897e19, 2247428.4, 5725, 47000000, 47000000, 1.7658000e9, 4),              // 6
	new Array("Duna", 320000, 65517.859, 4.5154812e21, 47921949, 41447, 21783189163, 19669121365, 3.0136321e11, 0),     // 7 
	new Array("Ike", 130000, 65517.862, 2.7821949e20, 1049598.9, 12750, 3296000, 3104000, 1.8568369e10, 7),             // 8
	new Array("Dres", 138000, 34800, 3.2191322e20, 32832840, 5700, 46761053522, 34917642884, 2.1484489e10, 0),          // 9
	new Array("Jool", 6000000, 36000, 4.2332635e24, 2455985200, 138156, 72212238387, 65334882253, 2.8252800e14, 0),     // 10
	new Array("Laythe", 500000, 52980.879, 2.9397663e22, 3723645.8, 55263, 27184000, 27184000, 1.9620000e12, 10),       // 11
	new Array("Vall", 300000, 105962.09, 3.1088028e21, 2406401.4, 7976, 43152000, 43152000, 2.0748150e11, 10),          // 12
	new Array("Tylo", 600000, 211926.36, 4.2332635e22, 10856518, 11290, 68500000, 68500000, 2.8252800e12, 10),          // 13
	new Array("Bop", 65000, 544507.40, 3.7261536e19, 1221060.9, 21758, 158697500, 98302500, 2.4868349e9, 10),          // 14
	new Array("Pol", 44000, 901902.62, 1.0813636e19, 1042138.9 , 5591, 210624206, 149155794, 7.2170208e8, 10),         // 15
	new Array("Eeloo", 210000, 19460, 1.1149358e21, 119082940, 3874, 113549713200, 66687926800, 7.4410815e10, 0)        // 16
);