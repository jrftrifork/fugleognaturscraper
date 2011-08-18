/**
 * @class birdwatch.views.ExpeditionInformationView
 * @extends Ext.Panel
 *
 * Contains a Search List instance which lists all of the saved Searches. Also contains a form docked in a top
 * toolbar to allow the user to add more searches.
 *
 * This view class is mostly a wrapper around the List. If List was able to accept dockedItems we would simply
 * add the toolbar to the List and could remove this class altogether.
 *
 */
birdwatch.views.ExpeditionInformationView = Ext.extend(Ext.Panel, {

    layout: 'fit',

    initComponent: function() {
        Ext.apply(this, {
            items: [
                {
                    xtype: 'ExpeditionInformation' //this is the custom Component we created in app/views/ExpeditionStore.js
                }
            ],

            dockedItems: {
                dock   : 'top',
                xtype  : 'form',
                cls    : 'x-toolbar-dark',
                baseCls: 'x-toolbar',
                height : 45,
                itemId : 'newQueryForm',

                listeners: {
                    el: {
                        scope : this,
                        submit: this.onSubmit
                    }
                },

                items: {
                    xtype : 'text',
                    name  : 'reporter',
                    itemId: 'reporter',
                    value: "HELLO",
                    placeHolder: 'Observatør (*)'
                }
            }
        });

        birdwatch.views.ExpeditionInformation.superclass.initComponent.apply(this, arguments);
    },

    /**
     * @private
     * Handler for the form submit event. Here we check to see if the query the user entered is already present
     * in the Store - if it isn't, we add it.
     */
    onSubmit: function() {

        //FIXME!!!
        var list   = this.down('.searchesList'),
            field  = this.down('#newQueryField'),
            store  = list.store,
            query  = field.getValue(),
            index  = store.find('query', query, 0, false, false, true),
            instance;

        if (index == -1) {
            instance = store.create({query: query});
        } else {
            instance = store.getAt(index);
        }

        field.setValue("");

        list.getSelectionModel().select(instance);
    }
});

Ext.reg('expeditionView', birdwatch.views.ExpeditionInformationView);