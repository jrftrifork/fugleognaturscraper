/**
 * @class Expedition
 * @extends Ext.data.Model
 *
 * Main object to be submitted when registering an Expedition with information and observations
 */
Ext.regModel("Expedition", {
    idProperty: 'id',
    fields: [
        {name: "id",    type: "int",
         name: "location", type :"string", //for now string - tbd gps-location
         name: "reporter", type :"string", //full name of person reporting
         name: "observationdate", type: "date",
         name: "observationstart", type: "time",
         name: "observationend", type: "time",
         name: "isOwnObservation", type: "int", //boolean int?!
         name: "comment", type: "string",
         name: "species", type: "string"}        // species is redundant when we begin using the observation association, this field will die by then
    ],


    hasMany: {
        model: "Observation",
        name : 'observation'
    }
});