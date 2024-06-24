export const benchmark = {
  startTime: new Date(),
  endTime: new Date(),
  duration: 0,
  seconds: 0,
  minutes: 0,
  start() {
    this.startTime = new Date();
  },
  end() {
    this.endTime = new Date();
    this.duration = this.endTime.getTime() - this.startTime.getTime();
    this.seconds = this.duration / 1000;
    this.minutes = this.seconds / 60;
    return {
      duration: this.duration,
      seconds: this.seconds,
      minutes: this.minutes,
    };
  },
};
