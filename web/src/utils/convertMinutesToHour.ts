export default function minutesToHours(minutes: any) {
  var hours = (minutes/60).toString().padStart(2,"0")
  minutes = (minutes % 60).toString().padStart(2,"0")

  return `${hours}:${minutes}`
}