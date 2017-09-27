'use strict'

/**
 * The ACME Personnel need a way to create the flight route/schedules
 * The mapping is being done to CreateFlight transaction in the .cto 
 * info = object that has a structure defined in the model
 * @param {org.acme.airline.flight.CreateFlight} info
 * @transaction
 */
function createFlight(info){
    var factory = getFactory();
    var NS = 'org.acme.airline.flight';
    var TYPE = 'Flight';

    var flightResource = factory.newResource(NS, TYPE, info.flightNumber);
    flightResource.schedule=info.schedule;
    flightResource.passengerSeats=[];
    flightResource.crewSeats=[];
    flightResource.route = info.route;

    return getAssetRegistry(NS+'.'+TYPE).then(function(flightRegistry){
        return flightRegistry.add(flightResource);
    });
}