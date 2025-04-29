var _students = getStudentFromLS();
if (_students) {
    students = _students;
}
var _courses = getCourseFromLS();
if (_courses) {
    courses = _courses;
}
var _lecturers = getLecturerFromLS();
if (_lecturers) {
    lecturers = _lecturers;
}
var _admins = getAdminFromLS();
if (_admins) {
    admins = _admins;
}
var _messages = getMessagesFromLS();
if (_messages) {
    messages = _messages;
}
saveStudentToLS(students);
saveAdminToLS(admins);
saveCourseToLS(courses);
saveLecturerToLS(lecturers);
saveMessagesToLS(messages);
