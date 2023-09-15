function isInvalidEmail(userObject) {
    // here userObject is our payload in update-profile function
    return !userObject.email.includes("@")
}

// this is an alternative syntax for exporting a function to be used in some other files
// exports.isInvalidEmail = (userObject) => {
//     return !userObject.email.includes("@")
// }

function isEmptyPayload(userObject) {
    return Object.keys(userObject).length === 0
}

// To use this function in a different file we first need to export this 
module.exports = {
    isInvalidEmail,
    isEmptyPayload
}