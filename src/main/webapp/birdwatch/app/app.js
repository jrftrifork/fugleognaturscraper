/**
 * This file sets up the Twitter application. We register an application called 'twitter' - this automatically sets up
 * a global variable with the same name.
 *
 * The most important part of this is the launch function, which is called automatically when the page has finished
 * loading. In this case, we render a Viewport class (see app/views/Viewport.js) - this is just the main panel in the
 * app which houses the saved searches (on the left) and the search results (center).
 *
 * It also listens for the selectionchange event, which is fired when the user taps on one of the saved Searches. When
 * this happens we use the framework's history support to show the search results. When the user refreshes or comes back
 * later they'll be taken right back to where they were.
 *
 * The defaultUrl is used if the user has come to the app for the first time and has nothing in the browser url history.
 * In this case we dispatch through to the searches controller's 'first' action to show the first saved search.
 *
 * The defaultTarget config tells the controllers where to render views to by default. The Viewport class we create at
 * launch is set at the default render target (see app/views/Viewport.js - it sets its id to "viewport"), so whenever
 * we call 'render' in a controller, the view will be rendered to the viewport container by default.
 *
 */
var app = new Ext.Application({
    name         : "Birdwatch",

    launch: function () {
        Birdwatch.views.expeditionViewToolbar = new Ext.Toolbar({
            id: 'expeditionViewToolbar',
            title: 'Indtast tur',
            items: [
                { xtype: 'spacer' },
                { xtype: 'spacer' },
                {
                    text: 'Send',
                    ui: 'action',
                    handler: function () {
                        var expeditionEditor = Birdwatch.views.expeditionEditor;
                        var expedition = expeditionEditor.getRecord();
                        // Update the note with the values in the form fields.
                        expeditionEditor.updateRecord(expedition);

                        var now = new Date();
                        var id = now.getTime();

                        var expeditionToSave = Ext.ModelMgr.create(
                          { id: id,
                              observationdate: now,
                              observationstart: now.getTime(),
                              observationend: now.getTime(),
                              reporter: user,
                              isOwnObservation: true,
                              location: 'todoLocation',
                              species: 'Solsort'
                          },
                          'Expedition');
                        alert(expeditionToSave.species);


                        expeditionToSave.save();
                        Birdwatch.views.viewport.setActiveItem('confirmationView', { type: 'slide', direction: 'left' });
                    }
                }
            ]

        });

        Birdwatch.views.confirmationView = new Ext.Panel({
            id: 'confirmationView',
            fullscreen: true,
            html: 'Tak for din observation'
        });

        Birdwatch.views.expeditionEditor = new Ext.form.FormPanel({
            id: 'expeditionEditor',
            items: [
                {
                    xtype: 'textfield',
                    name: 'species',
                    label: 'Art',
                    required: true
                },
                {
                    xtype: 'datepickerfield',
                    name: 'observationdate',
                    label: 'Dato',
                    required: true
                },
                {
                    xtype: 'textfield',
                    name: 'reporter',
                    label: 'Observatør',
                    required: true
                },
                {
                    xtype: 'textareafield',
                    name: 'comment',
                    label: 'Bemærkning'
                }
            ],
            dockedItems: [Birdwatch.views.expeditionViewToolbar]
        });

        Birdwatch.views.viewport = new Ext.Panel({
              fullscreen: true,
              layout: 'card',
              cardAnimation: 'slide',
              items: [Birdwatch.views.expeditionEditor, Birdwatch.views.confirmationView]
          });

        var user = 'jakobfaerch';
        var now = new Date();
        var id = now.getTime();
        var expedition = Ext.ModelMgr.create(
          { id: id,
              observationdate: now,
              observationstart: now.getTime(),
              observationend: now.getTime(),
              reporter: user,
              isOwnObservation: true,
              location: 'todoLocation',
              species: 'Solsort'
          },
          'Expedition');

        Birdwatch.views.expeditionEditor.load(expedition);
        Birdwatch.views.viewport.setActiveItem('expeditionEditor', {type: 'slide', direction: 'left'});
    }
})


