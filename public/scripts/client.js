/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(() => {
  function createTweetElement(obj) {
    let $tweet = `<article class="tweet">
                    <header class = "article-tweet">
                      <div class = "name">
                        <img src = "${obj.user.avatars}">
                        <h5>${obj.user.name}</h5>
                      </div>
                      
                      <h5 class="username">${obj.user.handle}</h5>
                    
                    </header>
                    <div class = "tweet-body">
                    <p>${escape(obj.content.text)}</p>
                    </div>
                    <footer>
                      <span>${timeago.format(obj.created_at)}</span>
                      <div class="flags">
                        <i class="fas fa-heart"></i>
                        <i class="fas fa-flag"></i>
                        <i class="fas fa-retweet"></i>
                      
                      </div>
                    </footer>
                    </article>`

    return $tweet;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $tweetContainer = $(".tweet-container");
    $tweetContainer.empty();     // clear out blog-container
    // repopulate blog-container
    for (const tweet of tweets) {
      $tweetContainer.prepend(createTweetElement(tweet));
    }
  };

  $(".longLength").hide();
  $(".empty").hide();

  $('form').submit(function (event) {
    event.preventDefault();
    $(".longLength").hide();
    $(".empty").hide();
    const text = $("#tweet-text").val();

    if (!text) {
      $(".empty").show();
      return;
    }
    if (text.length > 140) {
      $(".longLength").show();
      return;
    }
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: $(this).serialize()
    })
      .then(function (response) {
        console.log(response);
        loadTweets();
        $(".longLength").hide();
        $(".empty").hide();
        $("#tweet-text").val("");
        $(".counter").text("140");
      })
  });

  function loadTweets() {
    $.ajax("/tweets").then(function (tweets) {
      renderTweets(tweets);
    })
  }
  loadTweets();
});

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};




