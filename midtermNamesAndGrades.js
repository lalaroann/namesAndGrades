// This code loads up the txt file
const fs = require('fs');
let data = fs.readFileSync('theNamesGrades.txt');
data = String(data);
let arr = data.split(',');

// This will convert the strings of number in the file from string to numbers
for (let i = 1; i < arr.length; i += 2) {
    arr[i] = Number(arr[i]);
}

// The name that will be searched in the file that will be printed out.
let theNameSearch = "Mayan";
// Initializing the array that will hold both the name and their grades.
let stdNmGr = [];
// The value of the passing grade for the course.
let passingGrade = 75;
// placeholders for the temp values to swap strings and numbers
let temp;

// Making nested arrays to have different arrays for grades and names
function studentArray(theName, theGrade,) {
    this.theName = theName;
    this.theGrade = theGrade;
}

// Assigns the names and their grades respectively
let k = 0;
for (let i = 0; i < arr.length; i += 2) {
    stdNmGr[k] = new studentArray(arr[i], arr[i + 1]);
    k++;
}

// The function for sorting the highest grade to lowest
function sortGradesHighest(assignedArray) {
    for (let i = 0; i < assignedArray.length; i++) {
        for (let j = i + 1; j < assignedArray.length; j++) {
            if (assignedArray[i].theGrade < assignedArray[j].theGrade) {
                temp = assignedArray[i];
                assignedArray[i] = assignedArray[j];
                assignedArray[j] = temp;
            }
        }
    }
}

// The function for sorting the lowest grade to highest
function sortGradesLowest(assignedArray) {
    for (let i = 0; i < assignedArray.length; i++) {
        for (let j = i + 1; j < assignedArray.length; j++) {
            if (assignedArray[i].theGrade > assignedArray[j].theGrade) {
                temp = assignedArray[i];
                assignedArray[i] = assignedArray[j];
                assignedArray[j] = temp;
            }
        }
    }
}
// The function for sorting the names alphabetically from A to Z,
// implementing the method of insertion sort learned from the class
function insertionSortName(assignedArray) {
    let temp2 = 0;
    for (let i = 1; i < assignedArray.length; i++) {
        temp = assignedArray[i].theName;
        temp2 = assignedArray[i].theGrade;
        let j = i - 1;

        // The inspection of where the insertion sort is suppose to occur
        while (j >= 0 && temp < assignedArray[j].theName) {
            assignedArray[j + 1].theGrade = assignedArray[j].theGrade;
            assignedArray[j + 1].theName = assignedArray[j].theName;
            j--;
        }

        // swapping the grades and name until the current temp is in the right place
        assignedArray[j + 1].theName = temp;
        assignedArray[j + 1].theGrade = temp2;
        // console.table(assignedArray);

    }
}
// The function for searching a name in the text file.
function searchName(assignedArray, targetName, targetGrade) {
    let start = 0;
    let end = assignedArray.length;
    let middle = Math.floor(assignedArray.length / 2);
    let theIndexOfTargetName = 0;
    let passFail;
    
    // By doing a binary search and disecting the group, this takes a less time scan and search instead of searching the whole array.
    if (targetName < assignedArray[middle].theName) {
        for (let i = start; i < middle; i++) {
            if (assignedArray[i].theName == targetName) {
                theIndexOfTargetName = i;
                break;
            }
        }
    } else {
        for (let i = middle; i < end; i++) {
            if (assignedArray[i].theName == targetName) {
                theIndexOfTargetName = i;
                break;
            } else if (targetName == assignedArray[middle].theName) {
                theIndexOfTargetName = middle;                
            }

        }
    }
    
    if(assignedArray[theIndexOfTargetName].theGrade <= targetGrade){
        passFail = "failed";
    } else{
        passFail = "passed";
    }
    console.log(`The name is: ${assignedArray[theIndexOfTargetName].theName} and their grade is: ${assignedArray[theIndexOfTargetName].theGrade} and they ${passFail} the course.`);
}


// The function for collecting all the names and grades of all those students who passed and failed the course
function passingStudents(assignedArray, passingGrade) {
    let theListOfPassed = [];
    let theListOfFailed = [];
    let k = 0;
    let l = 0;
    for (let i = 0; i < assignedArray.length; i++) {
        if (assignedArray[i].theGrade >= passingGrade) {
            theListOfPassed[k] = assignedArray[i];
            k++;
        } else {
            theListOfFailed[l] = assignedArray[i];
            l++;
        }
    }
    console.log(`There are ${theListOfPassed.length} student(s) who passed the course and ${(assignedArray.length) - theListOfPassed.length} student(s) who failed.`);
    console.log("Passed: ");
    console.table(theListOfPassed);
    console.log("Failed: ");
    console.table(theListOfFailed);
}

// A function that calculates the average or the mean of the class
function theMean(assignedArray) {
    let theMeanValue = 0;
    for (let i = 0; i < assignedArray.length; i++) {
        theMeanValue = theMeanValue + assignedArray[i].theGrade;
    }
    theMeanValue = theMeanValue/assignedArray.length;
    console.log(`The avarage of the class is: ${theMeanValue.toFixed(2)}%`);
}


// Prints out the "rough" array of the file loaded
console.table(arr);

sortGradesHighest(stdNmGr);
console.log("Highest Grade to Lowest: ");
console.table(stdNmGr);

sortGradesLowest(stdNmGr);
console.log("Lowest Grade to Highest: ");
console.table(stdNmGr);

insertionSortName(stdNmGr);
console.log("Alphabetical order A to Z: ");
console.table(stdNmGr);

searchName(stdNmGr, theNameSearch, passingGrade);

theMean(stdNmGr);

passingStudents(stdNmGr, passingGrade);






