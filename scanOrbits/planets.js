/**
 * @author Rsa
 */

// Название, радиус, сидерический период, масса, SOI, высота атмосферы/препятствий, апоапсис, периапсис, родитель
var celestialBodies = [
	{name:"Sun",    radius:261600000, sideral: 432000,     mass:1.7565670e28, soi:        -1,    peak:  1300, ap:           0, pe:          0, gm:1.1723328e18, parent:-1}, // 0
	{name:"Moho",   radius:   250000, sideral:1210000,     mass:2.5263617e21, soi:   9646663,    peak:  6817, ap:  6315765980, pe: 4210510628, gm:1.6860938e11, parent: 0}, // 1
	{name:"Eve",    radius:   700000, sideral:  80500,     mass:1.2244127e23, soi:  85109365,    peak: 96709, ap:  9931011387, pe: 9734357701, gm:8.1717302e12, parent: 0}, // 2
	{name:"Gilly",  radius:    13000, sideral:  28255,     mass:1.2420512e17, soi:    126123.27, peak:  6400, ap:    48825000, pe:   14175000, gm:8.2894498e06, parent: 2}, // 3
	{name:"Kerbin", radius:   600000, sideral:  21549.425, mass:5.2915793e22, soi:  84159286,    peak: 69078, ap: 13599840256, pe:13599840256, gm:3.5316000e12, parent: 0}, // 4
	{name:"Mun",    radius:   200000, sideral: 138984.38,  mass:9.7600236e20, soi:   2429559.1,  peak:  7062, ap:    12000000, pe:   12000000, gm:6.5138398e10, parent: 4}, // 5 
	{name:"Minmus", radius:    60000, sideral:  40400,     mass:2.6457897e19, soi:   2247428.4,  peak:  5725, ap:    47000000, pe:   47000000, gm:1.7658000e9,  parent: 4}, // 6
	{name:"Duna",   radius:   320000, sideral:  65517.859, mass:4.5154812e21, soi:  47921949,    peak: 41447, ap: 21783189163, pe:19669121365, gm:3.0136321e11, parent: 0}, // 7 
	{name:"Ike",    radius:   130000, sideral:  65517.862, mass:2.7821949e20, soi:   1049598.9,  peak: 12750, ap:     3296000, pe:    3104000, gm:1.8568369e10, parent: 7}, // 8
	{name:"Dres",   radius:   138000, sideral:  34800,     mass:3.2191322e20, soi:  32832840,    peak:  5700, ap: 46761053522, pe:34917642884, gm:2.1484489e10, parent: 0}, // 9
	{name:"Jool",   radius:  6000000, sideral:  36000,     mass:4.2332635e24, soi:2455985200,    peak:138156, ap: 72212238387, pe:65334882253, gm:2.8252800e14, parent: 0}, // 10
	{name:"Laythe", radius:   500000, sideral:  52980.879, mass:2.9397663e22, soi:   3723645.8,  peak: 55263, ap:    27184000, pe:   27184000, gm:1.9620000e12, parent:10}, // 11
	{name:"Vall",   radius:   300000, sideral: 105962.09,  mass:3.1088028e21, soi:   2406401.4,  peak:  7976, ap:    43152000, pe:   43152000, gm:2.0748150e11, parent:10}, // 12
	{name:"Tylo",   radius:   600000, sideral: 211926.36,  mass:4.2332635e22, soi:  10856518,    peak: 11290, ap:    68500000, pe:   68500000, gm:2.8252800e12, parent:10}, // 13
	{name:"Bop",    radius:    65000, sideral: 544507.43,  mass:3.7261536e19, soi:   1221060.9,  peak: 21758, ap:   158697500, pe:   98302500, gm:2.4868349e09, parent:10}, // 14
	{name:"Pol",    radius:    44000, sideral: 901902.62,  mass:1.0813636e19, soi:   1042138.9 , peak:  5591, ap:   210624206, pe:  149155794, gm:7.2170208e08, parent:10}, // 15
	{name:"Eeloo",  radius:   210000, sideral:  19460,     mass:1.1149358e21, soi: 119082940,    peak:  3874, ap:113549713200, pe:66687926800, gm:7.4410815e10, parent: 0}  // 16
];
