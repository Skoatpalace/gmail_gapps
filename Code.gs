function sendEmail() {
  GmailApp.sendEmail('richard.fages@gmail.com', 'Test send email', 'It works');
}

function makeDraft() { 
  var file = DriveApp.getFileById('1LiJwRDllwtSQUFEgN_jTuAlUvOFIiZ4-nrRp0e0aaGk');
  GmailApp.createDraft('richard.fages@gmail.com', 'Test PDF', 'Check out the attachment', {
    attachments: [file.getAs(MimeType.PDF)],
    name: 'My DOC as PDF'
  });
}

function seeDraft() {
  var draft = GmailApp.getDrafts();
  for (var x=0; x<draft.length; x++) {
    //draft[x].update('richard.fages@gmail.com', 'Updated' +x, 'Hello World' +x);
    var id = draft[x].getId();
    Logger.log(id); 
    Logger.log(draft[x].getMessage().getBody());
    Logger.log(draft[x].getMessage().getSubject());
  }
  Logger.log(draft)
}

function sendHTMLTemp() {
  var emailMessage = HtmlService.createHtmlOutputFromFile('email').getContent(); 
  emailMessage = emailMessage.replace('#TITLE', 'New String Value');
  emailMessage = emailMessage.replace('#MESSAGE', 'New Message');
  MailApp.sendEmail('richard.fages@gmail.com', 'New email Temp', '', {
    htmlBody:emailMessage
  })  
  Logger.log(emailMessage);
}
