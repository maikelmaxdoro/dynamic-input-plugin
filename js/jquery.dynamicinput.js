// jQuery DynamicInput Boilerplate
// A plugin to dynamically add, remove and sort input fields
// version 0.9, Oct 16th, 2015
// by Maikel Bakker

(function ($) {
    // Maxd'oro feed object intance
    $.dynamicInput = function (el, options) {
        var dynamic = $(el);

		//Wrap some divs around it and make them objects
		dynamic.wrap('<div data-dynamic-container></div>');   
		dynamic.wrapInner('<div data-dynamic-item="0"></div>'); 

		var container = $('[data-dynamic-container]');
		var item = $('[data-dynamic-item]');

		var hidden = $('[data-dynamic-json]');
		var json = JSON.parse(hidden.val());
		console.log(json);

		// var	html = dynamic.html();

        // Making variables public
        dynamic.vars = $.extend({}, $.dynamicInput.defaults, options);

        var namespace = dynamic.vars.namespace,
            methods = {},
            publicMethods = {};

        // Store reference to dynamic object
        $.data(el, "dynamicInput", dynamic);

        // Private methods
        methods = {
            init: function () {
				methods.createControls();
				dynamic.publicMethods.load();
            },

            createControls: function() {
            	//Create controls
				container.append('<a data-dynamic-add>Toevoegen</a> <a data-dynamic-delete>Verwijderen</a> <a data-dynamic-up>Omhoog</a>  <a data-dynamic-down>Omlaag</a>');

				var addBtn = $('[data-dynamic-add]');
				var deleteBtn = $('[data-dynamic-delete]');
				var upBtn = $('[data-dynamic-up]');
				var downBtn = $('[data-dynamic-down]');

				addBtn.click(function() {
					dynamic.publicMethods.addItem();
				});
            }
            
        };

        // Public methods
        dynamic.publicMethods = {
            addItem: function() {
            	var clone = dynamic.find('[data-dynamic-item="0"]').clone();
            	// var input = $(html).find('input, select, textarea');
            	var itemCount = dynamic.find('[data-dynamic-item]').length;

            	console.log(dynamic.find('[data-dynamic-item]').length);

            	// input.each(function() {
            	// 	console.log($(this).val());
            	// });

            	clone.attr('data-dynamic-item', itemCount);
            	clone.find('input, select, textarea').each(function() {
            		var name = $(this).attr('name');
            		$(this).attr('name', name+itemCount);
            	});
            	dynamic.append(clone);
            },

            save: function() {
	            var dict = {};
	            var i = 0;
	            dynamic.find('input[type="text"], input[type="radio"]:checked, input[type="checkbox"]:checked, select, textarea').each(function () {
	                dict[i++] = $(this).val();
	            });
	            hidden.val(JSON.stringify(dict));
	            console.log('save');
	            console.log(dict);
	        },

	        load: function() {
	        	$.each(json, function(key,value) {
				  	console.log(key+':'+value);
				});
	        	// dynamic.find('input[type="text"], input[type="radio"]:checked, input[type="checkbox"]:checked, select, textarea').each(function () {

	         //    });
	        }
        }

        // Maxd'oro Feed initialize
        methods.init();
    };

    $.dynamicInput.defaults = {
        
    };

    // Maxd'oro Feed: Plugin Function
    $.fn.dynamicInput = function (options) {
        if (options === undefined) { options = {}; }

        var $dynamic = $(this).data('dynamicInput');

        if ($dynamic && $dynamic.publicMethods[options]) {
            return $dynamic.publicMethods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof (options) === 'object') {
            return this.each(function() {
                var $this = $(this),
                    selector = (options.selector) ? options.selector : ".dynamic > li",
                    $feedItems = $this.find(selector);

                if ($this.data('dynamicInput') === undefined) {
                    new $.dynamicInput(this, options);
                }
            });
        }
        else {
            $.error('Method ' + options + ' does not exist on jQuery.dynamicInput');
        }
    };
})(jQuery);