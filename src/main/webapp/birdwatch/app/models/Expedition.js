/**
 * @class Expedition
 * @extends Ext.data.Model
 *
 * Main object to be submitted when registering an Expedition with information and observations
 */
Ext.regModel("Search", {
    fields: [
        {name: "id",    type: "int",
         name: "expeditionInformation", type: "ExpeditionInformation"}
    ],

    hasMany: {
        model: "Observation",
        name : 'observation'
    }

});