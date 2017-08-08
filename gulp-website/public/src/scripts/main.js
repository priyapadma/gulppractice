function getDataTableSettings() {
    return {
        "oLanguage": {
            "sStripClasses": "",
            "sSearch": "",
            "sSearchPlaceholder": "Enter Title Here",
            "sInfo": "_START_ -_END_ of _TOTAL_",
            "sLengthMenu": '<span>Reports per page:</span><select class="browser-default">' +
                '<option value="10">10</option>' +
                '<option value="20">20</option>' +
                '<option value="30">30</option>' +
                '<option value="40">40</option>' +
                '<option value="50">50</option>' +
                '<option value="-1">All</option>' +
                '</select></div>'
        },
        formatDate: function (dt) {
            var d = new Date(dt);
            //var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear();
            //var datestring = ("0" + (d.get.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" + d.getFullYear();
            var datestring = ("0" + (d.getUTCMonth()+1)).slice(-2) + "/" + ("0" + d.getUTCDate()).slice(-2) + "/" + d.getUTCFullYear();
            
            return datestring;
        }
    };
}
function ValidateEmail(email) {
    var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return expr.test(email);
};
function ValidatePhone(phone) {
    var expr = /^[0-9-+]+$/;
    return expr.test(phone);
};
function renderTable(config) {
    return $(config.selector)
        .DataTable({
            "pageLength": config.pageLength || 10,
            "columnDefs": config.columnDefs,
            "columns": config.columns,
            "order": [[0, "desc"]],
            "oLanguage": {
                "sStripClasses": "",
                "sSearch": "",
                "sSearchPlaceholder": "Enter Title Here",
                "sInfo": "_START_ -_END_ of _TOTAL_",
                "sLengthMenu": '<span>Reports per page:</span><select class="browser-default">' +
                    '<option value="10">10</option>' +
                    '<option value="20">20</option>' +
                    '<option value="30">30</option>' +
                    '<option value="40">40</option>' +
                    '<option value="50">50</option>' +
                    '<option value="-1">All</option>' +
                    '</select></div>'
            },
            bAutoWidth: false
        });
}
function drawLineChart(config) {
    var bdcChart = c3.generate({
        bindto: config.selector,
        data: {
            json: config.data,
            keys: config.keys,
            x: config.x,
            names: config.names,
            xFormat: '%m-%d-%Y',
            colors: config.colors,
            axes: config.axes
        },
        grid: {
            y: {
                show: true
            }
        },
        oninit: function () {
            this.main.append('rect')
                .style('fill', 'white')
                .attr('x', 0.5)
                .attr('y', -0.5)
                .attr('width', this.width)
                .attr('height', this.height)
                .transition()
                .duration(2000)
                .attr('x', this.width)
                .attr('width', 0)
                .remove();
        },
        point: {
            show: false
        },
        size: {
            height: config.chartHeight
        },
        title: config.title,
        tooltip: {
            format: {
                title: function (x) {
                    return d3.time.format("%d %b %y")(x);
                },
                value: function (x) {
                    return d3.format("$,")(x);
                }
            }
        },
        axis: {
            x: {
                type: 'timeseries',

                tick: {
                    count: 20,
                    culling: { max: 10 },
                    format: d3.time.format("%b %y"),
                    centered: true,
                    rotate: 45
                },
            },
            y: {
                tick: { format: d3.format("$,") }
            },
            y2: {
                tick: { format: d3.format("$,") }
            }
        }
    });
}
function drawBarChart(config) {
    return c3.generate({
        bindto: config.selector,
        data: {
            json: config.data,
            keys: config.keys,
            names: config.legend,
            type: 'bar'
        },
        oninit: function () {
            this.main.append('rect')
                .style('fill', 'white')
                .attr('x', 0.5)
                .attr('y', -0.5)
                .attr('width', this.width)
                .attr('height', this.height)
                .transition()
                .duration(1000)
                .attr('height', this.height)
                .attr('height', 0)
                .remove();
        },
        axis: {
            x: {
                type: 'category',
                categories: config.categories,
                tick: {
                    rotate: 45,
                    width: 100
                }
            },
            y: {
                label: {
                    text: config.y.label,
                    position: 'outer-middle',
                }
            }
        },
        tooltip: {
            format: {
                value: config.tooltipFormat
            }
        },
        grid: {
            y: {
                show: true
            }
        },
        point: {
            show: false
        },
        size: {
            height: config.chartHeight
        },
        title: config.title,
    });
}
function drawGaugeChart(config) {
    return c3.generate({
        bindto: config.selector,
        data: {
            columns: [
                ['data', config.data]
            ],
            type: 'gauge',
        },
        tooltip: {
            show: false
        },
        gauge: {
            label: {
                format: function (value, ratio) {
                    return value + "%";
                },
                show: false
            },
            min: 0,
            max: 100,
            units: ' %',
            width: 39
        },
        color: { pattern: ['#123448'] },
        size: {
            height: 125
        }
    });
}
function getSliderVM(min, max, fmt, step) {
    var self = this;
    step = step | 1;
    self.min = ko.observable(min);
    self.max = ko.observable(max);
    self.start = ko.observableArray([min, max]);
    self.rangeVal = { 'min': min, 'max': max };
    self.range = ko.computed(function () { return this.rangeVal; }, self);
    self.format = ko.observable(fmt);
    self.step = ko.observable(step);
    self.displayMin = function () {
        return self.min();
    };
    self.displayMax = function () {
        return self.max();
    };
}
function getSliderVM1(min, max, fmt, step) {
    var self = this;
    step = step | 1;
    self.min = ko.observable(min);
    self.max = ko.observable(max);
    self.start = ko.observableArray([min, max]);
    self.rangeVal = { 'min': min, 'max': max };
    self.range = ko.computed(function () { return this.rangeVal; }, self);
    self.format = ko.observable(fmt);
    self.step = ko.observable(step);
    self.displayMin = function () {
        return self.min();
    };
    self.displayMax = function () {
        return self.max();
    };
}

function initKOSlider() {
    ko.noUiSlider = {
        viewModel: function (config) {
            this.step = config.step;
            this.min = config.min;
            this.max = config.max;
            this.displayMin = config.displayMin;
            this.displayMax = config.displayMax;
            this.range = config.range;
            this.start = config.start;
            return this;
        }
    };
    ko.bindingHandlers.noUiSlider = {
        init: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
            var params = valueAccessor();
            var format = wNumb({
                decimals: 2,
                thousand: ',',
                prefix: '$ ',
            });
            if (params.format() !== "$") {
                format = wNumb({
                    decimals: 3,
                    thousand: ',',
                    prefix: '$ ',
                });
            }
            $(element).noUiSlider({
                start: params.start(),
                range: params.range(),
                step: params.step(),
                format: format
            });
            $(element).on({
                set: function (event, ui) {
                    params.minValue(ui[0]);
                    params.maxValue(ui[1]);
                }
            });
        },
        update: function (element, valueAccessor, allBindingsAccesor, viewModel, bindingContext) {
            var params = valueAccessor();
            var range = [params.minValue(), params.maxValue()];
            $(element).val(range);
        }
    };
}
function getDataTableCurrencyFormat() {
    return $.fn.dataTable.render.number(',', '.', 0, '$');
} function getDataTableDecimalFormat() {
    return $.fn.dataTable.render.number(',', '.', 2, '');
}
function parseDecimal(val) {
    return parseFloat(val.replace(/[,$]/g, ""));
}
function between(val, range) {
    if (!val) {
        if (val !== 0) {
            return true;
        }
    }
    return val >= range.min && val <= range.max;
}

/* Customized Select */
function initializeSelect() {
    $("select").prepend('<option value="" selected>Select All</option>');
    $('select').material_select();
    $('input.select-dropdown')
        .each(function(i, e) {
            var elem = $(e);
            elem.val(elem.val().replace("Select All" + ",", ""));
        });
    $(".select-dropdown.multiple-select-dropdown li")
        .on("click",dropdownClicked);
}

function dropdownClicked() {
    var item = $(this);
    var selectList = item.parent();
    if (item.text() === "Select All") {
        if (item.find("input[type=checkbox]:checked").length === 0) {
            selectList.find("li")
                .each(function(i, e) {
                    if ($(e).find("input[type=checkbox]:checked").length !== 0)
                        this.click();
                });
        } else {
            selectList.find("li")
                .each(function(i, e) {
                    if ($(e).find("input[type=checkbox]:checked").length === 0)
                        this.click();
                });
        }
    }
    var selectedVal = $(selectList.closest(".select-wrapper").find(".select-dropdown")[0]).val();
    $(selectList.closest(".select-wrapper").find(".select-dropdown")[0])
        .val(selectedVal.replace("Select All" + ",", ""));
}

var reinitSelect = function(select) {
    var selectCtrl = $(select);
    selectCtrl.html(selectCtrl.children('option').sort(function (x, y) {
        var res = $(x).text().toUpperCase() < $(y).text().toUpperCase() ? -1 : 1;
        
        if ($(x).text() === "Select All")
            res = -1;
        if ($(y).text() === "Select All")
            res = 1;
        return res;
    }));
    selectCtrl.prepend('<option value="" selected>Select All</option>');
    selectCtrl.material_select();
    var elem = selectCtrl.prev().prev();
    elem.val(elem.val().replace("Select All" + ",", "")); 
    var parent = selectCtrl.parents(".select-wrapper");
    parent.find(".select-dropdown.multiple-select-dropdown li").on("click", dropdownClicked);
};

//Common method to initiate AJAX request
function commonGateway(type,url,data,callback) {
    $.ajax({
        type: type,
        url: url,
        data: data,
        cache: false,
        datatype: "json",
        success: function(data){
           callback(data);
        }
    });
}

//Method to initiate Upload doc AJAX request
function uploadDocGateway(type, url, data, callback) {
    $.ajax({
        type: type,
        url: url,
        contentType: false,
        processData: false,
        data: data,
        success: function (data) {
            callback(data);
        }
    });
}

function formatDate(stringToConvert, currentType, formatType) {
    var d = new Date(stringToConvert);
    var date = ("0" + (d.getUTCMonth() + 1)).slice(-2) + "/" + ("0" + d.getUTCDate()).slice(-2) + "/" + d.getUTCFullYear();
    return date;
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    }
    else {
        return results[1] || 0;
    }
}