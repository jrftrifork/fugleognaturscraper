/**
 * @class Observation
 * @extends Ext.data.Model
 *
 * Information about where, who etc.
 */
Ext.regModel("Observation", {
    fields: [
        {
            name: "id",    type: "int",
            name: "description", type :"string" //for now only freetekst string - tbd gps-location
        }
    ]
});