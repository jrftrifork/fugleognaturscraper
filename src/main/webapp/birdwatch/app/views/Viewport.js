/**
 * @class birdwatch.Viewport
 * @extends Ext.Panel
 * 
 * The viewport is the application's shell - the parts of the UI that don't change. In the Twitter app, we only ever
 * render a single view at a time, so we use a fullscreen card layout here. The other part of the UI is the search list
 * on the left, which we add as a docked item.
 * 
 * Because the searchesList created below bubbles its selectionchange event, the object that creates this Viewport 
 * (the Application instance created in app/app.js) can attach a listener to that event to initiate a new search.
 * 
 */
birdwatch.Viewport = Ext.extend(Ext.Panel, {
    id        : 'viewport',
    layout    : 'card',
    fullscreen: true,

    initComponent: function() {
        Ext.apply(this, {
            dockedItems: [
                {
                    dock : 'left',
                    xtype: 'expeditionView',
                    width: 250
                }
            ]
        });

        birdwatch.Viewport.superclass.initComponent.apply(this, arguments);
    }
});

