/**
 * @author Rsa
 */

// Название, радиус, сидерический период, масса, SOI, высота атмосферы/препятствий, апоапсис, периапсис, родитель
var planetPacks = {
    stock: {
	name: 'Стоковые планеты',
	bodies: [
	    {name:'Sun',    radius:261600000, sideral: 432000,     mass:1.7565670e28, soi:        -1,    lowOrbit:   1e9, peak:  1300, gm:1.1723328e18, parent:-1}, // 0
	    {name:'Moho',   radius:   250000, sideral:1210000,     mass:2.5263617e21, soi:   9646663,    lowOrbit: 80000, peak:  6817, gm:1.6860938e11, parent: 0}, // 1
	    {name:'Eve',    radius:   700000, sideral:  80500,     mass:1.2244127e23, soi:  85109365,    lowOrbit:400000, peak: 96709, gm:8.1717302e12, parent: 0}, // 2
	    {name:'Gilly',  radius:    13000, sideral:  28255,     mass:1.2420512e17, soi:    126123.27, lowOrbit:  6000, peak:  6400, gm:8.2894498e06, parent: 2}, // 3
	    {name:'Kerbin', radius:   600000, sideral:  21549.425, mass:5.2915793e22, soi:  84159286,    lowOrbit:250000, peak: 69078, gm:3.5316000e12, parent: 0}, // 4
	    {name:'Mun',    radius:   200000, sideral: 138984.38,  mass:9.7600236e20, soi:   2429559.1,  lowOrbit: 60000, peak:  7062, gm:6.5138398e10, parent: 4}, // 5 
	    {name:'Minmus', radius:    60000, sideral:  40400,     mass:2.6457897e19, soi:   2247428.4,  lowOrbit: 30000, peak:  5725, gm:1.7658000e9,  parent: 4}, // 6
    	    {name:'Duna',   radius:   320000, sideral:  65517.859, mass:4.5154812e21, soi:  47921949,    lowOrbit:140000, peak: 41447, gm:3.0136321e11, parent: 0}, // 7 
	    {name:'Ike',    radius:   130000, sideral:  65517.862, mass:2.7821949e20, soi:   1049598.9,  lowOrbit: 50000, peak: 12750, gm:1.8568369e10, parent: 7}, // 8
	    {name:'Dres',   radius:   138000, sideral:  34800,     mass:3.2191322e20, soi:  32832840,    lowOrbit: 25000, peak:  5700, gm:2.1484489e10, parent: 0}, // 9
	    {name:'Jool',   radius:  6000000, sideral:  36000,     mass:4.2332635e24, soi:2455985200,    lowOrbit:   4e6, peak:138156, gm:2.8252800e14, parent: 0}, // 10
	    {name:'Laythe', radius:   500000, sideral:  52980.879, mass:2.9397663e22, soi:   3723645.8,  lowOrbit:200000, peak: 55263, gm:1.9620000e12, parent:10}, // 11
	    {name:'Vall',   radius:   300000, sideral: 105962.09,  mass:3.1088028e21, soi:   2406401.4,  lowOrbit: 90000, peak:  7976, gm:2.0748150e11, parent:10}, // 12
	    {name:'Tylo',   radius:   600000, sideral: 211926.36,  mass:4.2332635e22, soi:  10856518,    lowOrbit:250000, peak: 11290, gm:2.8252800e12, parent:10}, // 13
	    {name:'Bop',    radius:    65000, sideral: 544507.43,  mass:3.7261536e19, soi:   1221060.9,  lowOrbit: 25000, peak: 21758, gm:2.4868349e09, parent:10}, // 14
	    {name:'Pol',    radius:    44000, sideral: 901902.62,  mass:1.0813636e19, soi:   1042138.9 , lowOrbit: 21000, peak:  5591, gm:7.2170208e08, parent:10}, // 15
	    {name:'Eeloo',  radius:   210000, sideral:  19460,     mass:1.1149358e21, soi: 119082940,    lowOrbit: 60000, peak:  3874, gm:7.4410815e10, parent: 0}, // 16
        ],
	homeWorldIdx: 4,
    },
    gpp: {
	name: 'Galileo Planet Pack',
        bodies: [
	    {name:'Ciro',      radius:70980000, sideral: 540000,   mass:1.90994545e28, soi:        -1, lowOrbit:2.3216e9, peak:     0, gm:1.2747549e18, parent:-1},
	    {name:'Icarus',    radius:  160000, sideral: 766931.1, mass:6.01851317e20, soi:   3491200, lowOrbit:  80000,  peak:  5000, gm:4.0169362e10, parent: 0},
            {name:'Thalia',    radius:  270000, sideral:  72000,   mass:3.21349812e21, soi:  13645700, lowOrbit: 135000,  peak:  9000, gm:2.1447851e11, parent: 0},
            {name:'Eta',       radius:   60000, sideral: 515362.5, mass:2.64485442e19, soi:   1656700, lowOrbit:  30000,  peak:  2500, gm:1.7652552e9,  parent: 2},
	    {name:'Niven',     radius:  400000, sideral:  43200,   mass:1.17549085e22, soi:  34386200, lowOrbit: 200000,  peak: 65000, gm:7.8455786e11, parent: 0},
	    {name:'Gael',      radius:  600000, sideral:  21549.4, mass:5.28970884e22, soi:  83667600, lowOrbit: 300000,  peak: 70000, gm:3.5305104e12, parent: 0},
	    {name:'Iota',      radius:  100000, sideral: 495456.3, mass:1.24895903e20, soi:   3628500, lowOrbit:  50000,  peak:  3500, gm:8.3359274e9,  parent: 5},
	    {name:'Ceti',      radius:  150000, sideral:1363993.5, mass:4.46319184e20, soi:   8144200, lowOrbit:  75000,  peak:  5000, gm:2.9788681e10, parent: 5},
	    {name:'Tellumo',   radius: 1000000, sideral:  57600,   mass:2.79179078e23, soi: 260440100, lowOrbit: 500000,  peak: 45000, gm:1.8633249e13, parent: 0},
	    {name:'Lili',      radius:    7000, sideral:   2554.7, mass:1.07998222e17, soi:     40000, lowOrbit:  10000,  peak: 10000, gm:7.2081253e6,  parent: 8},	
	    {name:'Gratian',   radius:  550000, sideral: 139245.8, mass:3.33361859e22, soi: 194786300, lowOrbit: 275000,  peak: 50000, gm:2.2249571e12, parent: 0},
	    {name:'Geminus',   radius:  230000, sideral: 139245.8, mass:1.71005432e21, soi:   3597100, lowOrbit: 115000,  peak:  6000, gm:1.1413415e11, parent:10},
	    {name:'Otho',      radius: 3500000, sideral:  50400,   mass:1.65597274e24, soi:  15730100, lowOrbit:1750000,  peak:600000, gm:1.1052459e14, parent: 0},
	    {name:'Augustus',  radius:  350000, sideral:  53456.8, mass:6.29989630e21, soi:   2153500, lowOrbit: 175000,  peak: 60000, gm:4.2047398e11, parent:12},
	    {name:'Hephaestus',radius:  125000, sideral: 108188.9, mass:1.83670446e20, soi:    837807, lowOrbit:  62500,  peak: 10000, gm:1.2258717e10, parent:12},
	    {name:'Jannah',    radius:  105000, sideral: 313204.2, mass:1.05298267e20, soi:   1362300, lowOrbit:  52500,  peak:  3500, gm:7.0279222e9,  parent:12},
	    {name:'Gauss',     radius: 2500000, sideral:  61200,   mass:9.45902797e23, soi:2652000000, lowOrbit:1250000,  peak:400000, gm:6.3132390e13, parent: 0},
	    {name:'Loki',      radius:  180000, sideral:  62924.3, mass:4.76073796e20, soi:    886957, lowOrbit:  90000,  peak:  6500, gm:3.1774593e10, parent:16},
	    {name:'Catullus',  radius: 1200000, sideral: 340308.8, mass:1.90429518e23, soi:  30021300, lowOrbit: 600000,  peak:280000, gm:1.2709837e13, parent:16},
	    {name:'Tarsiss',   radius:  320000, sideral:  25902.6, mass:2.55786810e21, soi:   1070100, lowOrbit: 160000,  peak:130000, gm:1.7071979e11, parent:18},
	    {name:'Nero',      radius: 5000000, sideral:  39600,   mass:3.56320665e24, soi:8835400000, lowOrbit:2500000,  peak:560000, gm:2.3781910e14, parent: 0},
	    {name:'Hadrian',   radius:  300000, sideral:  66949.2, mass:2.38036898e21, soi:   1610800, lowOrbit: 150000,  peak: 80000, gm:1.5887297e11, parent:20},
	    {name:'Narisse',   radius:   90000, sideral: 135495.7, mass:4.76073796e19, soi:    538982, lowOrbit:  45000,  peak:  2500, gm:3.1774593e9,  parent:20},
	    {name:'Muse',      radius:  130000, sideral: 291540.3, mass:1.98657954e20, soi:   1590700, lowOrbit:  65000,  peak:  5000, gm:1.3259028e10, parent:20},
	    {name:'Minona',    radius:  120000, sideral: 639093.4, mass:1.26953012e20, soi:   2244200, lowOrbit:  60000,  peak:  5000, gm:8.4732249e9,  parent:20},
	    {name:'Agrippina', radius:   50000, sideral:  28800,   mass:1.10202268e19, soi:   5003000, lowOrbit:  25000,  peak:  2500, gm:7.3552300e8,  parent:20},
	    {name:'Julia',     radius:   30000, sideral:  36000,   mass:1.98364082e18, soi:   5118000, lowOrbit:  15000,  peak:  2500, gm:1.3239414e8,  parent:20},
	    {name:'Hox',       radius:  250000, sideral:  64800,   mass:1.28569312e21, soi: 576558500, lowOrbit: 125000,  peak: 40000, gm:8.5811016e10, parent: 0},
	    {name:'Argo',      radius:   80000, sideral: 947939.3, mass:3.29137439e19, soi:   2885400, lowOrbit:  40000,  peak:  2500, gm:2.1967620e9,  parent:27},
	    {name:'Leto',      radius:  210000, sideral:  21600,   mass:7.77587200e20, soi: 600296000, lowOrbit: 105000,  peak: 35000, gm:5.1898502e10, parent: 0},
	    {name:'Grannus',   radius:30170000, sideral:1296000,   mass:9.54944429e27, soi:      5e11, lowOrbit:   5e10,  peak:400000, gm:6.3735856e17, parent: 0},
	],
	homeWorldIdx: 5,
    },
};

var celestialBodies = planetPacks.stock.bodies;
var homeWorldIdx = planetPacks.stock.homeWorldIdx;
