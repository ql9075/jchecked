/*

checkbox && radio

*/
(function($) {

	$.fn.jchecked = function( opt ){

		this.each(function(){

			return new jchecked( this , opt );

		});
		

	};


 jchecked = function ( elem , opt ) {

	this.elem = elem ;

	this.opt = {
		
		checkboxChild: null,
		
		checkboxParent: null,

		callfunc: function( elem ){}

	
	};

	$.extend( this.opt ,opt );


	this.init();
};

jchecked.prototype = {

	init:function(){

		this.wrapper = $('<div class="ck-Wrapper" />') ;
		
		this.idvalue = $(this.elem).attr('id')  ;

		this.attrname = $(this.elem).attr('name')  ;

	    this.flag = false ;

		if( this.idvalue !== undefined && $.trim( this.idvalue ) !== '' ){

		    if( $(this.elem).siblings('label').attr('for') == this.idvalue){
				this.flag = true;

			}else if( $(this.elem).next('label') !== undefined  &&
					  $(this.elem).next('label').attr('for') == undefined ){

				$(this.elem).next('label').attr( 'for', this.idvalue );
				 this.flag = true;
			}
			
		}else{
			//return false;

			var rid = 'jc'+( Math.floor( ( new Date() ).getTime() * Math.random( 99999 ) ) );

			$(this.elem).attr( 'id', rid );

			$(this.elem).next('label').attr( 'for', rid );

			this.flag = true;
		}

		this.wrapbox();
	},
	
	wrapbox:function(){
		
		if( this.flag ){

			this.idvalue = $(this.elem).attr('id')  ;

			this.$next_label = $('label[for='+this.idvalue+']') ;

			$(this.elem)[0]._label = this.$next_label[0];

			$(this.elem)[0].inputOther  = $( 'input[name="'+ this.attrname +'"]' );

			$(this.elem).wrap(this.wrapper);

			$(this.elem).after(this.$next_label);

			this.events();

			this.flag = false ;

		}else{

			return false;
		}

	},

	events:function(){

		var _this = this ;

		$(this.elem).each(function(){

			var _input = $(this) , def_checkbox = _input.prop('checked') ;

			if(  _input.attr('type') == 'radio' ){
				
				_this.$next_label.addClass('label-radio');

				if( typeof (def_checkbox) !== "undefined" &&  def_checkbox !== "" && def_checkbox){
				
						_this.$next_label.addClass('s-ckeckradio');
					
				}

			}

			if(  _input.attr('type') == 'checkbox' ){
				
				_this.$next_label.addClass('label-checkbox');
					
				if( def_checkbox  ){	

					_this.$next_label.addClass('s-checkbox');

				}

			}

			_this.$next_label.click(function(){

				$( this._input ).triggerHandler('change');
				
			});
			
			$( this ).change(function(){
	
				var status = $(this).is(':checked') ; 


				if( _input.attr('type') == 'checkbox' ){

					_this.$next_label[ status ? 'addClass' : 'removeClass' ]('s-checkbox');


				}else if( _input.attr('type') == 'radio' ){

					this.inputOther.each(function(){

						$( this._label ).removeClass('s-ckeckradio');

					});

					$( this._label ).addClass( 's-ckeckradio' );

				}

			
			});


		});
		

		/*checkbox all*/

		if( _this.opt.checkboxChild  != null &&  _this.opt.checkboxParent != null){


				if( _this.opt.checkboxParent.is(':checked') ){

					_this.opt.checkboxParent.change();
				}

				_this.opt.checkboxParent.change(function(){
				
					var _statuss = $(this).is(':checked') ;

					_this.opt.checkboxChild.each(function(){
												
						var currid = $(this).attr('id');

						var currlabel = $("label[for='"+currid+"']") ;

						if( _statuss ){

							_this.opt.checkboxChild.prop('checked',true) ;

							currlabel.addClass('s-checkbox');

						}else{
							
							_this.opt.checkboxChild.prop('checked',false) ;

							currlabel.removeClass('s-checkbox');

						}

					});		
					
				});

				_this.opt.checkboxChild.change(function(){
				

					if( !$(this).prop('checked') ){

						_this.opt.checkboxParent.prop('checked',false) ;

						var currid = _this.opt.checkboxParent.attr('id');

						var currlabel = $("label[for='"+currid+"']") ;

						currlabel.removeClass('s-checkbox');

					} 

				});

		}
		
	}


};

})(jQuery);