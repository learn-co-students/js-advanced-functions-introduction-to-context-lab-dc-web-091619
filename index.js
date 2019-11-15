let createEmployeeRecord = (array) => {
  return {
    firstName: array[0],
    familyName: array[1], 
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}


let createEmployeeRecords = (array) => {
  let employeeRecords = []

  array.forEach(function(subArray){
    employeeRecords.push(createEmployeeRecord(subArray))
  })

  return employeeRecords
}

let createTimeInEvent = (record, dateTime) => {
  let [date, time] = dateTime.split(" ")

  record.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(time, 10)
  })

  return record
}

let createTimeOutEvent = (record, dateTime) => {
  let [date, time] = dateTime.split(" ")

  record.timeOutEvents.push( {
    type: "TimeOut",
    date: date, 
    hour: parseInt(time, 10)
  } )

  return record
}

let hoursWorkedOnDate = (record, givenDate) => {
//   let hoursWorked = []

//   record.timeOutEvents.forEach( function(day) {
//     if (day.date === date) { 
//       hoursWorked.push(day.hour) 
//     }
//   } )

//   record.timeInEvents.forEach( function(day){
//     if (day.date === date) {
//       hoursWorked.push(day.hour)
//     }
//   } )

//   return (hoursWorked[0] - hoursWorked[1])/100
// }

let timeInEvent = record.timeInEvents.find( function(event) {
  return event.date === givenDate
} )

let timeOutEvent = record.timeOutEvents.find( function(event){
  return event.date === givenDate
} )

return (timeOutEvent.hour - timeInEvent.hour) / 100
}


function wagesEarnedOnDate(record, givenDate){
  let hours = hoursWorkedOnDate(record, givenDate)

  return hours * record.payPerHour
}

function allWagesFor(record){
  let allWages = 0

  record.timeInEvents.forEach( function(event){
    let date = event.date
    allWages += wagesEarnedOnDate(record, date)
  } )

  return allWages
}

function calculatePayroll(employeesArray){
  // let payroll = 0
  
  // employeesArray.forEach( employee => {
  //   payroll += allWagesFor(employee)
  // } )

  // return payroll
   return employeesArray.reduce( function(memo, el) {
    return memo + allWagesFor(el)
  }, 0 )
}

function findEmployeeByFirstName(employeesArray, givenFirstName) {
  return employeesArray.find( function(employee) {
    return employee.firstName === givenFirstName
  } )
}










var today = "2019-11-15"
var byronPoodle = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
createTimeInEvent(byronPoodle, "2019-11-15 0900")
createTimeOutEvent(byronPoodle, "2019-11-15 1700")

