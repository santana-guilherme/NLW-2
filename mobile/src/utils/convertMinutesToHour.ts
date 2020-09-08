export default function timeToString(minutes: any) {
  var hours = (Math.floor(minutes/60)).toString().padStart(2,"0")
  minutes = (minutes % 60).toString().padStart(2,"0")
  return `${hours}:${minutes}`
}