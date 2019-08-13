function main() {
  function deleteSheets () {
  var spreadsheetID = "1gH9I67WqydwDQrSxCtiHlg_geoYFFc7y_Xag5xgrdSo";
  var sheetName = "Баланс";
  var sheet = SpreadsheetApp.openById(spreadsheetID).getSheetByName(sheetName);
  sheet.clear();
  }
  deleteSheets ();
    var managerAccount = AdsApp.currentAccount();
          var accountIterator = AdsManagerApp.accounts()
     .withCondition('Impressions > 10')
          .forDateRange('LAST_MONTH')
          .get();
     while (accountIterator.hasNext()) {
        var accountAds = accountIterator.next(); 
       var mcc = AdsManagerApp.select(accountAds);
         var mcc = AdsManagerApp.select(accountAds);
       getActiveBudgetOrder();
     }
    
       function getActiveBudgetOrder() {
          
          var account = accountAds.getName();
          var timeZone = accountAds.getTimeZone();
          var format = 'yyyyMMdd';         
      // There will only be one active budget order at any given time.
      var budgetOrderIterator = AdsApp.budgetOrders()
          .get();
      while (budgetOrderIterator.hasNext()) {
        var budgetOrder = budgetOrderIterator.next();
      //  Logger.log ("Budget Order [" + budgetOrder.getName() +"] is currently active.");
      //  Logger.log (budgetOrder.getSpendingLimit());   
         if (budgetOrder.getSpendingLimit() !== null ) {  
            var startDate = timeFormat(budgetOrder.getStartDateTime()); 
            var endDate = timeFormat(budgetOrder.getEndDateTime());
            var stats = accountAds.getStatsFor(startDate,today()).getCost(); 
            var limit = budgetOrder.getSpendingLimit(); 
            var last7DayCost =  (accountAds.getStatsFor("LAST_7_DAYS").getCost() / 7).toFixed(2); 
            var remainingDays = dayToPay(limit, stats, last7DayCost); //
            var row = [account, (limit - stats).toFixed(0), last7DayCost, remainingDays];
          //  Logger.log([account, (limit - stats).toFixed(0), last7DayCost,remainingDays]);       
          } else {
        try {      
          var startDate = timeFormat(budgetOrder.getStartDateTime());
          var endDate = timeFormat(budgetOrder.getEndDateTime());
          var stats = accountAds.getStatsFor(startDate,today()).getCost();
          var limit = budgetOrder.getSpendingLimit();
          var last7DayCost =  (accountAds.getStatsFor("LAST_7_DAYS").getCost() / 7).toFixed(2);
          var remainingDays = dayToPay(limit, stats, last7DayCost);     
          var row = [account, (limit - stats).toFixed(0), last7DayCost, remainingDays];
       //   Logger.log([account, (limit - stats).toFixed(0), last7DayCost, remainingDays]);
        } catch (e) {
         // Logger.log(e);
        }
      }    
        return allFinished(row);
      }  
    }
    
     function timeFormat (date) {  

      var year = date.year.toString();
      var month = date.month.toString();
     //  Logger.log('месяц стрига' + month);
      var monthLength = month.length; 
     //  Logger.log('месяц длина' + monthLength);
      var day = date.day.toString();
       var dayLength = day.length; 
      if (monthLength == 1) {
        month = "0" + month;
      }
      if (dayLength == 1) {
        day = "0"+day;
      }
      return [year,month,day].join("");
    }
    
    function dayToPay(limit, fullCost, last7dayCost) {

      var remainingDays = ((limit - fullCost)/last7dayCost).toFixed(0); 
      if (remainingDays < 1 || remainingDays == "Infinity" || remainingDays == "-Infinity" || remainingDays == -0 ) {
        remainingDays = 0;
      }  
      return remainingDays;
    }
    
    function today () {

      var date = new Date();
      var timeZone = accountAds.getTimeZone();
      var format = 'yyyyMMdd';
      return Utilities.formatDate(date, timeZone, format);
    }  
       }
    
      function allFinished (results) {

       var spreadsheetID = "ID_spreadsheet*****";
       var sheetName = "Name_List_spreadsheet******";
       Logger.log('results ' + results);
      var result =[results];
      var sheet = SpreadsheetApp.openById(spreadsheetID).getSheetByName(sheetName);
      var columnStart = sheet.getRange('A1:D1');
      columnStart.setBackground('black');
      columnStart.setFontColor('white');
      var values = [[ "Account", "Current Balance", "Expense in 7 days" ,"Days to the end of the balance" ]];
      columnStart.setValues(values);
      var lastRow = sheet.getLastRow();
      var lastColumn = sheet.getLastColumn();
      //   Logger.log(lastRow + ' -lastRow');
      //   Logger.log(lastColumn + ' -lastColumn');
      var lastCell = sheet.getRange(lastRow + 1, 1 , 1 , 4);
      // Logger.log (result);
      //  Logger.log (result.length);
      var pushHard = lastCell.setValues(result);
      //  Logger.log (pushHard);
    }    
