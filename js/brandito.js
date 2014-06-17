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
			var rgb = hexToRgb(val);
			output += "<div class='brandito-swatch-boxes'>";
			output += "<svg width='" + size + "' height='" + size + "'><rect class='square' width='" + size + "' height='" + size + "' style='fill:"+val+";' /></svg>";
			output += "<span>HEX: <input type='text' value='"+val+"'></span>";
			output += "<span>RGB: <input type='text' value='" + rgb.r + "," + rgb.g + "," + rgb.b + "'></span>";
		  	output += "</div>";
        });
  
        return output;

	}
	
	// Hex to RGB
	// Thanks to http://stackoverflow.com/a/5624139/148769
	function hexToRgb(hex) {
	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}

	// RGB to Hex
	// Thanks to http://stackoverflow.com/a/5624139/148769
	function rgbToHex(r, g, b) {
    	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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