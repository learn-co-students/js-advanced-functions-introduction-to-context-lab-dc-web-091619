// Your code here
let createEmployeeRecord = function (row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row [3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arr){
   return arr.map(function(row){
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, ts){
    let [date, hour] = ts.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date, 
    })
    return employee
}

let createTimeOutEvent = function(employee, ts){
    let [date, hour] = ts.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, tdate){
    let inT = employee.timeInEvents.find(function(e){
        return e.date === tdate
    })
    let outT = employee.timeOutEvents.find(function(e){
        return e.date === tdate 
    })

    return (outT.hour - inT.hour)/100
}

let wagesEarnedOnDate = function(employee, tdate){
    let inT = employee.timeInEvents.find(function(e){
        return e.date === tdate
    })
    let outT = employee.timeOutEvents.find(function(e){
        return e.date === tdate 
    })

    let hours = (outT.hour - inT.hour)/100
    let rate = employee.payPerHour

    return hours * rate 
}

let allWagesFor = function(employee){
    let hours = employee.timeInEvents.map(function(e){
        return e.date
    })
    let pay = hours.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)
    return pay
}

let calculatePayroll = function(employees){
    return employees.reduce(function(memo, d){
        return memo + allWagesFor(d)
    }, 0)
}

let findEmployeeByFirstName = function(employees, firstName){
    return employees.find(function(e){
        return e.firstName === firstName
})
}