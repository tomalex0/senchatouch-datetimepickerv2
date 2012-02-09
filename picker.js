

Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function(options) {
        var randomNumber = function(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        };
        var isPhone = Ext.os.deviceType.toLowerCase() == "phone";
        var panel = Ext.create('Ext.Panel', {
            fullscreen: true,
            layout: {
                type : 'vbox',
                align: 'center',
                pack : 'center'
            },
            defaults: {
                margin: 5
            },
            items: [{
                text : 'Simple 24hr Picker',
                ui : 'action',
                xtype : 'button',
                handler : function(){
                    
                    var datetimepickettoolbaritems = isPhone ? [{
                        text: 'Done',
                        ui: 'action',
                        handler: function() {
                            console.log(picker.getValue());
                            picker.hide();
                        }
                    },{
                            text: 'Today',
                            handler: function() {
                                picker.setValueAnimated(new Date());
                            }
                        },
                        {
                            text: '24hr',
                            handler: function() {
                                picker.setValueAnimated({
                                    month: randomNumber(0, 11),
                                    day  : randomNumber(0, 28),
                                    year : randomNumber(1980, 2011),
                                    hour : randomNumber(0, 23),
                                    minute : randomNumber(0, 59)
                                });
                            }
                        },
                        {
                            text: 'useTitles',
                            handler: function() {
                                picker.setUseTitles(!picker.getUseTitles());
                            }
                    }] : [{
                        text: 'Done',
                        ui: 'action',
                        handler: function() {
                            console.log(picker.getValue());
                            picker.hide();
                        }
                    },{
                            text: 'Select Today Date',
                            handler: function() {
                                picker.setValueAnimated(new Date());
                            }
                        },
                        {
                            text: 'Select a random 24hr datetime',
                            handler: function() {
                                picker.setValueAnimated({
                                    month: randomNumber(0, 11),
                                    day  : randomNumber(0, 28),
                                    year : randomNumber(1980, 2011),
                                    hour : randomNumber(0, 23),
                                    minute : randomNumber(0, 59)
                                });
                            }
                        },
                        {
                            text: 'Toggle useTitles config',
                            handler: function() {
                                picker.setUseTitles(!picker.getUseTitles());
                            }
                    }];
                    var picker = Ext.create('Ext.ux.picker.DateTime', {
                        useTitles: false,
                        doneButton: false,
                        cancelButton: false,
                        minuteInterval : 1,
                        //slotOrder: ['month', 'day', 'year','hour','minute'],
                        toolbar: {
                            items : datetimepickettoolbaritems
                        }
                        
                    });
                    Ext.Viewport.add(picker);
                    picker.show();
                }
            },{
                text : 'Simple 12hr Picker',
                ui : 'action',
                xtype : 'button',
                handler : function(){
                    
                    var datetimepickettoolbaritems = isPhone ? [{
                        text: 'Done',
                        ui: 'action',
                        handler: function() {
                            console.log(picker.getValue());
                            picker.hide();
                        }
                    },{
                            text: 'Today',
                            handler: function() {
                                picker.setValueAnimated(new Date());
                            }
                        },
                        {
                            text: '12hr',
                            handler: function() {
                                picker.setValueAnimated({
                                    month: randomNumber(0, 11),
                                    day  : randomNumber(0, 28),
                                    year : randomNumber(1980, 2011),
                                    hour : randomNumber(1, 12),
                                    minute : randomNumber(0, 59),
                                    ampm : 'AM'
                                });
                            }
                        },
                        {
                            text: 'useTitles',
                            handler: function() {
                                picker.setUseTitles(!picker.getUseTitles());
                            }
                    }] : [{
                        text: 'Done',
                        ui: 'action',
                        handler: function() {
                            console.log(picker.getValue());
                            picker.hide();
                        }
                    },{
                            text: 'Select Today Date',
                            handler: function() {
                                picker.setValueAnimated(new Date());
                            }
                        },
                        {
                            text: 'Select a random 12hr datetime',
                            handler: function() {
                                picker.setValueAnimated({
                                    month: randomNumber(0, 11),
                                    day  : randomNumber(0, 28),
                                    year : randomNumber(1980, 2011),
                                    hour : randomNumber(0, 12),
                                    minute : randomNumber(0, 59),
                                    ampm : 'AM'
                                });
                            }
                        },
                        {
                            text: 'Toggle useTitles config',
                            handler: function() {
                                picker.setUseTitles(!picker.getUseTitles());
                            }
                    }];
                    var picker = Ext.create('Ext.ux.picker.DateTime', {
                        useTitles: false,
                        doneButton: false,
                        cancelButton: false,
                        minuteInterval : 1,
                        ampm:true,
                        slotOrder: ['month', 'day', 'year','hour','minute','ampm'],
                        toolbar: {
                            items : datetimepickettoolbaritems
                        }
                        
                    });
                    Ext.Viewport.add(picker);
                    picker.show();
                }
            }]
        });
    }
});