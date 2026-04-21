function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents || '{}');
    var sheetName = 'Briefings';
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

    if (sh.getLastRow() === 0) {
      sh.appendRow(['timestamp', 'project', 'objective', 'deliverable', 'usageDate', 'approver', 'budget', 'notes']);
    }

    sh.appendRow([
      new Date(),
      data.project || '',
      data.objective || '',
      data.deliverable || '',
      data.usageDate || '',
      data.approver || '',
      data.budget || '',
      data.notes || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
