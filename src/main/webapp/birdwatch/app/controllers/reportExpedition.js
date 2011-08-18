/**
 * @class reportExpedition
 * @extends Ext.Controller
 * 
 * This controller is able to post Expeditions based on entered information
 * 
 */
Ext.regController("reportExpedition", {
    model: "Expedition",
    
    /**
     * Shows the first Search instance in the global Searches store (see app/stores/Search.js). If no Searches are
     * found, renders a message to the user asking them to add a search
     */
    report: function() {

            Ext.dispatch({
                controller: "reportExpedition",
                action    : "show",
                instance  : birdwatch
            })
    },
    
    /**
     * Shows the results of a given Search. Handles both a Search model instance being passed or a query string
     * @param {Object} options Config object expected to have either an instance or a query property
     */
    show: function(options) {
        Ext.getCmp('viewport').setActiveItem(list);
    }
});
