jQuery(function($){
	$(".btn-rules-terms").on('click', function(event) {
		$(".pop,.pop-up").fadeIn();
	});
	$(".pop-close").on('click', function(event) {
		$(".pop,.pop-up").fadeOut();
	});

	$(".time-machine").delay(1300).queue(function(next){
		$(this).show().addClass('timeTravel');
		next();
	})

	$(".ripple").delay(100).queue(function(next){
		$(this).show();
		next();
	})

	$(".g1,.g2,.g3,.g4,.g5,.g6").on('mouseenter', function(event) {
		$("#wrapper > div:last-child").fadeIn();
	}).on('mouseleave', function(event) {
		$("#wrapper > div:last-child").fadeOut();
	});

	// content entrance animations

	$(".title").delay(100).queue(function(next){
		$(this).show().addClass('bounce-in-top');
		next();
	})

	$(".home,.sound").delay(100).queue(function(next){
		$(this).show().addClass('slide-in-right');
		next();
	})

	$("#Login").delay(100).queue(function(next){
		$(this).fadeIn().addClass('slide-in-right');
		next();
	})

	$(".act-obj").delay(300).queue(function(next){
		$(this).show().addClass('slide-in-left');
		next();
	})

	$(".btn-rules-terms").delay(300).queue(function(next){
		$(this).show().addClass('slide-in-right');
		next();
	})

	$(".games").delay(450).fadeIn();

	$(".g-set1").delay(500).queue(function(next){
		$(this).show().addClass('slide-in-left');
		next();
	})

	$(".g-set2").delay(500).queue(function(next){
		$(this).show().addClass('slide-in-right');
		next();
	})

	$(".activities").delay(700).queue(function(next){
		$(this).show().addClass('slide-in-left');
		next();
	})

	$(".table").delay(900).queue(function(next){
		$(this).show().addClass('slide-in-right');
		next();
	})

	$(".footer").delay(1000).fadeIn();

		

    // BGM
     $('<embed id="bgm" src="audio/bgm.mp3"></embed>').prependTo('body');
    var bgm = setInterval(function(){
      $("#bgm").remove();
      $('<embed id="bgm" src="audio/bgm.mp3"></embed>').prependTo('body');
    }, 61000 );

    $(".sound").on('click', function(event) {
      $("embed#bgm").remove();
      clearInterval(bgm);
      if($(this).hasClass('soundOn')){
        $(this).addClass('soundOff');
        $(this).removeClass('soundOn');
        $("audio").get(0).pause();
      }
      else{
        $(this).addClass('soundOn');
        $(this).removeClass('soundOff');
        $("audio").get(0).play();
      }
    });




	setInterval(function(){
		console.log('adsf');
		if($(".time-machine").hasClass('timeTravel')){
			console.log('t');
			$(".time-machine").removeClass('timeTravel').addClass('timeTravel2');
		}else{
			console.log('f');
			$(".time-machine").removeClass('timeTravel2').addClass('timeTravel');
		}
		
	},5000);


});


 


window.onload = function() {
  'use strict';

  // create a Scene
  var scn = new DivSugar.Scene().setSize(800, 600).appendTo(document.getElementById('wrapper'));

  // maximize the Scene size
  function resize() { scn.adjustLayout(window.innerWidth, window.innerHeight, 'contain'); }
  window.addEventListener('resize', resize, true);
  resize();

  // define an animation class which inherits the Task class
  function Coin() {
    // call the base class's constructor
    this.constructor.uber.constructor();

    this.vec = new DivSugar.Vector();
    this.pos = new DivSugar.Vector(Math.random() * 800, 900, Math.random() * 800 - 1000);
    this.vel = new DivSugar.Vector(Math.random() * 6 - 3, Math.random() * 8 - 20, Math.random() * 6 - 3);
    this.rot = new DivSugar.Vector(Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.1);

    this.center = new DivSugar.Node().setPosition(this.pos)
      .rotate(Math.random() * 360, Math.random() * 360, Math.random() * 360).appendTo(scn);

    this.front = new DivSugar.Node().setSize(15, 15).setPosition(-100, -100, 0).setBackface(false)
      .setImage('img/coin.png').setImageClip(0, 0, 0.5, 1).appendTo(this.center);

    this.back = new DivSugar.Node().setSize(15, 15).setPosition(100, -100, 0).setBackface(false)
      .setImage('img/coin.png').setImageClip(0.5, 0, 1, 1).rotate(0, 180, 0).appendTo(this.center);
  }

  DivSugar.inherit(Coin, DivSugar.Task);

  Coin.prototype.onUpdate = function() {
    this.vel.y += this.deltaTime * 0.01;
    this.pos.add(this.vec.set(this.vel).mul(this.deltaTime * 0.06));
    this.center.setPosition(this.pos).rotate(this.deltaTime * this.rot.x, this.deltaTime * this.rot.y, this.deltaTime * this.rot.z);

    // when fall enough, destroy this Task and create an another Task
    if (this.pos.y > 1000) {
      this.destroy();
      new Coin().appendTo(DivSugar.rootTask);
    }
  };

  Coin.prototype.onDestroy = function() { scn.remove(this.center); };

  // create and register instances of the animation class
  for (var i = 0; i < 30; i++) { new Coin().appendTo(DivSugar.rootTask); }
};
