import * as tf from "@tensorflow/tfjs"
import "@tensorflow/tfjs-node"

//import iris from "./iris.json?type=json" 

const stats = [
  {teamA_winning_chance: 0.44, teamA:{score: 0},teamB:{score: 0}},
  {teamA_winning_chance: 0.44, teamA:{score: 1},teamB:{score: 0}},
  {teamA_winning_chance: 0.44, teamA:{score: 0},teamB:{score: 1}},
  {teamA_winning_chance: 0.44, teamA:{score: 1},teamB:{score: 1}},
  {teamA_winning_chance: 0.44, teamA:{score: 2},teamB:{score: 1}},
  {teamA_winning_chance: 0.44, teamA:{score: 2},teamB:{score: 2}},
  {teamA_winning_chance: 0.44, teamA:{score: 2},teamB:{score: 3}},
  {teamA_winning_chance: 0.44, teamA:{score: 3},teamB:{score: 2}},
  {teamA_winning_chance: 0.44, teamA:{score: 3},teamB:{score: 3}},
  {teamA_winning_chance: 0.44, teamA:{score: 3},teamB:{score: 4}},
  {teamA_winning_chance: 0.44, teamA:{score: 4},teamB:{score: 3}},
  {teamA_winning_chance: 0.44, teamA:{score: 4},teamB:{score: 4}},
  {teamA_winning_chance: 0.44, teamA:{score: 5},teamB:{score: 4}},
  {teamA_winning_chance: 0.44, teamA:{score: 6},teamB:{score: 5}},
  {teamA_winning_chance: 0.44, teamA:{score: 6},teamB:{score: 6}},
  {teamA_winning_chance: 0.44, teamA:{score: 7},teamB:{score: 6}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 9}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 11}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 12}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 13}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 14}},
  {teamA_winning_chance: 0.44, teamA:{score: 9},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 9},teamB:{score: 8}},
  {teamA_winning_chance: 0.44, teamA:{score: 9},teamB:{score: 9}},
  {teamA_winning_chance: 0.44, teamA:{score: 9},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 9},teamB:{score: 11}},
  {teamA_winning_chance: 0.44, teamA:{score: 9},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 10},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 10},teamB:{score: 8}},
  {teamA_winning_chance: 0.44, teamA:{score: 11},teamB:{score: 8}},
  {teamA_winning_chance: 0.44, teamA:{score: 11},teamB:{score: 9}},
  {teamA_winning_chance: 0.44, teamA:{score: 11},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 8}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 9}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 13},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 13},teamB:{score: 11}},
  {teamA_winning_chance: 0.44, teamA:{score: 13},teamB:{score: 12}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 11}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 12}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 13}},
  {teamA_winning_chance: 0.44, teamA:{score: 15},teamB:{score: 13}},
  {teamA_winning_chance: 0.44, teamA:{score: 15},teamB:{score: 13}},
  {teamA_winning_chance: 0.44, teamA:{score: 15},teamB:{score: 13}},
  {teamA_winning_chance: 0.44, teamA:{score: 16},teamB:{score: 14}},
  {teamA_winning_chance: 0.44, teamA:{score: 16},teamB:{score: 13}},
  {teamA_winning_chance: 0.44, teamA:{score: 16},teamB:{score: 12}},
  {teamA_winning_chance: 0.44, teamA:{score: 16},teamB:{score: 11}},
  {teamA_winning_chance: 0.44, teamA:{score: 16},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 13},teamB:{score: 14}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 14}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 15}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 16}},
];

const statsTest = [
  {teamA_winning_chance: 0.44, teamA:{score: 0},teamB:{score: 0}},
  {teamA_winning_chance: 0.44, teamA:{score: 1},teamB:{score: 0}},
  {teamA_winning_chance: 0.44, teamA:{score: 0},teamB:{score: 1}},
  {teamA_winning_chance: 0.44, teamA:{score: 1},teamB:{score: 1}},
  {teamA_winning_chance: 0.44, teamA:{score: 2},teamB:{score: 1}},
  {teamA_winning_chance: 0.44, teamA:{score: 2},teamB:{score: 2}},
  {teamA_winning_chance: 0.44, teamA:{score: 3},teamB:{score: 2}},
  {teamA_winning_chance: 0.44, teamA:{score: 3},teamB:{score: 3}},
  {teamA_winning_chance: 0.44, teamA:{score: 4},teamB:{score: 3}},
  {teamA_winning_chance: 0.44, teamA:{score: 5},teamB:{score: 4}},
  {teamA_winning_chance: 0.44, teamA:{score: 6},teamB:{score: 5}},
  {teamA_winning_chance: 0.44, teamA:{score: 7},teamB:{score: 6}},
  {teamA_winning_chance: 0.44, teamA:{score: 8},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 9},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 10},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 10},teamB:{score: 8}},
  {teamA_winning_chance: 0.44, teamA:{score: 11},teamB:{score: 8}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 7}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 8}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 9}},
  {teamA_winning_chance: 0.44, teamA:{score: 12},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 13},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 10}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 11}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 12}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 13}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 14}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 15}},
  {teamA_winning_chance: 0.44, teamA:{score: 14},teamB:{score: 16}}
];


import * as demo from "../export/game7.json" assert { type: "json" };
let game = demo.default[0];
console.log(game)
import * as demoTest from "../export/game8.json" assert { type: "json" };
let gameTest = demoTest.default;
//console.log(gameTest) 

// convert/setup our data
const trainingData = tf.tensor2d(stats.map(item => [
  isNaN(item.teamA.score / (item.teamA.score + item.teamB.score)) ? 0.5 : item.teamA.score / (item.teamA.score + item.teamB.score), item.teamA.score, item.teamB.score
]), [stats.length, 3])
const outputData = tf.tensor2d(stats.map(item => [
  //item.teamA.score, item.teamB.score,
  //isNaN(item.teamA.score / (item.teamA.score + item.teamB.score)) ? 0.5 : item.teamA.score / (item.teamA.score + item.teamB.score), item.teamA.score, item.teamB.score
  //item.teamA.score > item.teamB.score ? 1 : 0,
  //item.teamA.score = item.teamB.score ? 1 : 0,
  //item.teamA.score < item.teamB.score ? 1 : 0,
  isNaN(item.teamA.score / (item.teamA.score + item.teamB.score)) ? 0.5 : item.teamA.score / (item.teamA.score + item.teamB.score) > 0.5 ? 1 : 0,
  isNaN(item.teamA.score / (item.teamA.score + item.teamB.score)) ? 0.5 : item.teamA.score / (item.teamA.score + item.teamB.score) == 0.5 ? 1 : 0,
  isNaN(item.teamA.score / (item.teamA.score + item.teamB.score)) ? 0.5 : item.teamA.score / (item.teamA.score + item.teamB.score) < 0.5 ? 1 : 0
  //item.teamA.score > item.teamB.score)
  //item.teamA_winning_chance, item.teamA.score, item.teamB.score
  //item.teamA.score / (item.teamA.score + item.teamB.score) >= 0.5 ? 1 : 0,
  //item.teamA.score / (item.teamA.score + item.teamB.score) < 0.5 ? 0 : 1
  //item.teamA.score / item.teamB.score
]), [stats.length, 3])
const testingData = tf.tensor2d(statsTest.map(item => [
  isNaN(item.teamA.score / (item.teamA.score + item.teamB.score)) ? 0.5 : item.teamA.score / (item.teamA.score + item.teamB.score), item.teamA.score, item.teamB.score
]), [statsTest.length, 3]) 
/*
// convert/setup our data
const trainingData = tf.tensor2d(game.map(item => [
  item.teamA.score, item.teamB.score, item.teamA.playersAlive, item.teamB.playersAlive
]))
const outputData = tf.tensor2d(game.map(item => [
  //item.teamA.score, item.teamB.score,
  item.teamA.score / (item.teamA.score + item.teamB.score), 1-item.teamA.score / (item.teamA.score + item.teamB.score), item.teamA.playersAlive, item.teamB.playersAlive
  //item.teamA_winning_chance, item.teamA.score, item.teamB.score
  //item.teamA.score / (item.teamA.score + item.teamB.score) >= 0.5 ? 1 : 0,
  //item.teamA.score / (item.teamA.score + item.teamB.score) < 0.5 ? 0 : 1
  //item.teamA.score / item.teamB.score
]))
const testingData = tf.tensor2d(statsTest.map(item => [
  item.teamA.score, item.teamB.score, item.teamA.playersAlive, item.teamB.playersAlive
])) 
*/

// build neural network
const model = tf.sequential()

model.add(tf.layers.dense({
  inputShape: [3],
  activation: "sigmoid",
  units: 10,
}))
model.add(tf.layers.dense({
  inputShape: [10],
  activation: "sigmoid",
  units: 3,
}))
model.add(tf.layers.dense({
  activation: "sigmoid",
  units: 3,
}))
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(.06),
})
// train/fit our network
const startTime = Date.now()
model.fit(trainingData, outputData, {epochs: 1500})
  .then((history) => {
    //console.log(history)
    model.predict(testingData).print()
  })
// test network