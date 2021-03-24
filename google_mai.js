function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: '表示する名前', functionName: 'sendMail'}
  ];
  spreadsheet.addMenu('メール送信', menuItems);
}

function sendMail() {
  // Googleドキュメントからメールの件名と本文を取得
  var doc = DocumentApp.openById('GoogleドキュメントのURL貼りましょう');
  var text = doc.getBody().getText();

  // Googleスプレッドシートからデータ取得
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var range = sheet.getDataRange();
  var rangeValues = range.getValues();
  var subject = doc.getName();

  for(var i = 1; i < rangeValues.length; i++) {
    var company = rangeValues[i][0];
    var name = rangeValues[i][1];
    var email = rangeValues[i][2];
    var title = rangeValues[i][3];
    var sit = rangeValues[i][4];
    var after = rangeValues[i][4];
    var fromAddress = '送りたいメールアドレス'
    var options = {from: fromAddress};

    var replacedText = text.replace('{会社名}', company).replace('{名前}', company).replace('{会社名2}', title).replace('{顧客状況}', sit).replace('{顧客詳細}', after);

     MailApp.sendEmail(email,subject, replacedText,options);
  }
  Browser.msgBox('メール送信が完了しました');
}
