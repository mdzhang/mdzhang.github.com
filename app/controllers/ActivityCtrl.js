(function() {
  'use strict';

  function ActivityCtrl($scope, $http, $parse, corsService)
  {
    var _this = this;

    // What I'm...
    _this.titles = $scope.titles = [
      'Watching',
      'Playing',
      'Reading'
    ];

    /**
     * Scope variables
     */
    // Current title on display in banner i.e. one of _this.titles
    $scope.currentTitle = null;
    // Books to be shown in "What I'm Reading" section
    $scope.books = [];
    $scope.games = [];
    // True if we're in the middle of a request that affects current display
    $scope.loading = false;

    $scope.isCurrentTitle = function(title) {
      return title === $scope.currentTitle;
    };

    $scope.nextTitle = function() {
      $scope.currentTitle = _this.titles[
        (_.indexOf(_this.titles, $scope.currentTitle) + 1) % _this.titles.length
      ];
    };

    $scope.previousTitle = function() {
      var previousIndex = _.indexOf(_this.titles, $scope.currentTitle) - 1;
      if (previousIndex < 0) {
        previousIndex = _this.titles.length - 1;
      }

      $scope.currentTitle =  _this.titles[previousIndex];
    };

    /**
     * Request books I'm currently reading from Goodreads.
     */
    function _getBooks() {
      // See https://www.goodreads.com/api/index#reviews.list
      var url = 'https://www.goodreads.com/review/list/13686342?';
      var params = {
        format: 'xml',
        v: '2',
        shelf: 'to-read',
        key: 'P78YnKD8IcTJLSJM6OwWw',
        // user_id: '13686342'
      };

      corsService.request(url, { params: params, format: 'xml' }, function(data) {
        var books = [];
        var results = $parse('results.length')(data);

        if (results) {
          var xml = $.parseXML(data.results[0]);
          var json = $.xml2json(xml);
          books = _formatGoodreadsResponse(json);
          $scope.books = books;

          // Apply changes (must do b/c corsService uses jQuery)
          if (!$scope.$$phase) {
            $scope.$apply();
          }

          console.log('Fetched Goodreads books: ', books);
        } else {
          console.log('Failed to fetch books from Goodreads');
        }
      });

      return;
    }

    /**
     * Format Goodreads response so we can use it for this client.
     */
    function _formatGoodreadsResponse(data) {
      var books = [];
      if (_.isArray(data.reviews.review)) {
        books = data.reviews.review;
      } else if (_.isObject(data.reviews.review)) {
        books = [data.reviews.review];
      }

      _.each(books, function(book) {
        book.book.started_at = book.started_at;

        if (_.isArray(book.book.authors.author)) {
          book.book.author = book.book.authors.author[0];
        } else if (_.isObject(book.book.authors.author)) {
          book.book.author = book.book.authors.author;
        }
      });

      books = _.pluck(books, 'book');

      return books;
    }

    function _getAnime() {
      // TODO: Load from MyAnimeList
    }

    /**
     * Request games I've recently played from Steam.
     */
    function _getGames() {
      // TODO: Load from Raptr and/or Steam
      var url = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?';
      var params = {
        key: 'FBADE7566BA2B38B1BC3BAD857FFFDB5',
        steamid: '76561198046100572',
        format: 'json'
      };

      corsService.request(url, { params: params, format: 'json' }, function(data) {
        var games = $parse('query.results.response.games')(data);

        if (games) {
          games = data.query.results.response.games;
          console.log('Fetched Steam games: ', games);
        } else {
          console.log('Failed to fetch games from Steam');
        }
      });

      return;
    }

    function _init() {
      $scope.currentTitle = _this.titles[0];
      _getBooks();
      _getAnime();
      _getGames();
    }

    _init();
  }

  mdzhangPersonalSiteApp.controller('activityCtrl', ActivityCtrl);
})();