var visible = false;
document.onkeydown = console_slide;
var Tilde = 192, Esc = 27;
function console_slide(evt){
	if (!evt) {
		evt = window.event;
	}
	if (evt.keyCode === Esc || evt.keyCode === Tilde) {// Esc
		if(visible==false){
				visible = true;
				$('#console').animate({
						top: 0
				});
		}
		else if(visible==true){
				visible = false;
				$('#console').animate({
						top: -350
				});
		}
		return false;
	}
}

////////////////////////////////////////////////////////////////////////////////
// CLASS
////////////////////////////////////////////////////////////////////////////////
var myAppName = {
		settings: {
				isOnline: true
		},

		console: {
			log: function(message) {
				var element = document.getElementById('console_output');
				element.innerHTML = element.innerHTML + message + '<br />';
			}
		}
}
//accessed as
//console.log(myAppName.settings.isOnline); // true
myAppName.console.log('myApp says Hello');





////////////////////////////////////////////////////////////////////////////////
// USING BACKBONE.JS
////////////////////////////////////////////////////////////////////////////////

SearchView = Backbone.View.extend({
	initialize: function(){
		this.render();
	},
	render: function(){
		//Pass variables in using Underscore.js Template
		var variables = { search_label: "My Search" };
		// Compile the template using underscore
		var template = _.template( $("#search_template").html(), variables );
		// Load the compiled HTML into the Backbone "el"
		this.el.html( template );
	},
	events: {
		"click button": "doSearch"  
	},
	doSearch: function( event ){
		// Button clicked, you can access the element that was clicked with event.currentTarget
		myAppName.console.log( "Searched for " + $("#search_input").val() );
	}
});

var search_view = new SearchView({ el: $("#search_container") });



//Twitter module
// // A container for a tweet object.
// 	var Tweet = Backbone.Model.extend({});

// 	// A basic view rendering a single tweet
// 	var TweetView = Backbone.View.extend({
// 	    tagName: "li",
// 	    className: "tweet",

// 	    render: function() {

// 	        // just render the tweet text as the content of this element.
// 	        $(this.el).html(this.model.get("text"));
// 	        return this;
// 	    }
// 	});

// 	// A collection holding many tweet objects.
// 	// also responsible for performing the
// 	// search that fetches them.
// 	var Tweets = Backbone.Collection.extend({
// 	    model: Tweet,
// 	    initialize: function(models, options) {
// 	        this.query = options.query;
// 	    },
// 	    url: function() {
// 	        return "http://search.twitter.com/search.json?q=" + this.query + "&callback=?";
// 	    },
// 	    parse: function(data) {

// 	        // note that the original result contains tweets inside of a results array, not at 
// 	        // the root of the response.
// 	        return data.results;
// 	    }
// 	});

// 	// A rendering of a collection of tweets.
// 	var TweetsView = Backbone.View.extend({
// 	    tagName: "ul",
// 	    className: "tweets",
// 	    render: function() {

// 	        // for each tweet, create a view and prepend it to the list.
// 	        this.collection.each(function(tweet) {
// 	            var tweetView = new TweetView({
// 	                model: tweet
// 	            });
// 	            $(this.el).prepend(tweetView.render().el);
// 	        }, this);

// 	        return this;
// 	    }
// 	});

// 	// Create a new cat tweet collection
// 	var catTweets = new Tweets([], {
// 	    query: "secretgspot"
// 	});

// 	// create a view that will contain our tweets
// 	var catTweetsView = new TweetsView({
// 	    collection: catTweets
// 	});

// 	// on a successful fetch, update the collection.
// 	catTweets.fetch({
// 	    success: function(collection) {
// 	        $('#tweet').html(catTweetsView.render().el);
// 	    }
// 	});

////////////////////////////////////////////////////////////////////////////////
// ON DOM READY
////////////////////////////////////////////////////////////////////////////////

(function ($) {


	// PICASA
	////////////////////////
	jQuery("#digitals").EmbedPicasaGallery('secretGspot',{
		albumid: "5520358457052524865",
		size: 144, // thumb size (32,48,64,72,144,160))
		loading_animation: "http://oss.oetiker.ch/jquery/css/loading.gif",
		msg_more: 'more',
		show_more: 8
	 });

	jQuery("#studies").EmbedPicasaGallery('secretGspot',{
		albumid: "5520358863500743169",
		size: 144, // thumb size (32,48,64,72,144,160))
		loading_animation: "http://oss.oetiker.ch/jquery/css/loading.gif",
		msg_more: 'more',
		show_more: 8
	 });

	// TWEETER
	////////////////////////
	$("#latest-tweets").tweet({
		join_text: "auto",
		username: "secretgspot",
		avatar_size: 48,
		count: 6,
		auto_join_text_default: "we said,",
		auto_join_text_ed: "we",
		auto_join_text_ing: "we were",
		auto_join_text_reply: "we replied",
		auto_join_text_url: "we were checking out",
		loading_text: "loading tweets..."
	});

	// TUMBLR
	/////////////////////
	$(".tumblr.post").tumblrRss({username: "secretgspot", tagged: "post", limit: 1});
	$(".tumblr.video").tumblrRss({username: "secretgspot", tagged: "video", limit: 1});


})(jQuery);