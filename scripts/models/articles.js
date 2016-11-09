Project.projects = [];

Project.createTable = function() {
      webDB.execute(
        'CREATE TABLE IF NOT EXISTS articles (' +
         'id INTEGER PRIMARY KEY, ' +
         'title VARCHAR(255) NOT NULL, ' +
         'author VARCHAR(255) NOT NULL, ' +
         'authorUrl VARCHAR (255), ' +
         'category VARCHAR(20), ' +
         'publishedOn DATETIME, ' +
         'body TEXT NOT NULL);',
       function() {
         console.log('Successfully set up the articles table.');
       }
     );
   };

   Project.truncateTable = function() {
     webDB.execute(
       'DELETE FROM articles;'
     );
   };

//    Projects.prototype.insertRecord = function()
// }
