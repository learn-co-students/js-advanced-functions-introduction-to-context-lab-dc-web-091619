function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrOfArrs) {
  return arrOfArrs.map(employeeArray => createEmployeeRecord(employeeArray))
}

function createTimeInEvent(record, dateStamp) {
  const timeInEvent = {
    type: "TimeIn",
    date: dateStamp.split(" ")[0],
    hour: parseInt(dateStamp.split(" ")[1], 10)
  }
  record.timeInEvents.push(timeInEvent)
  return record
}

function createTimeOutEvent(record, dateStamp) {
  const timeOutEvent = {
    type: "TimeOut",
    date: dateStamp.split(" ")[0],
    hour: parseInt(dateStamp.split(" ")[1], 10)
  }
  record.timeOutEvents.push(timeOutEvent)
  return record
}

function hoursWorkedOnDate(record, dateGiven) {
  const timeIn = record.timeInEvents.find(event => event.date === dateGiven).hour
  const timeOut = record.timeOutEvents.find(event => event.date === dateGiven).hour

  return (timeOut - timeIn)/100
}

function wagesEarnedOnDate(record, dateGiven) {
  return hoursWorkedOnDate(record, dateGiven) * record.payPerHour
}

function allWagesFor(record) {
  const allDates = record.timeInEvents.map(event => event.date)
  return allDates.reduce((total, date) => total += wagesEarnedOnDate(record, date), 0)
}

function findEmployeeByFirstName(employeeArray, firstname) {
  return employeeArray.find(employeeRecord => employeeRecord.firstName === firstname)
}

function calculatePayroll(employeeArray) {
  return employeeArray.reduce((total, employeeRecord) => total += allWagesFor(employeeRecord), 0)
}