/**
 * @class ExpeditionInformation
 * @extends Ext.data.Model
 *
 * Information about where, who etc.
 */
Ext.regModel("ExpeditionInformation", {
    fields: [
        {
            name: "id",    type: "int",
            name: "location", type :"string", //for now string - tbd gps-location
            name: "reporter", type :"string", //full name of person reporting
            name: "observationdate", type: "date",
            name: "observationstart", type: "time",
            name: "observationend", type: "time",
            name: "isOwnObservation", type: "int", //boolean int?!
            name: "comment", type: "string"
        }
    ]
});