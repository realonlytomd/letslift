// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Workout A
    workoutA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Exercise One of Workout A
    exerciseOneofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightOneofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise One of Workout A
    setsOneofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise One of Workout A
    repsOneofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Two of Workout A
    exerciseTwoofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTwoofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Two of Workout A
    setsTwoofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Two of Workout A
    repsTwoofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Three of Workout A
    exerciseThreeofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightThreeofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Three of Workout A
    setsThreeofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Three of Workout A
    repsThreeofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Four of Workout A
    exerciseFourofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFourofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Four of Workout A
    setsFourofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Four of Workout A
    repsFourofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Five of Workout A
    exerciseFiveofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFiveofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Five of Workout A
    setsFiveofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Five of Workout A
    repsFiveofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Six of Workout A
    exerciseSixofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSixofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Six of Workout A
    setsSixofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Six of Workout A
    repsSixofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Seven of Workout A
    exerciseSevenofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSevenofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Seven of Workout A
    setsSevenofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Seven of Workout A
    repsSevenofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Eight of Workout A
    exerciseEightofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightEightofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Eight of Workout A
    setsEightofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Eight of Workout A
    repsEightofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Nine of Workout A
    exerciseNineofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightNineofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Nine of Workout A
    setsNineofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Nine of Workout A
    repsNineofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Ten of Workout A
    exerciseTenofA: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTenofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Ten of Workout A
    setsTenofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Ten of Workout A
    repsTenofA: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Workout B
    workoutB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Exercise One of Workout B
    exerciseOneofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightOneofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise One of Workout B
    setsOneofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise One of Workout B
    repsOneofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Two of Workout B
    exerciseTwoofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTwoofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Two of Workout B
    setsTwoofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Two of Workout B
    repsTwoofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Three of Workout B
    exerciseThreeofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightThreeofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Three of Workout B
    setsThreeofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Three of Workout B
    repsThreeofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Four of Workout B
    exerciseFourofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFourofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Four of Workout B
    setsFourofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Four of Workout B
    repsFourofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Five of Workout B
    exerciseFiveofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFiveofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Five of Workout B
    setsFiveofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Five of Workout B
    repsFiveofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Six of Workout B
    exerciseSixofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSixofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Six of Workout B
    setsSixofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Six of Workout B
    repsSixofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Seven of Workout B
    exerciseSevenofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSevenofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Seven of Workout B
    setsSevenofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Seven of Workout B
    repsSevenofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Eight of Workout B
    exerciseEightofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightEightofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Eight of Workout B
    setsEightofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Eight of Workout B
    repsEightofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Nine of Workout B
    exerciseNineofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightNineofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Nine of Workout B
    setsNineofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Nine of Workout B
    repsNineofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Ten of Workout B
    exerciseTenofB: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTenofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Ten of Workout B
    setsTenofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Ten of Workout B
    repsTenofB: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Workout C
    workoutC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Exercise One of Workout C
    exerciseOneofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightOneofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise One of Workout C
    setsOneofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise One of Workout C
    repsOneofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Two of Workout C
    exerciseTwoofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTwoofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Two of Workout C
    setsTwoofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Two of Workout C
    repsTwoofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Three of Workout C
    exerciseThreeofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightThreeofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Three of Workout C
    setsThreeofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Three of Workout C
    repsThreeofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Four of Workout C
    exerciseFourofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFourofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Four of Workout C
    setsFourofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Four of Workout C
    repsFourofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Five of Workout C
    exerciseFiveofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFiveofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Five of Workout C
    setsFiveofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Five of Workout C
    repsFiveofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Six of Workout C
    exerciseSixofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSixofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Six of Workout C
    setsSixofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Six of Workout C
    repsSixofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Seven of Workout C
    exerciseSevenofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSevenofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Seven of Workout C
    setsSevenofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Seven of Workout C
    repsSevenofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Eight of Workout C
    exerciseEightofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightEightofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Eight of Workout C
    setsEightofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Eight of Workout C
    repsEightofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Nine of Workout C
    exerciseNineofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightNineofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Nine of Workout C
    setsNineofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Nine of Workout C
    repsNineofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Ten of Workout C
    exerciseTenofC: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTenofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Ten of Workout C
    setsTenofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Ten of Workout C
    repsTenofC: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Workout D
    workoutD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Exercise One of Workout D
    exerciseOneofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightOneofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise One of Workout D
    setsOneofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise One of Workout D
    repsOneofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Two of Workout D
    exerciseTwoofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTwoofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Two of Workout D
    setsTwoofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Two of Workout D
    repsTwoofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Three of Workout D
    exerciseThreeofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightThreeofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Three of Workout D
    setsThreeofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Three of Workout D
    repsThreeofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Four of Workout D
    exerciseFourofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFourofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Four of Workout D
    setsFourofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Four of Workout D
    repsFourofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Five of Workout D
    exerciseFiveofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFiveofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Five of Workout D
    setsFiveofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Five of Workout D
    repsFiveofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Six of Workout D
    exerciseSixofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSixofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Six of Workout D
    setsSixofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Six of Workout D
    repsSixofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Seven of Workout D
    exerciseSevenofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSevenofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Seven of Workout D
    setsSevenofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Seven of Workout D
    repsSevenofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Eight of Workout D
    exerciseEightofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightEightofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Eight of Workout D
    setsEightofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Eight of Workout D
    repsEightofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Nine of Workout D
    exerciseNineofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightNineofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Nine of Workout D
    setsNineofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Nine of Workout D
    repsNineofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Ten of Workout D
    exerciseTenofD: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTenofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Ten of Workout D
    setsTenofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Ten of Workout D
    repsTenofD: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Workout E
    workoutE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // Exercise One of Workout E
    exerciseOneofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightOneofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise One of Workout E
    setsOneofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise One of Workout E
    repsOneofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Two of Workout E
    exerciseTwoofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTwoofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Two of Workout E
    setsTwoofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Two of Workout E
    repsTwoofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Three of Workout E
    exerciseThreeofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightThreeofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Three of Workout E
    setsThreeofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Three of Workout E
    repsThreeofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Four of Workout E
    exerciseFourofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFourofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Four of Workout E
    setsFourofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Four of Workout E
    repsFourofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Five of Workout E
    exerciseFiveofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightFiveofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Five of Workout E
    setsFiveofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Five of Workout E
    repsFiveofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Six of Workout E
    exerciseSixofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSixofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Six of Workout E
    setsSixofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Six of Workout E
    repsSixofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Seven of Workout E
    exerciseSevenofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightSevenofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Seven of Workout E
    setsSevenofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Seven of Workout E
    repsSevenofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Eight of Workout E
    exerciseEightofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightEightofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Eight of Workout E
    setsEightofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Eight of Workout E
    repsEightofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Nine of Workout E
    exerciseNineofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightNineofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Nine of Workout E
    setsNineofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Nine of Workout E
    repsNineofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Exercise Ten of Workout E
    exerciseTenofE: {
      type: DataTypes.STRING,
      allowNull: true
    },
    // The Weight in pounds to be used during the exercise
    weightTenofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Sets of Exercise Ten of Workout E
    setsTenofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    // Number of Reps for each Set of Exercise Ten of Workout E
    repsTenofE: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};
