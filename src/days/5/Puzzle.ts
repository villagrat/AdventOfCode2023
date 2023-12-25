const first = (input: string) => {
  /*
      --- Info ---
      - Solve a food production problem that's related to interpreting a food almanac
      
      --- Key takeaways ---
      - The almanac lists all the seeds that need to be planted
      - For each seed it also lists
        - The type of soil needed for the seed
        - The type of fertilizer for the soil
        - The type of water for the fertilizer
        - etc.
      - Each type of seed, soil, fertilizer, water, etc. is identified by a number
      - Numbers are reused by each category ~ ie: soil 123 and fertilizer 123 are not related to each other

      --- Calculated value ---
      - The gardener and his team want to know the closest location that needs a seed
      - Find the lowest location number that correspond to any of the initial seeds
      - You'll need to convert each seed number into its corresponding location number
      Full processing of the input:
      - Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
      - Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
      - Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
      - Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.

      The lowest location number in the example is 35

      --- Eg: ---
      seeds: 79 14 55 13

      seed-to-soil map:
      50 98 2
      52 50 48

      soil-to-fertilizer map:
      0 15 37
      37 52 2
      39 0 15

      fertilizer-to-water map:
      49 53 8
      0 11 42
      42 0 7
      57 7 4

      water-to-light map:
      88 18 7
      18 25 70

      light-to-temperature map:
      45 77 23
      81 45 19
      68 64 13

      temperature-to-humidity map:
      0 69 1
      1 0 69

      humidity-to-location map:
      60 56 37
      56 93 4

      
      Expected Sol:
      - Input starts w/ list of seeds that need to be planted: [79, 14, 55, 13]
      - The rest of the input is a list of maps that describe how to convert numbers from a [source_category] into a [destination_category]
      - ie: our seed-to-soil map tells us how to convert a seed number (source) into a soil number (destination)
      - The source-to-destination Maps describe entire ranges of numbers that can be converted
      - Each line within a map contains three numbers: [destination_range_start, source_range_start, range_length]
      - Eg: 
        seed-to-soil map:
        50 98 2
        52 50 48

        ^ Line 1: desination_range_start: 50, source_range_start: 98, range_length: 2
          ie: destination_range: [50, 51], source_range: [98, 99]
          ie: Seed number 98 corresponds to soil numbers 50 and Seed number 99 corresponds to soil number 51
          NB: MAPPING IS ONE-TO-ONE

          Line 2: desination_range_start: 52, source_range_start: 50, range_length: 48
          ie: destination_range: [52, 99], source_range: [50, 97]
          ie: Seed numbers 50-97 correspond to soil numbers 52-99

        Any source numbers that aren't mapped, correspond to the same number in the destination number
        ie: seed number 10 corresponds to soil number 10

        Having processed the seed-to-soil map, the result is:
        seed  soil
        0     0      <--- unmapped so same
        1     1
        ...   ...
        48    48
        49    49     <--- unmapped so same
        50    52     <--- seed number 50 corresponds to soil number 52
        51    53          and so on...
        ...   ...
        96    98
        97    99
        98    50     <--- seed number 98 corresponds to soil number 50
        99    51     <--- seed number 99 corresponds to soil number 51

      Having the processed seed-to-soil map
      We can look up the soil n° required for each of the seeds that need to be planted
      - Seed number 79 corresponds to soil number 81.
      - Seed number 14 corresponds to soil number 14.
      - Seed number 55 corresponds to soil number 57.
      - Seed number 13 corresponds to soil number 13.

      Full processing of the input:
      - Seed 79, soil 81, fertilizer 81, water 81, light 74, temperature 78, humidity 78, location 82.
      - Seed 14, soil 14, fertilizer 53, water 49, light 42, temperature 42, humidity 43, location 43.
      - Seed 55, soil 57, fertilizer 57, water 53, light 46, temperature 82, humidity 82, location 86.
      - Seed 13, soil 13, fertilizer 52, water 41, light 34, temperature 34, humidity 35, location 35.
      */
  let startIdx = 0;
  let result = 0;
  let lowestLocation = Infinity;
  let seeds: number[] = [];
  const seedToSoilRanges: { start: number; end: number; offset: number }[] = [];
  const soilToFertilizerRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const fertilizerToWaterRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const waterToLightRanges: { start: number; end: number; offset: number }[] =
    [];
  const lightToTemperatureRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const temperatureToHumidityRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const humidityToLocationRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  let processingSeedToSoilMap = false;
  let processingSoilToFertilizerMap = false;
  let processingFertilizerToWaterMap = false;
  let processingWaterToLightMap = false;
  let processingLightToTemperatureMap = false;
  let processingTemperatureToHumidityMap = false;
  let processingHumidityToLocationMap = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i);
      if (line.startsWith("seeds")) {
        seeds = line.split(" ").slice(1).map(Number);
        // console.log("seeds: ", seeds);
      } else if (line.startsWith("seed-to-soil map:")) {
        // console.log("will start processing seed to soil map...");
        processingSeedToSoilMap = true;
      } else if (processingSeedToSoilMap && line.match(/\d/)) {
        const [soilRangeStart, seedRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        seedToSoilRanges.push({
          start: seedRangeStart,
          end: seedRangeStart + rangeLength,
          offset: soilRangeStart - seedRangeStart,
        });
      } else if (line.startsWith("soil-to-fertilizer map:")) {
        processingSeedToSoilMap = false;
        processingSoilToFertilizerMap = true;
        // console.log("seed to soil map finished processing...");
        // console.log("Seed to Soil Map:");
        // for (const seed of seeds) {
        //   const range = seedToSoilRanges.find(
        //     (r) => r.start <= seed && r.end > seed
        //   );
        //   const soil = range ? seed + range.offset : seed;
        //   console.log(`Seed ${seed} -> Soil ${soil}`);
        // }
      } else if (processingSoilToFertilizerMap && line.match(/\d/)) {
        const [fertilizerRangeStart, soilRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        soilToFertilizerRanges.push({
          start: soilRangeStart,
          end: soilRangeStart + rangeLength,
          offset: fertilizerRangeStart - soilRangeStart,
        });
      } else if (line.startsWith("fertilizer-to-water map:")) {
        processingSoilToFertilizerMap = false;
        processingFertilizerToWaterMap = true;
        // console.log("soil to fertilizer map finished processing...");
        // console.log("Soil to Fertilizer Map:");
        // for (const seed of seeds) {
        //   const soilRange = seedToSoilRanges.find(
        //     (r) => r.start <= seed && r.end > seed
        //   );
        //   const soil = soilRange ? seed + soilRange.offset : seed;
        //   const fertilizerRange = soilToFertilizerRanges.find(
        //     (r) => r.start <= soil && r.end > soil
        //   );
        //   const fertilizer = fertilizerRange
        //     ? soil + fertilizerRange.offset
        //     : soil;
        //   console.log(
        //     `Seed ${seed} -> Soil ${soil} -> Fertilizer ${fertilizer}`
        //   );
        // }
      } else if (processingFertilizerToWaterMap && line.match(/\d/)) {
        const [waterRangeStart, fertilizerRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        fertilizerToWaterRanges.push({
          start: fertilizerRangeStart,
          end: fertilizerRangeStart + rangeLength,
          offset: waterRangeStart - fertilizerRangeStart,
        });
      } else if (line.startsWith("water-to-light map:")) {
        processingFertilizerToWaterMap = false;
        processingWaterToLightMap = true;
        // console.log("fertilizer to water map finished processing...");
        // console.log("Fertilizer to Water Map:");
        // for (const seed of seeds) {
        //   const soilRange = seedToSoilRanges.find(
        //     (r) => r.start <= seed && r.end > seed
        //   );
        //   const soil = soilRange ? soilRange.offset + seed : seed;

        //   const fertilizerRange = soilToFertilizerRanges.find(
        //     (r) => r.start <= soil && r.end > soil
        //   );
        //   const fertilizer = fertilizerRange
        //     ? fertilizerRange.offset + soil
        //     : soil;

        //   const waterRange = fertilizerToWaterRanges.find(
        //     (r) => r.start <= fertilizer && r.end > fertilizer
        //   );
        //   const water = waterRange
        //     ? waterRange.offset + fertilizer
        //     : fertilizer;
        //   console.log(
        //     `Seed ${seed} -> Soil ${soil} -> Fertilizer ${fertilizer} -> Water ${water}`
        //   );
        // }
      } else if (processingWaterToLightMap && line.match(/\d/)) {
        const [lightRangeStart, waterRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        waterToLightRanges.push({
          start: waterRangeStart,
          end: waterRangeStart + rangeLength,
          offset: lightRangeStart - waterRangeStart,
        });
      } else if (line.startsWith("light-to-temperature map:")) {
        processingWaterToLightMap = false;
        processingLightToTemperatureMap = true;
        // console.log("water to light map finished processing...");
        // console.log("Water to Light Map:");
        // for (const seed of seeds) {
        //   const soilRange = seedToSoilRanges.find(
        //     (r) => r.start <= seed && r.end > seed
        //   );
        //   const soil = soilRange ? soilRange.offset + seed : seed;

        //   const fertilizerRange = soilToFertilizerRanges.find(
        //     (r) => r.start <= soil && r.end > soil
        //   );
        //   const fertilizer = fertilizerRange
        //     ? fertilizerRange.offset + soil
        //     : soil;

        //   const waterRange = fertilizerToWaterRanges.find(
        //     (r) => r.start <= fertilizer && r.end > fertilizer
        //   );
        //   const water = waterRange
        //     ? waterRange.offset + fertilizer
        //     : fertilizer;

        //   const lightRange = waterToLightRanges.find(
        //     (r) => r.start <= water && r.end > water
        //   );
        //   const light = lightRange ? lightRange.offset + water : water;
        //   console.log(
        //     `Seed ${seed} -> Soil ${soil} -> Fertilizer ${fertilizer} -> Water ${water} -> Light ${light}`
        //   );
        // }
      } else if (processingLightToTemperatureMap && line.match(/\d/)) {
        const [temperatureRangeStart, lightRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        lightToTemperatureRanges.push({
          start: lightRangeStart,
          end: lightRangeStart + rangeLength,
          offset: temperatureRangeStart - lightRangeStart,
        });
      } else if (line.startsWith("temperature-to-humidity map:")) {
        processingLightToTemperatureMap = false;
        processingTemperatureToHumidityMap = true;
        // console.log("light to temperature map finished processing...");
        // console.log("Light to Temperature Map:");
        // for (const seed of seeds) {
        //   const soilRange = seedToSoilRanges.find(
        //     (r) => r.start <= seed && r.end > seed
        //   );
        //   const soil = soilRange ? soilRange.offset + seed : seed;

        //   const fertilizerRange = soilToFertilizerRanges.find(
        //     (r) => r.start <= soil && r.end > soil
        //   );
        //   const fertilizer = fertilizerRange
        //     ? fertilizerRange.offset + soil
        //     : soil;

        //   const waterRange = fertilizerToWaterRanges.find(
        //     (r) => r.start <= fertilizer && r.end > fertilizer
        //   );
        //   const water = waterRange
        //     ? waterRange.offset + fertilizer
        //     : fertilizer;

        //   const lightRange = waterToLightRanges.find(
        //     (r) => r.start <= water && r.end > water
        //   );
        //   const light = lightRange ? lightRange.offset + water : water;

        //   const temperatureRange = lightToTemperatureRanges.find(
        //     (r) => r.start <= light && r.end > light
        //   );
        //   const temperature = temperatureRange
        //     ? temperatureRange.offset + light
        //     : light;
        //   console.log(
        //     `Seed ${seed} -> Soil ${soil} -> Fertilizer ${fertilizer} -> Water ${water} -> Light ${light} -> Temperature ${temperature}`
        //   );
        // }
      } else if (processingTemperatureToHumidityMap && line.match(/\d/)) {
        const [humidityRangeStart, temperatureRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        temperatureToHumidityRanges.push({
          start: temperatureRangeStart,
          end: temperatureRangeStart + rangeLength,
          offset: humidityRangeStart - temperatureRangeStart,
        });
      } else if (line.startsWith("humidity-to-location map:")) {
        processingTemperatureToHumidityMap = false;
        processingHumidityToLocationMap = true;
        // console.log("temperature to humidity map finished processing...");
        // console.log("Temperature to Humidity Map:");
        // for (const seed of seeds) {
        //   const soilRange = seedToSoilRanges.find(
        //     (r) => r.start <= seed && r.end > seed
        //   );
        //   const soil = soilRange ? soilRange.offset + seed : seed;

        //   const fertilizerRange = soilToFertilizerRanges.find(
        //     (r) => r.start <= soil && r.end > soil
        //   );
        //   const fertilizer = fertilizerRange
        //     ? fertilizerRange.offset + soil
        //     : soil;

        //   const waterRange = fertilizerToWaterRanges.find(
        //     (r) => r.start <= fertilizer && r.end > fertilizer
        //   );
        //   const water = waterRange
        //     ? waterRange.offset + fertilizer
        //     : fertilizer;

        //   const lightRange = waterToLightRanges.find(
        //     (r) => r.start <= water && r.end > water
        //   );
        //   const light = lightRange ? lightRange.offset + water : water;

        //   const temperatureRange = lightToTemperatureRanges.find(
        //     (r) => r.start <= light && r.end > light
        //   );
        //   const temperature = temperatureRange
        //     ? temperatureRange.offset + light
        //     : light;
        //   const humidityRange = temperatureToHumidityRanges.find(
        //     (r) => r.start <= temperature && r.end > temperature
        //   );
        //   const humidity = humidityRange
        //     ? humidityRange.offset + temperature
        //     : temperature;
        //   console.log(
        //     `Seed ${seed} -> Soil ${soil} -> Fertilizer ${fertilizer} -> Water ${water} -> Light ${light} -> Temperature ${temperature} -> Humidity ${humidity}`
        //   );
        // }
      } else if (processingHumidityToLocationMap && line.match(/\d/)) {
        const [locationRangeStart, humidityRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        humidityToLocationRanges.push({
          start: humidityRangeStart,
          end: humidityRangeStart + rangeLength,
          offset: locationRangeStart - humidityRangeStart,
        });

        // console.log("humidity to location map finished processing...");
        // console.log("Humidity to Location Map:");
        for (const seed of seeds) {
          const soilRange = seedToSoilRanges.find(
            (r) => r.start <= seed && r.end > seed
          );
          const soil = soilRange ? soilRange.offset + seed : seed;

          const fertilizerRange = soilToFertilizerRanges.find(
            (r) => r.start <= soil && r.end > soil
          );
          const fertilizer = fertilizerRange
            ? fertilizerRange.offset + soil
            : soil;

          const waterRange = fertilizerToWaterRanges.find(
            (r) => r.start <= fertilizer && r.end > fertilizer
          );
          const water = waterRange
            ? waterRange.offset + fertilizer
            : fertilizer;

          const lightRange = waterToLightRanges.find(
            (r) => r.start <= water && r.end > water
          );
          const light = lightRange ? lightRange.offset + water : water;

          const temperatureRange = lightToTemperatureRanges.find(
            (r) => r.start <= light && r.end > light
          );
          const temperature = temperatureRange
            ? temperatureRange.offset + light
            : light;
          const humidityRange = temperatureToHumidityRanges.find(
            (r) => r.start <= temperature && r.end > temperature
          );
          const humidity = humidityRange
            ? humidityRange.offset + temperature
            : temperature;

          const locationRange = humidityToLocationRanges.find(
            (r) => r.start <= humidity && r.end > humidity
          );
          const location = locationRange
            ? locationRange.offset + humidity
            : humidity;
          if (location < lowestLocation) {
            lowestLocation = location;
          }
          // console.log(
          //   `Seed ${seed} -> Soil ${soil} -> Fertilizer ${fertilizer} -> Water ${water} -> Light ${light} -> Temperature ${temperature} -> Humidity ${humidity} -> Location ${location}`
          // );
        }
      }
      startIdx = i + 1;
    }
    // console.log("");
    // console.log("-------------------------------------------------------------------------------------------------------------------------------");
  }

  // console.log("Lowest location number: ", lowestLocation);
  // console.log("result: ", result)
  return result;
};

// 157211394
// 1577355743 too high
const expectedFirstSolution = "157211394";

const second = (input: string) => {
  /*
      --- Info ---
      - Everyone will starve if you plant such a small number of seeds
      - It looks like the initial 'seeds' line actually describes ranges of seed numbers
      - The values on the initial seeds line come in pairs - [start, range_length]
      - Eg: 
        seeds: 79 14 55 13
        Two ranges of seeds to be planted
        - [79, 14] ie: seed numbers 79-92
        - [55, 13] ie: seed numbers 55-67

        So.. instead of planting 4 seeds, we need to plant 14 + 13 = 27 seeds

      --- Key takeaways ---
      -

      --- Calculated value ---
      -

      --- Eg: ---

      Expected Sol:

      */
  let startIdx = 0;
  let result = 0;
  let lowestLocation = Infinity;
  let seeds: number[] = [];
  const seedToSoilRanges: { start: number; end: number; offset: number }[] = [];
  const soilToFertilizerRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const fertilizerToWaterRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const waterToLightRanges: { start: number; end: number; offset: number }[] =
    [];
  const lightToTemperatureRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const temperatureToHumidityRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  const humidityToLocationRanges: {
    start: number;
    end: number;
    offset: number;
  }[] = [];
  let processingSeedToSoilMap = false;
  let processingSoilToFertilizerMap = false;
  let processingFertilizerToWaterMap = false;
  let processingWaterToLightMap = false;
  let processingLightToTemperatureMap = false;
  let processingTemperatureToHumidityMap = false;
  let processingHumidityToLocationMap = false;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "\n" || i === input.length - 1) {
      const line = input.slice(startIdx, i);
      if (line.startsWith("seeds")) {
        const seedRanges = line.split(" ").slice(1).map(Number);
        for (let i = 0; i < seedRanges.length; i += 2) {
          const start = seedRanges[i];
          const length = seedRanges[i + 1];
          for (let j = start; j < start + length; j++) {
            seeds.push(j);
          }
        }
        // console.log("seeds: ", seeds);
      } else if (line.startsWith("seed-to-soil map:")) {
        // console.log("will start processing seed to soil map...");
        processingSeedToSoilMap = true;
      } else if (processingSeedToSoilMap && line.match(/\d/)) {
        const [soilRangeStart, seedRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        seedToSoilRanges.push({
          start: seedRangeStart,
          end: seedRangeStart + rangeLength,
          offset: soilRangeStart - seedRangeStart,
        });
      } else if (line.startsWith("soil-to-fertilizer map:")) {
        processingSeedToSoilMap = false;
        processingSoilToFertilizerMap = true;
        // console.log("seed to soil map finished processing...");
        // console.log("Seed to Soil Map:");
      } else if (processingSoilToFertilizerMap && line.match(/\d/)) {
        const [fertilizerRangeStart, soilRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        soilToFertilizerRanges.push({
          start: soilRangeStart,
          end: soilRangeStart + rangeLength,
          offset: fertilizerRangeStart - soilRangeStart,
        });
      } else if (line.startsWith("fertilizer-to-water map:")) {
        processingSoilToFertilizerMap = false;
        processingFertilizerToWaterMap = true;
        // console.log("soil to fertilizer map finished processing...");
        // console.log("Soil to Fertilizer Map:");
      } else if (processingFertilizerToWaterMap && line.match(/\d/)) {
        const [waterRangeStart, fertilizerRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        fertilizerToWaterRanges.push({
          start: fertilizerRangeStart,
          end: fertilizerRangeStart + rangeLength,
          offset: waterRangeStart - fertilizerRangeStart,
        });
      } else if (line.startsWith("water-to-light map:")) {
        processingFertilizerToWaterMap = false;
        processingWaterToLightMap = true;
        // console.log("fertilizer to water map finished processing...");
        // console.log("Fertilizer to Water Map:");
      } else if (processingWaterToLightMap && line.match(/\d/)) {
        const [lightRangeStart, waterRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        waterToLightRanges.push({
          start: waterRangeStart,
          end: waterRangeStart + rangeLength,
          offset: lightRangeStart - waterRangeStart,
        });
      } else if (line.startsWith("light-to-temperature map:")) {
        processingWaterToLightMap = false;
        processingLightToTemperatureMap = true;
        // console.log("water to light map finished processing...");
        // console.log("Water to Light Map:");
      } else if (processingLightToTemperatureMap && line.match(/\d/)) {
        const [temperatureRangeStart, lightRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        lightToTemperatureRanges.push({
          start: lightRangeStart,
          end: lightRangeStart + rangeLength,
          offset: temperatureRangeStart - lightRangeStart,
        });
      } else if (line.startsWith("temperature-to-humidity map:")) {
        processingLightToTemperatureMap = false;
        processingTemperatureToHumidityMap = true;
        // console.log("light to temperature map finished processing...");
        // console.log("Light to Temperature Map:");
      } else if (processingTemperatureToHumidityMap && line.match(/\d/)) {
        const [humidityRangeStart, temperatureRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        temperatureToHumidityRanges.push({
          start: temperatureRangeStart,
          end: temperatureRangeStart + rangeLength,
          offset: humidityRangeStart - temperatureRangeStart,
        });
      } else if (line.startsWith("humidity-to-location map:")) {
        processingTemperatureToHumidityMap = false;
        processingHumidityToLocationMap = true;
        // console.log("temperature to humidity map finished processing...");
        // console.log("Temperature to Humidity Map:");
      } else if (processingHumidityToLocationMap && line.match(/\d/)) {
        const [locationRangeStart, humidityRangeStart, rangeLength] = line
          .split(" ")
          .map(Number);
        humidityToLocationRanges.push({
          start: humidityRangeStart,
          end: humidityRangeStart + rangeLength,
          offset: locationRangeStart - humidityRangeStart,
        });

        // console.log("humidity to location map finished processing...");
        // console.log("Humidity to Location Map:");
        for (const seed of seeds) {
          const soilRange = seedToSoilRanges.find(
            (r) => r.start <= seed && r.end > seed
          );
          const soil = soilRange ? soilRange.offset + seed : seed;

          const fertilizerRange = soilToFertilizerRanges.find(
            (r) => r.start <= soil && r.end > soil
          );
          const fertilizer = fertilizerRange
            ? fertilizerRange.offset + soil
            : soil;

          const waterRange = fertilizerToWaterRanges.find(
            (r) => r.start <= fertilizer && r.end > fertilizer
          );
          const water = waterRange
            ? waterRange.offset + fertilizer
            : fertilizer;

          const lightRange = waterToLightRanges.find(
            (r) => r.start <= water && r.end > water
          );
          const light = lightRange ? lightRange.offset + water : water;

          const temperatureRange = lightToTemperatureRanges.find(
            (r) => r.start <= light && r.end > light
          );
          const temperature = temperatureRange
            ? temperatureRange.offset + light
            : light;
          const humidityRange = temperatureToHumidityRanges.find(
            (r) => r.start <= temperature && r.end > temperature
          );
          const humidity = humidityRange
            ? humidityRange.offset + temperature
            : temperature;

          const locationRange = humidityToLocationRanges.find(
            (r) => r.start <= humidity && r.end > humidity
          );
          const location = locationRange
            ? locationRange.offset + humidity
            : humidity;
          if (location < lowestLocation) {
            lowestLocation = location;
          }
          console.log(
            `Seed ${seed} -> Soil ${soil} -> Fertilizer ${fertilizer} -> Water ${water} -> Light ${light} -> Temperature ${temperature} -> Humidity ${humidity} -> Location ${location}`
          );
        }
      }
      startIdx = i + 1;
    }
    // console.log("");
    // console.log("-------------------------------------------------------------------------------------------------------------------------------");
  }

  console.log("Lowest location number: ", lowestLocation);
  // console.log("result: ", result)
  return result;
};

const expectedSecondSolution = "solution 2";

export { first, expectedFirstSolution, second, expectedSecondSolution };
