//@ts-check

const GOAL = `const GOAL = 'hello world';`;
let POP_SIZE = 100;
let SELECTION_RATE = 0.5;
let MUTATION_RATE = 0.004;

function evolve(minFit = 1, maxTime = Infinity) {
  const startTime = Date.now();
  // Initialize population
  let population = [...Array(POP_SIZE)].map(() => randomString(GOAL.length));
  // Evaluate fitness of each member of the population
  let fitnessScores = population.map((member) => evaluateFitness(member));

  // Keep evolving until we find a member of the population that matches the target code
  while (true) {
    // Select the fittest members of the population for breeding
    let matingPool = selectFittest(population, fitnessScores, SELECTION_RATE);
    // Breed the mating pool to produce a new generation
    let newGeneration = breed(matingPool, POP_SIZE);

    // Evaluate the fitness of the new generation
    fitnessScores = newGeneration.map((member) => evaluateFitness(member));
    const indexOfBest = fitnessScores.indexOf(Math.max(...fitnessScores));
    // console.log(newGeneration[indexOfBest]);
    if (Date.now() - startTime > maxTime * 1000) {
      return newGeneration[indexOfBest];
    }
    // Check if any member of the new generation matches the target code
    if (fitnessScores.some((score) => score >= minFit)) {
      // We found a match! Stop evolving and return the matching member
      let index = fitnessScores.indexOf(1);
      return newGeneration[index];
    } else {
      // No match found. Continue evolving by replacing the old population with the new generation
      population = newGeneration;
    }
  }
}

function randomString(length) {
  // Generate a random string of the specified length
  let result = "";
  let characters = [...new Set(GOAL.split(""))].join("");
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function evaluateFitness(member) {
  // Compare the member to the target code and return a fitness score (between 0 and 1)
  let score = 0;
  for (let i = 0; i < member.length; i++) {
    if (member.charAt(i) === GOAL.charAt(i)) {
      score++;
    }
  }
  return score / GOAL.length;
}

function selectFittest(population, fitnessScores, selectionRate) {
  // Select the fittest members of the population for breeding based on the fitness scores and selection rate
  let matingPool = [];
  for (let i = 0; i < population.length; i++) {
    if (Math.random() < selectionRate * fitnessScores[i]) {
      matingPool.push(population[i]);
    }
  }

  // If the mating pool is empty, use the entire population as the mating pool
  if (matingPool.length === 0) {
    matingPool = population;
  }

  return matingPool;
}

function breed(matingPool, size) {
  // Breed the mating pool to produce a new generation
  let newGeneration = [];
  while (newGeneration.length < size) {
    // Select two members of the mating pool at random
    let parent1 = matingPool[Math.floor(Math.random() * matingPool.length)];
    let parent2 = matingPool[Math.floor(Math.random() * matingPool.length)];

    // Generate two offspring by combining the parents using crossover
    let offspring1 = crossover(parent1, parent2);
    let offspring2 = crossover(parent2, parent1);

    // Mutate the offspring with a small probability
    offspring1 = mutate(offspring1);
    offspring2 = mutate(offspring2);

    // Add the offspring to the new generation
    newGeneration.push(offspring1);
    newGeneration.push(offspring2);
  }
  return newGeneration;
}

function crossover(parent1, parent2) {
  // Generate an offspring by combining the parents using crossover
  let offspring = "";
  for (let i = 0; i < parent1.length; i++) {
    if (Math.random() < 0.5) {
      offspring += parent1.charAt(i);
    } else {
      offspring += parent2.charAt(i);
    }
  }
  return offspring;
}

function mutate(offspring) {
  // Mutate the offspring with a small probability
  let result = "";
  for (let i = 0; i < offspring.length; i++) {
    if (Math.random() < MUTATION_RATE) {
      // Replace this character with a random character
      result += randomString(1);
    } else {
      result += offspring.charAt(i);
    }
  }
  return result;
}

function optimizeParameters() {
  let bestParams = {
    popSize: 500,
    selectionRate: 1,
    mutationRate: 0.01,
  };
  let bestTime = Infinity;
  let progress = 0;
  // Try a range of different values for POP_SIZE, SELECTION_RATE and MUTATION_RATE
  for (let popSize = 100; popSize <= 1000; popSize += 100) {
    for (let selectionRate = 0.1; selectionRate <= 2; selectionRate += 0.2) {
      for (
        let mutationRate = 0.001;
        mutationRate <= 0.1;
        mutationRate += 0.001
      ) {
        // Set the values of POP_SIZE, SELECTION_RATE and MUTATION_RATE
        POP_SIZE = popSize;
        SELECTION_RATE = selectionRate;
        MUTATION_RATE = mutationRate;

        // Run the evolve function and measure how long it takes to produce the target string
        let startTime = Date.now();
        let result = evolve(0.8, 10);
        let elapsedTime = Date.now() - startTime;
        progress += 0.01;
        console.log(progress + "%");
        // If this set of parameters produces the target string faster than the previous best, update the best parameters
        if (elapsedTime < bestTime) {
          bestTime = elapsedTime;
          bestParams = {
            popSize: popSize,
            selectionRate: selectionRate,
            mutationRate: mutationRate,
          };
        }
      }
    }
  }

  // Return the best set of parameters found
  return bestParams;
}

console.log(optimizeParameters());
// console.log(evolve());
