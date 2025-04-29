const contactInner = document.querySelector(
  ".contactForm__inner"
) as HTMLDivElement;

function HandleSend(e) {
  e.preventDefault();
  const name = e.target.elements.name.value;
  const phone = e.target.elements.phone.value;
  const email = e.target.elements.email.value;
  const textContact = e.target.elements.textContact.value;

  const smsC = new Message(name, phone, email, textContact);
  contactInner.innerHTML = `Your message has been sent`;

  messages.push(smsC);

  saveMessagesToLS(messages);
  console.log(messages);
}
