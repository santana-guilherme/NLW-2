export default function timeToString(minutes: any) {
  console.log('Minutes', minutes)
  var hours = (Math.floor(minutes/60)).toString().padStart(2,"0")
  minutes = (minutes % 60).toString().padStart(2,"0")
  console.log(`final time: ${hours}:${minutes}`)
  return `${hours}:${minutes}`
}