function sendEmail() {
  GmailApp.sendEmail('richard.fages@gmail.com', 'Test send email', 'It works');
}

function testerLabel() {
  var sheet = SpreadsheetApp.openById('10D9-XBP31hTAWTy7pRYyTAgoYoS_ZyAxYyoCubYzppU').getSheetByName('sheet2');
  var tester = GmailApp.getUserLabelByName('tester'); 
  var added = GmailApp.getUserLabelByName('added'); 
  var emails = tester.getThreads();
  for (var x=0; x<emails.length; x++){
    var msg = emails[x].getMessages();
    for (var i=0; i<msg.length;i++){
      var message = msg[i].getBody(); 
      var plainBody = msg[i].getPlainBody();
      var subject = msg[i].getSubject();
      var dateSent = msg[i].getDate();
      var fromSender = msg[i].getFrom();
      msg[i].star();
      sheet.appendRow([message,plainBody,subject,dateSent,fromSender]);
      Logger.log(message);        
    }    
    emails[x].addLabel(added);
    emails[x].removeLabel(tester); 
  }  
}

function chatThreads(){
  var threads = GmailApp.getChatThreads(0, 50); 
  Logger.log(threads);
  var emailAdress = Session.getActiveUser().getEmail(); 
  if(threads.length >0){
    GmailApp.sendEmail(emailAdress, 'Thread tester', threads[0].getMessageCount());
  }  
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

function sendHTMLTemp(){
  var emailMessage = HtmlService.createHtmlOutputFromFile('email').getContent();
  emailMessage = emailMessage.replace('#TITLE', 'New String Value');
  emailMessage = emailMessage.replace('#MESSAGE', 'Replaced with new message');
  MailApp.sendEmail('richard.fages@gmail.com', 'New email Temp', '',{
    htmlBody:emailMessage
  })
  Logger.log(emailMessage);
}

function sendTemp(arr,x){
  var emailMessage = HtmlService.createHtmlOutputFromFile('email').getContent();
  emailMessage = emailMessage.replace('#TITLE', 'Bulk Mailer Tester');
  emailMessage = emailMessage.replace('#MESSAGE', arr[3]);
  emailMessage = emailMessage.replace('#FIRST', arr[0]);
  emailMessage = emailMessage.replace('#LAST', arr[1]);
  MailApp.sendEmail(arr[2], 'Email Value'+x, '',{
                    htmlBody:emailMessage
                    })
  Logger.log(emailMessage);
  return true;
}

function bulkEmails(){
  var sheet = SpreadsheetApp.openById('10D9-XBP31hTAWTy7pRYyTAgoYoS_ZyAxYyoCubYzppU').getSheetByName('sheet1');
  var range = sheet.getRange(2,1,sheet.getLastRow()-2,sheet.getLastColumn());
  var value = range.getValues();
  //range.sort({column:1,ascending:true})
  for(var x=0;x<value.length;x++){
    Logger.log(value[x]); 
    var row = 2+x;
    var rep = sendTemp(value[x],x);
    sheet.getRange(row, 5, 1, 2).setValues([[rep,Date()]])
  }
}
