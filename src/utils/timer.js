let startTime;
let endTime;

  export function begin() {
  startTime = new Date();
  console.log("startTime", startTime);
  };

  export function end() {
  endTime = new Date();
  let timeDiff = endTime - startTime;
  timeDiff /= 1000;
  let seconds = Math.round(timeDiff);
    return seconds;
}