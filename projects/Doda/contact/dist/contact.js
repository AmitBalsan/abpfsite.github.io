var contactInner = document.querySelector(".contactForm__inner");
function HandleSend(e) {
    e.preventDefault();
    var name = e.target.elements.name.value;
    var phone = e.target.elements.phone.value;
    var email = e.target.elements.email.value;
    var textContact = e.target.elements.textContact.value;
    var smsC = new Message(name, phone, email, textContact);
    contactInner.innerHTML = "Your message has been sent";
    messages.push(smsC);
    saveMessagesToLS(messages);
    console.log(messages);
}
