export function getHoursMinutesSeconds(seconds:number) {
    // Handle negative or zero input
    if (seconds <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }
  
    const hours = Math.floor(seconds / 3600);
    const remainingSeconds = seconds % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const secondsLeft = remainingSeconds % 60;
  
    return { hours, minutes, seconds: secondsLeft };
  }