(function(){
    'use strict';

    let App = angular.module("app");

    App.controller("diaryController", diaryController);
    diaryController.$inject = ["$transitions"];

    function diaryController($transitions) {
        let ctrl = this;

        ctrl.calendarOptions = {
            calendarView: "month",
            viewDate: moment(),
            viewTitle: "Your Diary",
            events: [],
            selectedDate: new Date()
        }

        ctrl.dummy = "Your diary entry";

        ctrl.original = [
            {
                date: new Date(moment().hour(0).minutes(0).seconds(0).milliseconds(0)),
                heading: "Lorem",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            },
            {
                date: new Date(moment().hour(0).minutes(0).seconds(0).milliseconds(0).subtract(1, "day")),
                heading: "Ipsum dolor",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        ];

        ctrl.data = JSON.parse(JSON.stringify(ctrl.original));

        ctrl.getCurrentDate = function() {
            return new Date(ctrl.calendarOptions.viewDate);
        }

        ctrl.changeDate = function(calendarDate) {
            ctrl.calendarOptions.selectedDate = calendarDate;
        }

        ctrl.findDateIndex = function(dateArray, target) {
            for(let i= 0; i < dateArray.length; i++) {
                if(moment.duration(moment(dateArray[i]).diff(moment(target))).days() == 0) {
                    return i;
                }
            }

            return -1;
        }

        ctrl.getDiaryInfo = function() {
            let index = ctrl.findDateIndex(ctrl.data.map(d => d.date), ctrl.calendarOptions.selectedDate);
            if(index != -1)
                return index;

            ctrl.data.push({
                date: new Date(ctrl.calendarOptions.selectedDate),
                heading: moment(ctrl.calendarOptions.selectedDate).format("MMMM Do"),
                text: "Your diary entry"
            });
            return ctrl.data.length - 1;
        }

        $transitions.onBefore({from: "diary"}, transition => {
            for(let i = 0; i < ctrl.data.length; i++) {
                let index = ctrl.findDateIndex(ctrl.original.map(d => d.date), ctrl.data[i].date)
                if(index == -1) {
                    console.log(`Data added for ${ctrl.data[i].date}`);
                } else if(JSON.stringify(ctrl.data[i]) != JSON.stringify(ctrl.original[i])) {
                    console.log(`Data changed for ${ctrl.data[i].date}`);
                }
            }
        });
    }

})();