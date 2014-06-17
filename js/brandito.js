/*!
 * Brandito JS quickly throws together a brand colours reference
 * https://github.com/jimhill/jquery-brandito
 *
 * Copyright 2014 Jim Hill
 * Released under the MIT license
 */
var Brandito = window.Brandito || (function($){

	var size = 120,
		$brandito = $('.brandito');

	// Load JSON
	function loadJson() {
		$.getJSON( "brandito.json", function( data ) {
            render(data);
         });
	}

	// Render
	function render(data)
	{
		var output = "";
		output += parseTitle(data["title"]);
        output += parseSections(data["sections"]);
        $brandito.html(output);
	}

	// Parse title
	function parseTitle(data)
	{
		if (data === undefined) return;
		
		return "<section><h1>" + data + "<span class='headline-tag'>colour guide</span></h1></section>";
	}

	// Parse sections
	function parseSections(data)
	{
		if (data === undefined) return;
		
		var output = "";
		$.each( data, function( key, val ) {
			console.log(val);
				output += "<section><h2>" + val["title"] + "</h2><table><tbody>";
				output += "<tr>" + parseSwatches(val["swatches"]) + "</tr>";
				output += "</tbody></table></section>";
        });
        return output;
	}

	// Parse sections
	function parseSwatches(data)
	{
		if (data === undefined) return;

		var output = "";
		$.each( data, function( key, val ) {
			if (!$.isArray(val)) return;
			output += "<td class='brandito-swatch-cols-" + val.length + "'>" + parseSwatchStates(val) + "</td>";
        });
        return output;
	}

	// Parse swatch states
	function parseSwatchStates(data)
	{
		if (data === undefined) return;
		if (!$.isArray(data)) return;

		var output = "";
		$.each( data, function( key, val ) {
			output += "<div class='brandito-swatch-boxes'>";
			output += "<svg width='" + size + "' height='" + size + "'><rect class='square' width='" + size + "' height='" + size + "' style='fill:"+val+";' /></svg>";
			output += "<span>HEX: <input type='text' value='"+val+"'></span>";
			output += "<span>RGB: <input type='text' value='0, 0, 0'></span>";
		  	output += "</div>";
        });
  
        return output;

	}

	// Run
	function run() {
		loadJson();
	}

	// Public
	return {
		run: run
	}

})(jQuery);