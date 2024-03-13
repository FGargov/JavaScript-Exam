import {expect} from "chai";
import {planYourTrip} from '../planYourTrip.js';

describe("Plan Your Trip Tests", function() {
    describe("Test choosingDestination() method", function() {
        it("Should throw an error if the year is not 2024", function() {
            expect(() => planYourTrip.choosingDestination("Ski Resort", "Winter", 2021)).to.throw("Invalid Year!");
        });

        it("Should throw an error if the destination is not Ski Resort", function() {
            expect(() => planYourTrip.choosingDestination("Beach", "Winter", 2024)).to.throw("This destination is not what you are looking for.");
        });

        it("Should return a positive message for Ski Resort in the Winter of 2024", function() {
            expect(planYourTrip.choosingDestination("Ski Resort", "Winter", 2024)).to.equal("Great choice! The Winter is the perfect time to visit the Ski Resort.");
        });

        it("Should suggest visiting in the Winter for Ski Resort if another season is chosen", function() {
            expect(planYourTrip.choosingDestination("Ski Resort", "Summer", 2024)).to.equal("Consider visiting during the Winter for the best experience at the Ski Resort.");
        });

        it("Should return a positive message for Ski Resort and Winter season in 2024", function() {
            expect(planYourTrip.choosingDestination("Ski Resort", "Winter", 2024)).to.equal("Great choice! The Winter is the perfect time to visit the Ski Resort.");
        });

        it("Should suggest visiting in Winter for Ski Resort if chosen in Summer 2024", function() {
            expect(planYourTrip.choosingDestination("Ski Resort", "Summer", 2024)).to.equal("Consider visiting during the Winter for the best experience at the Ski Resort.");
        });

        it("Should throw an error for a destination other than 'Ski Resort' in Winter 2024", function() {
            expect(() => planYourTrip.choosingDestination("Beach Resort", "Winter", 2024)).to.throw("This destination is not what you are looking for.");
        });

        it("Should return a positive message for Ski Resort and Winter season in a leap year 2024", function() {
            expect(planYourTrip.choosingDestination("Ski Resort", "Winter", 2024)).to.equal("Great choice! The Winter is the perfect time to visit the Ski Resort.");
        });

        it("Should handle destination names case-insensitively", function() {
            expect(planYourTrip.choosingDestination("ski resort", "Winter", 2024)).to.equal("Great choice! The Winter is the perfect time to visit the Ski Resort.");
        });

        it("Should reject invalid season inputs with a specific error message", function() {
            expect(() => planYourTrip.choosingDestination("Ski Resort", "Autumn", 2024)).to.throw("Invalid season for Ski Resort.");
        });
    });

    describe("Test exploreOptions() method", function() {
        it("Should remove the activity at the specified index", function() {
            let activities = ["Skiing", "Snowboarding", "Winter Hiking"];
            expect(planYourTrip.exploreOptions(activities, 1)).to.equal("Skiing, Winter Hiking");
        });

        it("Should throw an error if activities is not an array", function() {
            expect(() => planYourTrip.exploreOptions("Skiing", 0)).to.throw("Invalid Information!");
        });

        it("Should throw an error if activityIndex is out of bounds", function() {
            let activities = ["Skiing", "Snowboarding"];
            expect(() => planYourTrip.exploreOptions(activities, 3)).to.throw("Invalid Information!");
        });

        it("Should throw an error if activityIndex is not an integer", function() {
            let activities = ["Skiing", "Snowboarding"];
            expect(() => planYourTrip.exploreOptions(activities, 1.5)).to.throw("Invalid Information!");
        });

        it("Should throw an error if the activityIndex is negative", function() {
            let activities = ["Skiing", "Snowboarding", "Winter Hiking"];
            expect(() => planYourTrip.exploreOptions(activities, -1)).to.throw("Invalid Information!");
        });

        it("Should throw an error if the activities array is empty", function() {
            let activities = [];
            expect(() => planYourTrip.exploreOptions(activities, 0)).to.throw("Invalid Information!");
        });

        it("Should handle activities with special characters correctly", function() {
            let activities = ["Ski*ing", "Snowboarding", "Winter Hiking"];
            expect(planYourTrip.exploreOptions(activities, 0)).to.equal("Snowboarding, Winter Hiking");
        });

        it("Should return the original list if no index is specified for removal", function() {
            let activities = ["Skiing", "Snowboarding", "Winter Hiking"];
            expect(planYourTrip.exploreOptions(activities)).to.equal("Skiing, Snowboarding, Winter Hiking");
        });
    });

    describe("Test estimateExpenses() method", function() {
        it("Should calculate the travel cost correctly", function() {
            expect(planYourTrip.estimateExpenses(100, 5)).to.equal("The trip is budget-friendly, estimated cost is $500.00.");
        });

        it("Should return a message for expensive trips", function() {
            expect(planYourTrip.estimateExpenses(200, 5)).to.equal("The estimated cost for the trip is $1000.00, plan accordingly.");
        });

        it("Should throw an error if distance or fuel cost is not a positive number", function() {
            expect(() => planYourTrip.estimateExpenses(-100, 5)).to.throw("Invalid Information!");
            expect(() => planYourTrip.estimateExpenses(100, -5)).to.throw("Invalid Information!");
        });

        it("Should throw an error if distance or fuel cost is zero", function() {
            expect(() => planYourTrip.estimateExpenses(0, 5)).to.throw("Invalid Information!");
            expect(() => planYourTrip.estimateExpenses(100, 0)).to.throw("Invalid Information!");
        });

        it("Should throw an error if distanceInKilometers is a string", function() {
            expect(() => planYourTrip.estimateExpenses("100", 5)).to.throw("Invalid Information!");
        });

        it("Should throw an error if fuelCostPerLiter is a string", function() {
            expect(() => planYourTrip.estimateExpenses(100, "5")).to.throw("Invalid Information!");
        });
        it("Should correctly estimate expenses with floating point numbers", function() {
            expect(planYourTrip.estimateExpenses(99.99, 5)).to.equal("The trip is budget-friendly, estimated cost is $499.95.");
        });

        it("Should handle large numbers without losing precision", function() {
            expect(planYourTrip.estimateExpenses(2000, 7)).to.equal("The estimated cost for the trip is $14000.00, plan accordingly.");
        });

        it("Should validate that the number of days is a positive integer", function() {
            expect(() => planYourTrip.estimateExpenses(100, 0)).to.throw("Invalid Information!");
        });

        it("Should reject non-numeric values for both parameters with a specific error message", function() {
            expect(() => planYourTrip.estimateExpenses("a lot", "many")).to.throw("Invalid Information!");
        });

    });
});