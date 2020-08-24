const formatDate = date => {
  const dateArray = String(new Date(date)).split(" ")
  const formatedString = [dateArray[2], dateArray[1], dateArray[3]].join(" ")
  return formatedString
}

export default formatDate
