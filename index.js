// Your code here
function createEmployeeRecord(employeeArray) {
    let employeeObj = {firstName: employeeArray[0], familyName:employeeArray[1], title: employeeArray[2], payPerHour: employeeArray[3], timeInEvents: [], timeOutEvents: []}
    return employeeObj
}

function createEmployeeRecords(arrayOfarrays) {
    return arrayOfarrays.map(employee => {
        return createEmployeeRecord(employee)
        })
    }
function createTimeInEvent(employeeObj,timeInStr) {
   let [date,hour] = timeInStr.split(' ')

 employeeObj.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour,10),
    date: date,

})

return employeeObj

}

function createTimeOutEvent(employeeObj,timeOutStr) {
    let [date, hour] = timeOutStr.split(' ')

    employeeObj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(hour, 10),
        date: date,

    })
    return employeeObj
}

function hoursWorkedOnDate(employeeObj, soughtDate){
    let timeInDate = employeeObj.timeInEvents.find(timeIn => {
        return timeIn.date === soughtDate})
    let timeOutDate = employeeObj.timeOutEvents.find(timeOut => {
        return timeOut.date === soughtDate})
    return (timeOutDate.hour - timeInDate.hour) / 100
}

function wagesEarnedOnDate(employeeObj, soughtDate) {
    let rawWage = hoursWorkedOnDate(employeeObj,soughtDate) * employeeObj.payPerHour
    return parseFloat(rawWage.toString())
}

let allWagesFor = function(employeeObj){
    let eligibleDates = employeeObj.timeInEvents.map(timeIn =>{
        return timeIn.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeObj, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName(arrayOfRecords,firstNameStr){
   let employee =  arrayOfRecords.find(employeeObj => {
        return employeeObj.firstName === firstNameStr
    })
return employee
}

function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}