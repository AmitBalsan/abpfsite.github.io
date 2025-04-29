var params = new URLSearchParams(window.location.search);
var indexPassA = params.get("indexPassA");
adminInnerFunc(indexPassA);
console.log(courses);
console.log(lecturers);
function adminInnerFunc(indexPassA) {
    try {
        if (!indexPassA)
            throw new Error("user not found");
        adminMenuName.innerHTML = "Hello " + admins[indexPassA].name;
    }
    catch (error) {
        console.log(error);
    }
}
