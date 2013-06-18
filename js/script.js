////////////////////////////////////////////////////////////////////////////////
// ON DOM READY
////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {


	// PICASA
	////////////////////////
	jQuery("#digitals").EmbedPicasaGallery('secretGspot',{
		albumid: "5520358457052524865",
		size: 160, // thumb size (32,48,64,72,144,160))
		loading_animation: "/img/loading.gif",
		msg_more: 'more',
		show_more: 19
	 });

	jQuery("#studies").EmbedPicasaGallery('secretGspot',{
		albumid: "5520358863500743169",
		size: 160, // thumb size (32,48,64,72,144,160))
		loading_animation: "/img/loading.gif",
		msg_more: 'more',
		show_more: 19
	 });

	// TWEETER
	////////////////////////
	$("#latest-tweets").tweet({
		join_text: " ",
		username: "secretgspot",
		avatar_size: 48,
		count: 6,
		// auto_join_text_default: "we said,",
		// auto_join_text_ed: "we",
		// auto_join_text_ing: "we were",
		// auto_join_text_reply: "we replied",
		// auto_join_text_url: "we were checking out",
		loading_text: "loading tweets..."
	});


});

$(window).load(function() {

	// SHADOW
	//////////////////////
	//$(".shadow").realshadow();

});