var antName = 0;
var antRadius = 1;
var antAngle = 2;
var antAvail = 3;
var antMod = 4;
var antCode = 5;
var antenns = new Array(
	new Array("Reflectron DP-10",                500000, 360,     1, "RT2",  "RTShortAntenna1"),
	new Array("FASA Explorer Probe Core",        500000, 360,     0, "FASA", "FASAExplorerProbe"),
	new Array("Communotron 16-S",               1500000,   360,   1, "RT2",  "SurfAntenna"),
	new Array("AEIS CommTech DF-2",             1000000, 360,     0, "AEIS", "AntennaDF2"),
	new Array("FASA LEM Antennas",              1000000, 360,     0, "FASA", "FASALM_Antenna"),
	new Array("FASA Mercury Antenna Cap",       1500000, 360,     0, "FASA", "FASAMercruyCap2"),
	new Array("AEIS CommTech ESC-EXP",          2000000, 360,     0, "AEIS", "Antennaesc"),
	new Array("Communotron 16",                 2500000, 360,     1, "RT2",  "longAntenna"),
	new Array("Novapunch Thor Lander RCS",      2500000, 360,     0, "Nova", "NP_ThorLanderRCS"),
	new Array("CommTech EXP-VR-2T",             3000000, 360,     1, "RT2",  "RTLongAntenna3"),
	new Array("AEIS CommTech EXP-VR-2T",        3000000, 360,     0, "AEIS", "Antennaexpatvr2"),
	new Array("FASA Agena Antenna",             3750000, 360,     0, "FASA", "FASAAgenaAnt"),
	new Array("Communotron 32",                 5000000, 360,     1, "RT2",  "RTLongAntenna2"),
	new Array("LLL Small Fixed Satellite Dish", 5000000, 120,     0, "LLL",  "LLLAttchDishSmall"),
	new Array("LLL Communotron 32",             7000000, 360,     0, "LLL",  "LLLCommPole2"),
	new Array("LLL Communotron 64",            15000000, 360,     0, "LLL",  "LLLCommPole"),
	new Array("FASA Gemini Antenna",           20000000,  95,     0, "FASA", "FASAGeminiAntenna"),
	new Array("FASA Apollo Service Module",    35000000,  67.5,   0, "FASA", "FASAApollo_SM_Dish"),
	new Array("LLL Omni Radar",                35000000,  15,     0, "LLL",  "PolyRadar"),
	new Array("Communotron DTS-M1",            50000000,  45,     1, "RT2",  "mediumDishAntenna"),
	new Array("LLL Comm Tower",                50000000, 360,     0, "LLL",  "Commtow"),
	new Array("AEIS CommTech CL-1",            90000000,  90,     0, "AEIS", "Dishcl1"),
	new Array("LLL Scanning Dish",             90000000,  45,     0, "LLL",  "LLLRotDish"),
	new Array("Reflectron KR-7",               90000000,  25,     1, "RT2",  "RTShortDish2"),
	new Array("Reflectron SS-5",               90000000,  25,     0, "RT2",  "RTShortDish1"),
	new Array("LLL Fixed Satellite Dish",      90000000,  15,     0, "LLL",  "LLLAttchDish"),
	new Array("AEIS CommTech PCF-5",          160000000,  60,     0, "AEIS", "Dishpcf"),
	new Array("RA-2 Relay Antenna",           200000000,   12.5,  1, "RT2",  "RelayAntenna5"),
	new Array("AEIS CommTech-1",              500000000,  45,     0, "AEIS", "Antennacomtec1"),
	new Array("AEIS CommTech-2",              900000000,  25,     0, "AEIS", "Antennacomtec2"),
	new Array("Ven's Communotron DTS-M2",    1000000000,  20,     0, "Ven",  "LongDeployableAntenna"),
	new Array("Ven's Communotron DTS-M5",    5000000000,   0.05,  0, "Ven",  "SmallFixedAntenna"),
	new Array("RA-15 Relay Antenna",        10000000000,   0.25,  1, "RT2",  "RelayAntenna50"),
	new Array("HG-5 High Gain",             25000000000,   0.12,  1, "RT2",  "HighGainAntenna5"),
	new Array("Communotron 88-88",          40000000000,   0.06,  1, "RT2",  "commDish"),
	new Array("Ven's Communotron DTS-M7",   45000000000,   0.10,  0, "Ven",  "mediumFixedAntenna"),
	new Array("Reflectron KR-14",           60000000000,   0.04,  1, "RT2",  "RTLongDish2"),
	new Array("Reflectron LL-5",            60000000000,   0.04,  0, "RT2",  "RTLongDish1"),
	new Array("RA-100 Relay Antenna",      100000000000,   0.025, 1, "RT2",  "RelayAntenna100"),
	new Array("AEIS Comlar 1",             130000000000,   0.016, 0, "AEIS", "dishcomlar1"),
	new Array("CommTech-1",                350000000000,   0.006, 1, "RT2",  "RTGigaDish2"),
	new Array("LLL Large Scanning Dish",   400000000000,   0.03,  0, "LLL",  "LLLRotDish2-5"),
	new Array("AEIS CommTech CM-60",       400000000000,   0.006, 0, "AEIS", "Dishmccomu"),
	new Array("Reflectron GX-128",         400000000000,   0.005, 1, "RT2",  "RTGigaDish1"),
	new Array("Ven's Communotron 88-X",    500000000000,   0.0065,0, "Ven",  "largeFixedAntenna"),
	new Array("AEIS CommTech Omega-2G",    600000000000,   0.004, 0, "AEIS", "Dishomega2g")
);

var modCode = 0;
var modName = 1;
var mods = new Array(
	new Array("RT2", "Remote Tech 2"),
	new Array("FASA", "Frizzank Aeronautical Space Administration (FASA)"),
	new Array("AEIS", "Agencia de Investigaciones Espaciales Suprema (AEIS) Aerospace"),
	new Array("LLL", "Lack Luster Labs"),
	new Array("Ven", "Ven's Stock Revamp"),
	new Array("Nova", "Novapunch")
);
