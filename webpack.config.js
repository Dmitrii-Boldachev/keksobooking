const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/load.js",
    "./js/upload.js",
    "./js/card.js",
    "./js/map.js",
    "./js/move.js",
    "./js/pin.js",
    "./js/form.js",
    "./js/filter.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false

}
