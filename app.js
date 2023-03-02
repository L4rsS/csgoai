const fs = require("fs");
const demofile = require("demofile");
const util = require("util");

const demoFile = new demofile.DemoFile();
const demoPath = "demos/test1.dem";
const jsonPath = 'export/game8.json';
//const jsonPath2 = 'export/game9.json';

function addRowToCsv(row, filePath, lastRow) {
  var n = '';
  if (lastRow == true) {
    n = "\n";
  }
  const fields = Object.values(row);
  const csvRow = fields.map(field => `"${field}"`).join(",");
  fs.appendFileSync(filePath, csvRow + n);
}

var game = [];

const stats = {
  teamA_winning_chance: 0.5,
  //teamA_winning_chance: null,
  tick: 0,
  time: 0,
  timestamp: '00:00:00',
  round: 0,
  half: '',
  teamA: {
    score: 0,
    playersAlive: 5,
    equipmentValue: 0,
    cashSpend: 0,
    players: [],
    smokesDetonated: [],
    flashesDetonated: [],
    hegrenadesDetonated: [],
    //molotovsDetonated: [],
    
  },
  teamB: {
    score: 0,
    playersAlive: 5,
    equipmentValue: 0,
    cashSpend: 0,
    players: [],
    smokesDetonated: [],
    flashesDetonated: [],
    hegrenadesDetonated: [],
    //molotovsDetonated: [],
  }
};
let teams = stats;

const names = {
  attackers: ['L4rs_', 'L2_xGod', 'L4rs', 'NaNi-L2_xGod'],
  victims: ['L4rs_', 'L2_xGod', 'L4rs', 'NaNi-L2_xGod']
};
const colorGray = '\x1b[90m%s\x1b[0m';
const colorGreen = '\x1b[32m%s\x1b[0m';
const colorRed = '\x1b[31m%s\x1b[0m';
const colorPurple = '\x1b[35m%s\x1b[0m';
const colorYellow = '\x1b[33m%s\x1b[0m'
const colorBlue = '\x1b[34m%s\x1b[0m'

// WRITE STREAM //
const writeStream = fs.createWriteStream(jsonPath);
const pathName = writeStream.path;
writeStream.write(`[`);

/*const writeStream2 = fs.createWriteStream(jsonPath2);
const pathName2 = writeStream2.path;
writeStream2.write(`[`);*/


writeStream.on('finish', () => {
   //console.log(`wrote all the array data to file ${pathName}`);
});
writeStream.on('error', (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`)
});


function snap() {
  
  teams.tick = demoFile.currentTick;
  teams.time = demoFile.currentTime;
  let time = demoFile.currentTime;
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);
  var zero = ''; if (minutes < 10) zero = '0';
  teams.timestamp = '00:'+zero+minutes+":"+seconds.toFixed(0);
  teams.round = demoFile.gameRules.roundsPlayed + 1;
  teams.half = demoFile.gameRules.phase;
  

  //console.log(teams.round)

  for (var i = 2; i <= 3; i++){
    var aB = '';
    var teamEquipmentValue = 0;
    var cashSpend = 0;
    var players = demoFile.teams[i].members;
    var members = [];
    var aliveCounter = 0;

    players.forEach(function(member, index){

      aB = isAorB(i, teams.round);
      var teamAB = eval('teams.team'+aB);
      teamEquipmentValue += parseInt(member.currentEquipmentValue);

      var player = {};
      //player.name = member.name;
      player.isAlive = member.isAlive;
      player.health = member.health;
      player.armor = member.armor;
      player.hasHelmet = member.hasHelmet;
      player.hasDefuser = member.hasDefuser;
      player.hasC4 = member.hasC4;
      player.score = member.score;
      player.kills = member.kills;
      player.assists = member.assists;
      player.deaths = member.deaths;
      player.cashSpendThisRound = member.cashSpendThisRound;
      player.cashSpendTotal = member.cashSpendTotal;
      player.currentEquipmentValue = member.currentEquipmentValue;
      player.freezeTimeEndEquipmentValue = member.freezeTimeEndEquipmentValue;
      player.roundStartEquipmentValue = member.roundStartEquipmentValue;
      player.flashDuration = member.flashDuration;
      player.money = member.account;
      player.allSpotted = member.allSpotted.length;
      player.allSpotters = member.allSpotters.length;
      player.isDefusing = member.isDefusing;
      player.isDucked = member.isDucked;
      player.isDucking = member.isDucking;
      player.isInBombZone = member.isInBombZone;
      player.isInBuyZone = member.isInBuyZone;
      player.isScoped = member.isScoped;
      player.isWalking = member.isWalking;
      player.speed = member.velocity;
      //player.weapon = member.weapon?.itemName;
      //player.weapons = member.weapons;
      player.position = member.position;
      //player.utilityDamage = member.props.m_iMatchStats_UtilityDamage;
      //player.enemiesFlashed = member.props.m_iMatchStats_EnemiesFlashed;
      //player.ammo = console.log(member.props.m_iAmmo);
      player.position = member.eyeAngles;

      cashSpend += parseInt(member.cashSpendThisRound);
      members.push(player);
      aliveCounter += Number(member.isAlive)

      if((i == 3 && index == players.length-1) || (i == 2 && index == demoFile.teams[2].members.length-1)) {
        teamAB.equipmentValue = teamEquipmentValue;
        teamAB.cashSpend = cashSpend;
        teamAB.players = members;
        teamAB.playersAlive = aliveCounter;
        //console.log(members.length)
        teamAB.score = demoFile.teams[i].score;
        teamAB.roundsNeeded = 16-demoFile.teams[i].score;
        teamAB.name = demoFile.teams[i].clanName
        //////////////////////////////////////////////////////////

        let roundsPlayed = teams.teamA.score + teams.teamB.score;
        let teamA_winningChance = (teams.teamA.score / (roundsPlayed));
        if (teamA_winningChance == 0 || isNaN(teamA_winningChance) || teams.teamA.score == 0 || teams.teamB.score == 0) {
          teamA_winningChance = 0.5;
        } 
        teams.teamA_winning_chance = teamA_winningChance;
        //console.log(teamA_winningChance)

        game.push(teams);
        //console.log(teams)
        writeStream.write(`${JSON.stringify(teams)},`);

      }
        

    });
    
  }

  return teams;

}

function isAorB(x, y){
  var aB = '';
  if (x == 2 && teams.round <= 15) aB = 'A'; 
  if (x == 3 && teams.round <= 15) aB = 'B'; 
  if (x == 2 && teams.round > 15) aB = 'B'; 
  if (x == 3 && teams.round > 15) aB = 'A';
  return aB;
}/*
// Add Grenades to array // Molotov+Decoy missing
demoFile.gameEvents.on('smokegrenade_detonate', e => {
  var aB = '';
  aB = isAorB(e.player.teamNumber, teams.round);
  var teamAB = eval('teams.team'+aB);
  teamAB.smokesDetonated.push({name: e.player.name, round: demoFile.gameRules.roundsPlayed+1, tick: demoFile.currentTick, time: demoFile.currentTime, x: e.x, y: e.y, z: e.z, position: e.player.position, speed: e.player.speed});
});
demoFile.gameEvents.on('flashbang_detonate', e => {
  var aB = '';
  aB = isAorB(e.player.teamNumber, teams.round);
  var teamAB = eval('teams.team'+aB);
  teamAB.flashesDetonated.push({name: e.player.name, round: demoFile.gameRules.roundsPlayed+1, tick: demoFile.currentTick, time: demoFile.currentTime, x: e.x, y: e.y, z: e.z, position: e.player.position, speed: e.player.speed});
});
demoFile.gameEvents.on('hegrenade_detonate', e => {
  var aB = '';
  aB = isAorB(e.player.teamNumber, teams.round);
  var teamAB = eval('teams.team'+aB);
  teamAB.hegrenadesDetonated.push({name: e.player.name, round: demoFile.gameRules.roundsPlayed+1, tick: demoFile.currentTick, time: demoFile.currentTime, x: e.x, y: e.y, z: e.z, position: e.player.position, speed: e.player.velocity});
}); */

demoFile.on("start", () => {
  console.log(colorGreen, "Starting demo parsing on map: "+ demoFile.header.mapName);
  console.log(colorYellow, "Tick rate:", demoFile.tickRate);
  console.log(colorPurple, "Duration (seconds):", demoFile.header.playbackTime);
});

demoFile.gameEvents.on("player_death", (event) => {

  const victim = demoFile.entities.getByUserId(event.userid);
  const victimName = victim ? victim.name : "unnamed";

  // Attacker may have disconnected so be aware.
  // e.g. attacker could have thrown a grenade, disconnected, then that grenade
  // killed another player.
  const attacker = demoFile.entities.getByUserId(event.attacker);
  const attackerName = attacker ? attacker.name : "unnamed";

  const headshotText = event.headshot ? " HS" : "";
  let color = colorGray;

  if (names.attackers.includes(attackerName)) {
    color = colorGreen;
  } else if (names.victims.includes(victimName)) {
    color = colorRed;
  }
  if (color != colorGray) {
    console.log(color, `${attackerName} [${event.weapon}${headshotText}] ${victimName}`);
  }

  // write each value of the array on the file breaking line
  //writeStream.write(`${JSON.stringify(snap())}\n`);
  //game.push(snap());
  snap();
  
  //writeStream.write(`${JSON.stringify(snap())}\n`);
  //writeStream.write(`${JSON.stringify(snap())}`);
  
});

demoFile.gameEvents.on("round_officially_ended", e => {

  //const winningProbability = calculateWinningProbability(teams.teamA.score, teams.teamB.score);
  //console.log(`The winning probability of Team A is: ${winningProbability}`);

  logTeamScores();

  //teams = stats;
  teams.teamA.hegrenadesDetonated = [];
  teams.teamA.smokesDetonated = [];
  teams.teamA.flashesDetonated = [];
  teams.teamB.hegrenadesDetonated = [];
  teams.teamB.smokesDetonated = [];
  teams.teamB.flashesDetonated = [];

});

function logTeamScores() {
  const teams = demoFile.teams;

  const terrorists = teams[2];
  const cts = teams[3];

  console.log(terrorists.teamName,
    terrorists.clanName,
    terrorists.score,
    "-",
    cts.score,
    cts.clanName,
    cts.teamName);


}

// On end of demo
demoFile.on("end", e => {
  if (e.error) {
    console.error("Error during parsing:", e.error);
    process.exitCode = 1;
  } else {
    logTeamScores();
    if (teams.teamA.score == 16) teams.teamA_winning_chance = 1;
    if (teams.teamB.score == 16) teams.teamA_winning_chance = 1;
    if(demoFile.teams[3].score > demoFile.teams[2].score) teams.teamA_winning_chance = 0; else teams.teamA_winning_chance = 1; console.log((teams.teamA_winning_chance));
    writeStream.write(`]`);
    writeStream.end();

    //writeStream2.write(JSON.stringify(game));
    //writeStream2.end();

    game.forEach(d => {
      teams.win = "A";
    })


    //game.map(q => {console.log(q.round)})

    console.log(colorYellow, "---------\nEquipmentValue: "+teams.teamA.equipmentValue+ " - "+teams.teamB.equipmentValue);
    console.log(colorGreen, "CashSpend: "+teams.teamA.cashSpend+" - "+teams.teamB.cashSpend);
    console.log(colorPurple, "Round: "+teams.round+" Phase: "+teams.phase);

    //fs.appendFileSync('game3.json', JSON.stringify(game, null, 2));

    console.log(game)
/*
    const writeStream = fs.createWriteStream('game1.jsonl');
    const pathName = writeStream.path;
     
    // write each value of the array on the file breaking line
    game.forEach(value => writeStream.write(`${JSON.stringify(value)}\n`));
    
    writeStream.on('finish', () => {
       //console.log(`wrote all the array data to file ${pathName}`);
    });
    writeStream.on('error', (err) => {
        console.error(`There is an error writing the file ${pathName} => ${err}`)
    });
    writeStream.end(); */
  
    console.log("Game Finished.");

  }
});

demoFile.parseStream(fs.createReadStream(demoPath));
//demoFile.parseBroadcast("https://localhost:8080")