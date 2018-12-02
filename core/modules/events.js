// MAP RELATED EVENTS
function map(data, settings, render) {

   // LISTEN FOR KEY-UPS
   $(document).on('keyup', (event) => {

      // WHEN 'A' IS PRESSED
      if (event.keyCode == 65) {
         
         // THE PREVIOUS BLOCK
         var previous = parseInt(data.current) - 1;

         // IF IT FALLS WITHIN RANGE, RENDER MAP AGAIN
         if (previous >= 0) { data = render.map(data, settings, previous); }

      // WHEN 'D' IS PRESSED
      } else if (event.keyCode == 68) {
      
         // THE NEXT BLOCK
         var next = parseInt(data.current) + 1;

         // IF IT FALLS WITHIN RANGE, RENDER MAP AGAIN
         if (next < data.stats.blocks) { data = render.map(data, settings, next); }
      }
   });

   // WHEN THE INPUT RANGE IS USED
   $('#range').on('change', () => { data = render.map(data, settings, $('#range').val()); });

   // DISABLE ARROW KEYS WHEN THE INPUT RANGE IS SELECTED
   $(document).on('keyup keydown', (event) => { if (event.keyCode == 37 || event.keyCode == 38 ||event.keyCode == 39 || event.keyCode == 40) { event.preventDefault(); } });

   // RETURN UPDATED DATA OBJECT
   return data;
}

// GENERAL EVENTS
function general(settings) {

   // FIND MAP COORD ON CLICK
   $('#map').on('click', (event) => {

      // CHECK THAT A WAYPOINT WASNT CLICKED
      if (event.target.tagName != 'IMG') {

         // MAP HEIGHT & WIDTH PROPS
         var map = {
            width: event.currentTarget.clientWidth,
            height: event.currentTarget.clientHeight
         }

         // CLICKED COORDS
         var clicked = {
            x: event.offsetX,
            y: event.offsetY,
         }

         // FIGURE OUT % COORS
         var x = ((clicked.x / map.width) * 100).toFixed(0);
         var y = ((clicked.y / map.height) * 100).toFixed(0);

         // LOG THEM OUT
         log(x + '.' + y)
      }
   });

   // PRELOAD EVENT
   $('#show-preload').on('click', () => {

      // MAKE SURE CHECK PROPERTY IS FALSE
      if (settings.windows.preload == 0) {

         // CHANGE THE SETTING PROPERTY TO BLOCK FURTHER EXECUTIONS
         settings.windows.preload = 1;

         // ADD THE LOADING SELECTOR TO THE PROMPT TABLE & TO TOGGLE THE DISPLAY ON
         $('#prompt-inner').html('<div id="loading"><div class="lds-css ng-scope"><div style="width:100%;height:100%" class="lds-rolling"><div></div></div></div></div>');
         $('#prompt').css('display', 'table');

         // WAIT 50MS TO SMOOTHEN CSS TRANSITION
         sleep(50).then(() => {
         
            // GRADUALLY TURN OPACITY ON
            $('#prompt').css('opacity', '1');

            // LIST OUT ALL ZONES
            var zones = [
               'alterac',
               'arathi',
               'ashenvale',
               'azshara',
               'badlands',
               'barrens',
               'blasted',
               'darkshore',
               'darnassus',
               'deadwind',
               'desolace',
               'duskwood',
               'dustwallow',
               'elwynn',
               'epl',
               'farmfarmfarm',
               'felwood',
               'feralas',
               'hillsbrad',
               'hinterlands',
               'ironforge',
               'loch',
               'moonglade',
               'morogh',
               'needles',
               'redridge',
               'searing',
               'steppes',
               'stonetalon',
               'stormwind',
               'stv',
               'swamp',
               'tanaris',
               'teldrassil',
               'tirisfal',
               'ungoro',
               'westfall',
               'wetlands',
               'winterspring',
               'wpl'
            ];

            // PROMISE CONTAINER
            var promises = [];

            // APPEND IN THE PRELOAD SELECTOR
            $('body').append('<div id="preload-container"></div>');

            // GENERATE & PUSH A LOADING PROMISE FOR EACH ZONE
            zones.forEach(zone => { promises.push( zone_promise(zone) ); });

            // WAIT FOR ALL PROMISES TO BE RESOLVED
            Promise.all(promises).then(() => {

               // LOG THAT THE TASK IS COMPLETE
               log('Preload complete!');

               // UPDATE THE PRELOAD LINK
               $('#show-preload').removeAttr('class');
               $('#show-preload').attr('id', 'disabled');
               $('#disabled').text('Backgrounds Loaded');

               // GRADUALLY TURN OPACITY OFF
               $('#prompt').css('opacity', '0');

               // WAIT 200MS FOR THE FADE
               sleep(300).then(() => {

                  // TOGGLE THE PROMP DISPLAY OFF & REMOVE THE LOADING SELECTOR ENTIRELY
                  $('#prompt').css('display', 'none');
                  $('#loading').remove();
               });
            });
         });
      }
   });

   // FAQ EVENT
   $('#show-faq').on('click', () => {

      // MAKE SURE CHECK PROPERTY IS FALSE
      if (settings.windows.faq == 0) {

         // TOGGLE THE PROMPT DISPLAY ON
         $('#prompt').css('display', 'table');

         // LIST OF QUESTIONS & ANSWERS
         var questions = [
            ['Is the route based on someone elses work?', 'No'],
            ['Is it final/perfect?', 'No, but very easy to modify'],
            ['Would I like to collaborate?', 'Absolutely'],
            ['How can I contribute?', 'The project is open source <a href="https://github.com/wickstjo/vanilla-questing" target="_blank">on GitHub</a>'],
            ['Will you route for non-humans?', 'Yes'],
            ['Will there be a horde version?', 'Yes, probably during xmas'],
            ['How about dungeon "quest run" guides?', 'Yes, likely in short video format'],
            ['Do I want feedback/suggestions?', 'Yes, it\'s essential'],
            ['Both mechanical and game related?', 'Yes'],
            ['Will this require a login?', 'No, everything runs locally'],
            ['My question wasn\'t answered!', 'Try the <a href="https://www.reddit.com/r/classicwow/comments/9zxi0v/inbrowser_160_questing_guide_for_classic/?" target="_blank">Reddit Thread</a>'],
            ['How do I get in touch?', 'Strafir#9133 on <a href="https://discord.gg/classicwow" target="_blank">Discord</a>']
         ];

         // GENERATE A FAQ SELECTOR
         var selector = `
            <div id="faq">
            <div id="title">Frequently Asked Questions</div>
            <div id="content">
         `;

         // LOOP THROUGH QUESTIONS & APPEND IN A ROW FOR EACH ONE
         questions.forEach(row => {
            selector += `
               <div id="question">
                  <div class="split">
                     <div id="left">` + row[0] + `</div>
                     <div id="right">` + row[1] + `</div>
                  </div>
               </div>
            `;
         });

         // STITCH ON THE SELECTORS ENDING
         selector += '</div></div>';

         // RENDER THE SELECTOR INTO THE PROMPT WINDOW
         $('#prompt-inner').html(selector);

         // GRADUALLY TURN THE OPACITY ON AFTER 50MS -- TO SMOOTHEN TRANSITION
         sleep(50).then(() => { $('#prompt').css('opacity', '1'); });

         // WAIT UNTIL THE FADE ENDS & SET THE SETTINGS PROPERTY TO TRUE
         sleep(300).then(() => { settings.windows.faq = 1; })
      }
   });

   // LISTEN FOR KEY PRESSES
   $(document).on('keyup', (evt) => {

      // WHEN 'ESC' IS PRESSED
      if (evt.keyCode == 27) {

         // MAKE SURE CHECK PROPERTY IS FALSE
         if (settings.windows.faq == 1) {

            // GRADUALLY TURN OPACITY OFF
            $('#prompt').css('opacity', '0');

            // WAIT 300 MS, THEN TOGGLE THE PROMPT DISPLAY OFF & SET THE SETTINGS PROPERTY TO FALSE
            sleep(300).then(() => {
               $('#prompt').css('display', 'none');
               settings.windows.faq = 0;
            });
         }
      }

      // WHEN 'F' IS PRESSED
      if (evt.keyCode == 70) {

         // CURRENT DISPLAY VALUE
         var display = $('#sidepanel').css('display');

         // TOGGLE SIDEPANEL & WAYPOINT NUMBERS ON
         if (display == 'none') {
            $('#sidepanel').css('display', 'block');
            $('.waypoint-num').css('display', 'block');

         // TOGGLE SIDEPANEL & WAYPOINT NUMBERS OFF
         } else {
            $('#sidepanel').css('display', 'none');
            $('.waypoint-num').css('display', 'none');
         }
      }

   });

   // SHOW LEGEND EVENT
   $('body').on('mouseover', '#show-legend', (event) => {

      // IF LEGEND SELECTOR DOESNT EXIST FROM BEFORE
      if ($('#legend').length == 0) {

         // LIST OF MARKERS & THEIR MEANING
         var scheme = [
            ['blue', 'Central Hub'],
            ['yellow', 'Quest'],
            ['red', 'Objective'],
            ['green', 'Flightpath'],
            ['purple', 'Travel']
         ];

         var other = [
            ['D', 'Dungeon'],
            ['E', 'Elite'],
            ['F', 'Escort'],
            ['R', 'Random Drop'],
            ['C', 'Class']
         ]

         // GENERATE A LEGEND SELECTOR
         var selector = '<div id="legend"><div id="legend-inner">';

         // LOOP THROUGH SCHEMES & ADD A ROW FOR EACH
         scheme.forEach(row => {
            selector += `
               <div class="category">
                  <div class="split">
                     <div id="left"><img src="interface/img/waypoints/` + row[0] + `.png"></div>
                     <div id="right">` + row[1] + `</div>
                  </div>
               </div>
            `;
         });

         // LOOP THROUGH OTHERS & ADD A ROW FOR EACH
         other.forEach(row => {
            selector += `
               <div class="category">
                  <div class="split">
                     <div id="left">[` + row[0] + `]</div>
                     <div id="right">` + row[1] + `</div>
                  </div>
               </div>
            `;
         });

         // STICH ON THE ENDING
         selector += '</div></div>';

         // APPEND THE SELECTOR IN
         $('#map').append(selector);
      }

      // ASSIST VARS FOR POSITION CALIBRATION
      var height = parseFloat($('#legend').css('height'));
      var width = parseFloat($('#show-legend').css('width'));
      var offset = 10;

      // CALIBRATE RIGHT XY COORDINATES
      var x = event.target.offsetLeft - (width / 2);
      var y = event.target.offsetTop - (height + offset);

      // EXECUTE CSS CHANGES & SHOW THE DATA
      $('#legend').css('left', x);
      $('#legend').css('top', y);
      $('#legend').css('display', 'inline-block');
   });

   // HIDE LEGEND EVENT
   $('body').on('mouseout', '#show-legend', () => { $('#legend').css('display', 'none'); });

   // RETURN UPDATED SETTINGS OBJECT
   return settings;
}

// GENERATE A PROMISE FOR A ZONE -- FOR PRELOADING
function zone_promise(zone) {
   return new Promise((resolve, reject) => {

      // CREATE NEW IMAGE OBJECT FOR THE ZONE
      var img = new Image();
      img.id = zone;

      // SET ITS SOURCE AS THE MAP
      img.src = 'interface/img/maps/' + zone + '.png';

      // APPEND IT TO THE CONTAINER
      $('#preload-container').append(img);

      // RESOLVE THE PROMISE AFTER ITS DONE LOADING
      $('#preload-container #' + zone).on('load', () => { resolve(); })
   });
}

// EXPORT FUNCTIONS
module.exports = {
   map: map,
   general: general
}