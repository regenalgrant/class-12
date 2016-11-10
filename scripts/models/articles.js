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

Project.prototype.insertRecord = function(){
  webDB.execute(
    [{
      'sql': 'INSERT INTO articles (title, author, authorUrl, category, publishedOn, body) VALUES (?, ?, ?, ?, ?, ?);',
      'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.body],
    }]
  );
};
Project.prototype.deleteRecord = function() {
    webDB.execute(
      [{
        'sql': 'DELETE FROM articles WHERE id = ?;',
        'data': [this.id]
      }]
    );
  };

  Project.prototype.updateRecord = function() {
    webDB.execute(
      [{
        'sql': 'UPDATE articles SET title = ?, author = ?, authorUrl = ?, category = ?, publishedOn = ?, body = ? WHERE id = ?;',
        'data': [this.title, this.author, this.authorUrl, this.category, this.publishedOn, this.body, this.id]
      }]
    );
  };

  Project.loadAll = function(rows) {
    Project.allArticles = rows.map(function(ele) {
      return new Articles(ele);
    });
  };

  Project.fetchAll = function() {
    webDB.execute('SELECT * FROM articles ORDER BY publishedOn DESC', function(rows) {
      if (rows.length) {
        Project.loadAll(rows);
        articleView.renderIndexPage();
        articleView.initAdminPage();
      } else {
        $.getJSON('/data/Articles.json', function(rawData) {
          // Cache the json, so we don't need to request it next time:
          rawData.forEach(function(item) {
            var article = new Article(item); // Instantiate an article based on item from JSON
            article.insertRecord(); // Cache the article in DB
          });
          webDB.execute('SELECT * FROM articles', function(rows) {
            Project.loadAll(rows);
            articleView.renderIndexPage();
            articleView.initAdminPage();
          });
        });
      }
    });
  };

  Project.allAuthors = function() {
    return Project.allArticles.map(function(article) {
      return article.author;
    })
    .reduce(function(names, name) {
      if (names.indexOf(name) === -1) {
        names.push(name);
      }
      return names;
    }, []);
  };

  Project.numWordsAll = function() {
    return Project.allArticles.map(function(article) {
      return projects.body.match(/\w+/g).length;
    })
    .reduce(function(a, b) {
      return a + b;
    });
  };

  Project.numWordsByAuthor = function() {
    return Project.allAuthors().map(function(author) {
      return {
        name: author,
        numWords: Project.allArticles.filter(function(a) {
          return a.author === author;
        })
        .map(function(a) {
          return a.body.match(/\w+/g).length;
        })
        .reduce(function(a, b) {
          return a + b;
        })
      };
    });
  };
  Project.createTable();
  Project.fetchAll();
  module.Project = Project;
})(window);
