function loadCalendar(e){
    //if (parent.querySelector(".calendar") != null){
        //var e = parent.querySelector(".calendar");
        var dp = new DatePicker(e);
        return dp;
    //}
}

class DatePicker{
    currentDate; e; listeners;
    constructor(e){
        this.e = e;
        this.listeners = {};
        this.currentDate = new Date();
        this.#createCalendar(e);
    }

    addEventListener(et, callback){
        var types = ["datePicked"];
        if(types.includes(et)){
            if(this.listeners[et] == null){
                this.listeners[et] = new Array();
            }
            this.listeners[et].push(callback);
        } else{
            console.log("Invalid event type for DatePicker: " + et);
        }
    }

    removeEventListeners(et){
        var obj = {};
        for(const key of Object.keys(this.listeners)){
            if(key != et) obj[key] = this.listeners[key];
        }
        this.listeners = obj;
        //console.log(this.listeners);
    }

    removeEventListener(et, callback){
        if(this.listeners[et] != null && this.listeners[et].length > 0){
            var arr = removeFromArray(callback, this.listeners[et]);
            if(arr.length == 0){
                this.removeEventListeners(et);
            } else{
                this.listeners[et] = arr;
            }
            //console.log(this.listeners[et]);
        }
    }

    setDate(d){
        this.#clearCalendar(this.e);
        this.#createMonthView(this.e, d);
    }

    #createCalendar(e){
        this.#createMonthView(e, this.currentDate);
    }

    #clearCalendar(e){
        e.querySelectorAll("*").forEach((child) => {
            child.remove();
        });
    }

    async #createMonthView(e, d){
        var thisObj = this;
        this.#clearCalendar(e);
        
        var month = d.getMonth();
        var year = d.getFullYear();
    
        applyStyle(e, {"display": "flex", "flex-direction": "column", "overflow": "hidden", "box-sizing": "border-box", "width": "100%", "height": "100%",
            "background-color": "white", "padding": "15px", "border-radius": "24px", "box-shadow": "2px 2px 4px rgba(0, 0, 0, 0.35)"});
    
        //DIV of the first row, which contains the YEAR label, the MONTH label, and the two ARROWS.
        var frDiv = document.createElement("div");
        applyStyle(frDiv, {"display": "flex", "flex-direction": "row", "padding-bottom": "10px"});
    
        var yearDiv = document.createElement("div");
        applyStyle(yearDiv, {"display": "flex", "padding": "2px 6px", "background-color": "black", "cursor": "pointer",
            "border-radius": "24px", "flex": "1", "flex-direction": "row", "justify-content": "center", "align-items": "center"});
        yearDiv.addEventListener("click", () => {
            thisObj.#createYearsView(e, year);
        });
        var yearP = document.createElement("p");
        yearP.innerText = d.getFullYear();
        applyStyle(yearP, {"margin": "0", "font-family": "Roboto Bold", "font-size": "24px", "color": "white"});
        yearDiv.appendChild(yearP);
        frDiv.appendChild(yearDiv);
    
        var monthDiv = document.createElement("div");
        applyStyle(monthDiv, {"display": "flex", "flex": "2", "flex-direction": "row", "justify-content": "center", "align-items": "center"});
        var monthP = document.createElement("p");
        monthP.innerText = monthToText(d.getMonth());
        applyStyle(monthP, {"margin": "0", "font-family": "Roboto Bold", "font-size": "20px", "cursor": "pointer"});
        monthP.addEventListener("click", function(){thisObj.#createYearView(e, year)});
    
        var arrDiv = document.createElement("div");
        applyStyle(arrDiv, {"display": "flex", "flex": "1", "flex-direction": "row", "justify-content": "center", "align-items": "center"});
        var arrLeft = await elementFromUrl("assets/icons/arrow.svg");
        applyStyle(arrLeft, {"fill": "#007aff", "width": "14px", "height": "14px",
            "transform": "rotate(45deg)", "cursor": "pointer"});
        arrLeft.addEventListener("click", () => {
            if(month > 0){
                month--;
            } else{
                month = 11;
                year--;
            }
            monthP.innerText = monthToText(month);
            yearP.innerText = year;
            applyStyle(centerMonth, {"-webkit-transition": "-webkit-transform .25s", "-webkit-transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(centerMonth, {"transition": "transform .25s", "transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(nextMonth, {"-webkit-transition": "none", "-webkit-transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(nextMonth, {"transition": "none", "transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(previousMonth, {"-webkit-transition": "-webkit-transform .25s", "-webkit-transform": "translate3d(0, 0, 0)"});
            applyStyle(previousMonth, {"transition": "transform .25s", "transform": "translate3d(0, 0, 0)"});
            var helper = centerMonth;
            centerMonth = previousMonth;
            previousMonth = nextMonth;
            nextMonth = helper;
            previousMonth.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            nextMonth.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            thisObj.#buildMonth(previousMonth, new Date(year, month-1, thisObj.currentDate.getDate()));
            thisObj.#buildMonth(nextMonth, new Date(year, month + 1, thisObj.currentDate.getDate()));
        });
        arrDiv.appendChild(arrLeft);
        var arrRight = await elementFromUrl("assets/icons/arrow.svg");
        applyStyle(arrRight, {"fill": "#007aff", "width": "14px", "height": "14px",
            "transform": "rotate(-135deg)", "cursor": "pointer"});
        arrRight.addEventListener("click", () => {
            if(month < 11){
                month++;
            } else{
                month = 0;
                year++;
            }
            monthP.innerText = monthToText(month);
            yearP.innerText = year;
            applyStyle(centerMonth, {"-webkit-transition": "transform .25s", "-webkit-transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(centerMonth, {"transition": "transform .25s", "transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(nextMonth, {"-webkit-transition": "transform .25s", "-webkit-transform": "translate3d(0, 0, 0)"});
            applyStyle(nextMonth, {"transition": "transform .25s", "transform": "translate3d(0, 0, 0)"});
            applyStyle(previousMonth, {"-webkit-transition": "none", "-webkit-transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(previousMonth, {"transition": "none", "transform": "translate3d(calc(100% + 15px), 0, 0)"});
            var helper = previousMonth;
            previousMonth = centerMonth;
            centerMonth = nextMonth;
            nextMonth = helper;
            previousMonth.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            nextMonth.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            thisObj.#buildMonth(previousMonth, new Date(year, month-1, thisObj.currentDate.getDate()));
            thisObj.#buildMonth(nextMonth, new Date(year, month + 1, thisObj.currentDate.getDate()));
        });
        var span = document.createElement("div");
        applyStyle(span, {"width": "8px"});
        arrDiv.appendChild(span);
        arrDiv.appendChild(arrRight);
    
        monthDiv.appendChild(monthP);
        frDiv.appendChild(monthDiv);
        frDiv.appendChild(arrDiv);
        e.appendChild(frDiv);
    
    
    
        var separator = document.createElement("div");
        applyStyle(separator, {"display": "flex", "height": "1px", "width": "100%", "background-color": "rgba(0, 0, 0, 0.35)"});
        e.appendChild(separator);
    
    
    
        var monthWrapper = document.createElement("div");
        applyStyle(monthWrapper, {"position": "relative", "display": "flex", "flex-direction": "row", "width": "100%", "height": "100%"});
        var centerMonth = document.createElement("div");
        applyStyle(centerMonth, {"position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildMonth(centerMonth, d);
        monthWrapper.appendChild(centerMonth);
        var previousMonth = document.createElement("div");
        applyStyle(previousMonth, {"transform": "translate3d(calc(-100% - 15px), 0, 0)", "position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildMonth(previousMonth, new Date(d.getFullYear(), d.getMonth() - 1, d.getDate()));
        monthWrapper.appendChild(previousMonth);
        var nextMonth = document.createElement("div");
        applyStyle(nextMonth, {"transform": "translate3d(calc(100% + 15px), 0, 0)", "position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildMonth(nextMonth, new Date(d.getFullYear(), d.getMonth() + 1, d.getDate()));
        monthWrapper.appendChild(nextMonth);
        e.appendChild(monthWrapper);
    }

    async #createYearView(e, y){
        var thisObj = this;
        e.querySelectorAll("*").forEach((child) => {
            child.remove();
        });
    
        var frDiv = document.createElement("div");
        applyStyle(frDiv, {"display": "flex", "justify-content": "center", "align-items": "center",
        "align-self": "stretch", "padding": "2px 0px 12px 0px"});
        var arrLeftDiv = document.createElement("div");
        var yearDiv = document.createElement("div");
        var arrRightDiv = document.createElement("div");
        for(const divel of [arrLeftDiv, yearDiv, arrRightDiv]){
            applyStyle(divel, {"display": "flex", "justify-content": "center", "align-items": "center", "flex": "1"});
        }
        applyStyle(yearDiv, {"flex": "2"});
        var arrLeft = await elementFromUrl("assets/icons/arrow.svg");
        var arrRight = await elementFromUrl("assets/icons/arrow.svg");
        applyStyle(arrLeft, {"fill": "#007aff", "width": "14px", "height": "14px",
        "transform": "rotate(45deg)", "cursor": "pointer"});
        applyStyle(arrRight, {"fill": "#007aff", "width": "14px", "height": "14px",
        "transform": "rotate(-135deg)", "cursor": "pointer"});
        var yearP = document.createElement("p");
        yearP.innerText = y;
        applyStyle(yearP, {"margin": "0", "font-family": "Roboto Bold", "font-size": "24px"});
        arrLeft.addEventListener("click", () => {
            y--;
            yearP.innerText = y;
            applyStyle(centerYear, {"-webkit-transition": "-webkit-transform .25s", "-webkit-transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(centerYear, {"transition": "transform .25s", "transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(nextYear, {"-webkit-transition": "none", "-webkit-transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(nextYear, {"transition": "none", "transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(previousYear, {"-webkit-transition": "-webkit-transform .25s", "-webkit-transform": "translate3d(0, 0, 0)"});
            applyStyle(previousYear, {"transition": "transform .25s", "transform": "translate3d(0, 0, 0)"});
            var helper = centerYear;
            centerYear = previousYear;
            previousYear = nextYear;
            nextYear = helper;
            previousYear.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            nextYear.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            thisObj.#buildYear(previousYear, new Date(y-1, 0, 1));
            thisObj.#buildYear(nextYear, new Date(y+1, 0, 1));
        });
        arrRight.addEventListener("click", () => {
            y++;
            yearP.innerText = y;
            applyStyle(centerYear, {"-webkit-transition": "transform .25s", "-webkit-transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(centerYear, {"transition": "transform .25s", "transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(nextYear, {"-webkit-transition": "transform .25s", "-webkit-transform": "translate3d(0, 0, 0)"});
            applyStyle(nextYear, {"transition": "transform .25s", "transform": "translate3d(0, 0, 0)"});
            applyStyle(previousYear, {"-webkit-transition": "none", "-webkit-transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(previousYear, {"transition": "none", "transform": "translate3d(calc(100% + 15px), 0, 0)"});
            var helper = previousYear;
            previousYear = centerYear;
            centerYear = nextYear;
            nextYear = helper;
            previousYear.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            nextYear.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            thisObj.#buildYear(previousYear, new Date(y-1, 0, 1));
            thisObj.#buildYear(nextYear, new Date(y+1, 0, 1));
        });
        arrLeftDiv.appendChild(arrLeft);
        frDiv.appendChild(arrLeftDiv);
        yearDiv.appendChild(yearP);
        frDiv.appendChild(yearDiv);
        arrRightDiv.appendChild(arrRight);
        frDiv.appendChild(arrRightDiv);
        e.appendChild(frDiv);
    
        var separator = document.createElement("div");
        applyStyle(separator, {"height": "1px", "width": "100%", "background-color": "rgba(0, 0, 0, 0.35)"});
        e.appendChild(separator);
    
        var yearWrapper = document.createElement("div");
        applyStyle(yearWrapper, {"position": "relative", "display": "flex", "flex-direction": "row", "width": "100%", "height": "100%"});
        var centerYear = document.createElement("div");
        applyStyle(centerYear, {"position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildYear(centerYear, new Date(y, this.currentDate.getMonth(), this.currentDate.getDate()));
        yearWrapper.appendChild(centerYear);
        var previousYear = document.createElement("div");
        applyStyle(previousYear, {"transform": "translate3d(calc(-100% - 15px), 0, 0)", "position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildYear(previousYear, new Date(y-1, this.currentDate.getMonth(), this.currentDate.getDate()));
        yearWrapper.appendChild(previousYear);
        var nextYear = document.createElement("div");
        applyStyle(nextYear, {"transform": "translate3d(calc(100% + 15px), 0, 0)", "position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildYear(nextYear, new Date(y+1, this.currentDate.getMonth(), this.currentDate.getDate()));
        yearWrapper.appendChild(nextYear);
        e.appendChild(yearWrapper);
    }

    async #createYearsView(e, y){
        var thisObj = this;
        e.querySelectorAll("*").forEach((child) => {
            child.remove();
        });
    
        var frDiv = document.createElement("div");
        applyStyle(frDiv, {"display": "flex", "justify-content": "center", "align-items": "center",
        "align-self": "stretch", "padding": "2px 0px 12px 0px"});
        var arrLeftDiv = document.createElement("div");
        var yearDiv = document.createElement("div");
        var arrRightDiv = document.createElement("div");
        for(const divel of [arrLeftDiv, yearDiv, arrRightDiv]){
            applyStyle(divel, {"display": "flex", "justify-content": "center", "align-items": "center", "flex": "1"});
        }
        applyStyle(yearDiv, {"flex": "2"});
        var arrLeft = await elementFromUrl("assets/icons/arrow.svg");
        var arrRight = await elementFromUrl("assets/icons/arrow.svg");
        applyStyle(arrLeft, {"fill": "#007aff", "width": "14px", "height": "14px",
        "transform": "rotate(45deg)", "cursor": "pointer"});
        applyStyle(arrRight, {"fill": "#007aff", "width": "14px", "height": "14px",
        "transform": "rotate(-135deg)", "cursor": "pointer"});
        var yearP = document.createElement("p");
        yearP.innerText = (y-4) + "-" + (y+4);
        applyStyle(yearP, {"margin": "0", "font-family": "Roboto Bold", "font-size": "24px"});
        arrLeft.addEventListener("click", () => {
            y-=9;
            yearP.innerText = (y-4) + "-" + (y+4);
            applyStyle(centerYears, {"-webkit-transition": "-webkit-transform .25s", "-webkit-transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(centerYears, {"transition": "transform .25s", "transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(nextYears, {"-webkit-transition": "none", "-webkit-transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(nextYears, {"transition": "none", "transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(previousYears, {"-webkit-transition": "-webkit-transform .25s", "-webkit-transform": "translate3d(0, 0, 0)"});
            applyStyle(previousYears, {"transition": "transform .25s", "transform": "translate3d(0, 0, 0)"});
            var helper = centerYears;
            centerYears = previousYears;
            previousYears = nextYears;
            nextYears = helper;
            previousYears.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            nextYears.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            thisObj.#buildYears(previousYears, new Date(y-9, 0, 1));
            thisObj.#buildYears(nextYears, new Date(y+9, 0, 1));
        });
        arrRight.addEventListener("click", () => {
            y+=9;
            yearP.innerText = (y-4) + "-" + (y+4);
            applyStyle(centerYears, {"-webkit-transition": "transform .25s", "-webkit-transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(centerYears, {"transition": "transform .25s", "transform": "translate3d(calc(-100% - 15px), 0, 0)"});
            applyStyle(nextYears, {"-webkit-transition": "transform .25s", "-webkit-transform": "translate3d(0, 0, 0)"});
            applyStyle(nextYears, {"transition": "transform .25s", "transform": "translate3d(0, 0, 0)"});
            applyStyle(previousYears, {"-webkit-transition": "none", "-webkit-transform": "translate3d(calc(100% + 15px), 0, 0)"});
            applyStyle(previousYears, {"transition": "none", "transform": "translate3d(calc(100% + 15px), 0, 0)"});
            var helper = previousYears;
            previousYears = centerYears;
            centerYears = nextYears;
            nextYears = helper;
            previousYears.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            nextYears.querySelectorAll("*").forEach((child) => {
                child.remove();
            });
            thisObj.#buildYears(previousYears, new Date(y-9, 0, 1));
            thisObj.#buildYears(nextYears, new Date(y+9, 0, 1));
        });
        arrLeftDiv.appendChild(arrLeft);
        frDiv.appendChild(arrLeftDiv);
        yearDiv.appendChild(yearP);
        frDiv.appendChild(yearDiv);
        arrRightDiv.appendChild(arrRight);
        frDiv.appendChild(arrRightDiv);
        e.appendChild(frDiv);
    
        var separator = document.createElement("div");
        applyStyle(separator, {"height": "1px", "width": "100%", "background-color": "rgba(0, 0, 0, 0.35)"});
        e.appendChild(separator);
    
        var yearsWrapper = document.createElement("div");
        applyStyle(yearsWrapper, {"position": "relative", "display": "flex", "flex-direction": "row", "width": "100%", "height": "100%"});
        var centerYears = document.createElement("div");
        applyStyle(centerYears, {"position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildYears(centerYears, new Date(y, this.currentDate.getMonth(), this.currentDate.getDate()));
        yearsWrapper.appendChild(centerYears);
        var previousYears = document.createElement("div");
        applyStyle(previousYears, {"transform": "translate3d(calc(-100% - 15px), 0, 0)", "position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildYears(previousYears, new Date(y-9, this.currentDate.getMonth(), this.currentDate.getDate()));
        yearsWrapper.appendChild(previousYears);
        var nextYears = document.createElement("div");
        applyStyle(nextYears, {"transform": "translate3d(calc(100% + 15px), 0, 0)", "position": "absolute", "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column"});
        this.#buildYears(nextYears, new Date(y+9, this.currentDate.getMonth(), this.currentDate.getDate()));
        yearsWrapper.appendChild(nextYears);
        e.appendChild(yearsWrapper);
    }

    #buildYears(e, d){
        var thisObj = this;
        for(var i = 0; i < 3; ++i){
            var yearRow = document.createElement("div");
            applyStyle(yearRow, {"display": "flex", "flex-direction": "row", "font-family": "Roboto Medium", "flex": "1", "font-size": "20px"});
            for(var k = 0; k < 3; ++k){
                var yearDiv = document.createElement("div");
                applyStyle(yearDiv, {"display": "flex", "justify-content": "center", "align-items": "center", "flex": "1"});
                var yearP = document.createElement("p");
                var year = d.getFullYear() -4 + i * 3 + k;
                yearP.innerText = year;
                yearP.setAttribute("yearVal", year.toString());
                applyStyle(yearP, {"margin": "0", "cursor": "pointer"});
                yearP.addEventListener("click", function(ev){
                    thisObj.#createYearView(e.parentElement.parentElement, this.getAttribute("yearVal"));
                });
                if(year == this.currentDate.getFullYear()){
                    applyStyle(yearP, {"background-color": "#007aff", "color": "white", "font-family": "Roboto Bold", "padding": "10px", "border-radius": "24px"});
                }
                yearDiv.appendChild(yearP);
                yearRow.appendChild(yearDiv);
            }
            e.appendChild(yearRow);
        }
    }

    #buildYear(e, d){
        var thisObj = this;
        var monthNameShort = ["jan", "feb", "márc", "ápr", "máj", "jún", "júl", "aug", "szep", "okt", "nov", "dec"];
    
        for(var i = 0; i < 4; ++i){
            var monthRow = document.createElement("div");
            applyStyle(monthRow, {"display": "flex", "flex-direction": "row", "font-family": "Roboto Medium", "flex": "1", "font-size": "20px"});
            for(var k = 0; k < 3; ++k){
                var monthDiv = document.createElement("div");
                applyStyle(monthDiv, {"display": "flex", "justify-content": "center", "align-items": "center", "flex": "1"});
                var monthP = document.createElement("p");
                var month = (i+1) * 3 - 3 + k;
                monthP.innerText = monthNameShort[month];
                monthP.setAttribute("monthVal", month.toString());
                applyStyle(monthP, {"margin": "0", "cursor": "pointer"});
                monthP.addEventListener("click", function(ev){
                    thisObj.#createMonthView(e.parentElement.parentElement, new Date(d.getFullYear(), this.getAttribute("monthVal"), 1));
                });
                if(month == this.currentDate.getMonth()){
                    applyStyle(monthP, {"background-color": "#aeaeb2", "color": "white", "font-family": "Roboto Bold", "padding": "8px 8px", "border-radius": "24px"});
                    if(d.getFullYear() == this.currentDate.getFullYear()){
                        applyStyle(monthP, {"background-color": "#007aff"});
                    }
                }
                monthDiv.appendChild(monthP);
                monthRow.appendChild(monthDiv);
            }
            e.appendChild(monthRow);
        }
    }

    #buildMonth(e, d){
        var thisObj = this;
        var dateRow = document.createElement("div");
        applyStyle(dateRow, {"display": "flex", "flex": "1", "flex-direction": "row", "font-family": "Roboto Light", "font-size": "16px"});
        var weekDays = ["H", "K", "Sz", "Cs", "P", "Sz", "V"];
        for(var i = 0; i < 7; ++i){
            var dateDiv = document.createElement("div");
            applyStyle(dateDiv, {"display": "flex", "flex": "1", "flex-direction": "row", "justify-content": "center", "align-items": "center"});
            var dateP = document.createElement("p");
            dateP.innerText = weekDays[i];
            applyStyle(dateP, {"margin": "0"});
            dateDiv.appendChild(dateP);
            dateRow.appendChild(dateDiv);
        }
        e.appendChild(dateRow);
    
    
        var dayOffset = 0;
        var days = new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();
        for(var i = 0; i < days; ++i){
            if(i == 0){
                dateRow = document.createElement("div");
                applyStyle(dateRow, {"display": "flex", "flex": "1", "flex-direction": "row", "font-family": "Roboto Medium", "font-size": "16px"});
                dayOffset = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
                if(dayOffset == 0){
                    dayOffset = 6;
                } else {
                    dayOffset--;
                }
                for(var oi = 0; oi < dayOffset; ++oi){
                    var dateDiv = document.createElement("div");
                    applyStyle(dateDiv, {"display": "flex", "flex": "1", "flex-direction": "row", "justify-content": "center", "align-items": "center"});
                    dateRow.appendChild(dateDiv);
                }
            } else if((i + dayOffset) % 7 == 0){
                e.appendChild(dateRow);
                dateRow = document.createElement("div");
                applyStyle(dateRow, {"display": "flex", "flex": "1", "flex-direction": "row", "font-family": "Roboto Medium", "font-size": "16px"});
            }
            var dateDiv = document.createElement("div");
            applyStyle(dateDiv, {"display": "flex", "flex": "1", "flex-direction": "row", "justify-content": "center", "align-items": "center", "cursor": "pointer"});
            dateDiv.setAttribute("dayVal", i+1);
            dateDiv.addEventListener("click", function(ev){
                if(thisObj.listeners["datePicked"] != null){
                    if(thisObj.listeners["datePicked"].length != 0){
                        for(const callback of thisObj.listeners["datePicked"]){
                            callback(new Date(d.getFullYear(), d.getMonth(), this.getAttribute("dayVal")));
                        }
                    }
                }
            });
            var dateP = document.createElement("p");
            dateP.innerText = i+1;
            applyStyle(dateP, {"margin": "0"});
            if(i+1 == this.currentDate.getDate()){
                var todayDiv = document.createElement("div");
                applyStyle(todayDiv, {"border-radius": "50%", "width": "32px", "height": "32px", "background-color": "#aeaeb2",
                "display": "flex", "justify-content": "center", "align-items": "center"});
                applyStyle(dateP, {"font-family": "Roboto Bold", "color": "white"});
                if(d.getFullYear() == this.currentDate.getFullYear() && d.getMonth() == this.currentDate.getMonth()){
                    applyStyle(todayDiv, {"background-color": "#007aff"});
                }
                todayDiv.appendChild(dateP);
                dateDiv.appendChild(todayDiv);
            } else{
                dateDiv.appendChild(dateP);
            }
            dateRow.appendChild(dateDiv);
            if((i + 1) == days){
                for(var oi = 0; oi < 6 - (i + dayOffset) % 7; ++oi){
                    var dateDiv = document.createElement("div");
                    applyStyle(dateDiv, {"display": "flex", "flex": "1", "flex-direction": "row", "justify-content": "center", "align-items": "center"});
                    dateRow.appendChild(dateDiv);
                }
                e.appendChild(dateRow);
            }
        }
    }
}

function removeFromArray(el, arr){
    var i = 0; var finalarr = [];
    for(const e of arr){
        if(e != el){finalarr.push(arr[i]);}
        ++i;
    }
    return finalarr;
}

function monthToText(n){
    var magyar = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"];
    if(n < 0){
        return "YEAR-";
    } else if(n > 11){
        return "YEAR+";
    }
    return magyar[n];
}

function stringToHtlmElement(x){
    var e = document.createElement("div");
    e.innerHTML = x;
    return e.firstElementChild;
}

function elementFromUrl(u){
    return new Promise(resolve => {
        var req = new XMLHttpRequest();
        req.addEventListener("load", () =>{
            if(req.status == 200){
                var e = stringToHtlmElement(req.responseText);
                resolve(e);
            }
        });
        req.open("GET", u);
        req.send();
    });
}

function applyStyle(e, s){
    for(se in s) {
        var ss = "";
        var isDash = false;
        for(ch of se) {
            if(ch == "-"){
                isDash = true;
            } else{
                if(isDash){
                    ss += ch.toUpperCase();
                    isDash = false;
                } else{
                    ss += ch;
                }
            }
        }
        e.style[ss] = s[se];
    }
}