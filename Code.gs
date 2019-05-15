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
