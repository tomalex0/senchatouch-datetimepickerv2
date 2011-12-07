
Ext.setup({
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    icon: 'icon.png',
    glossOnIcon: false,
    onReady: function(options) {
        Ext.create('Ext.form.Panel', {
            fullscreen : true,
            items: [{
                xtype : 'fieldset',
                items : [{
                    xtype: 'datetimepickerfield',
                    name : '12hrdt',
                    label: '12 Hr DateTime',
                    value: new Date(),
                    picker: {
                        yearFrom: 1980,
                        minuteInterval : 1,
                        ampm : true,
                        slotOrder: ['month', 'day', 'year','hour','minute','ampm']
                    }
                },{
                    xtype: 'datetimepickerfield',
                    name : '24hrdt',
                    label: '24 Hr DateTime',
                    value: new Date(),
                    format : 'Y-m-d H:i',
                    picker: {
                        yearFrom: 1980,
                        minuteInterval : 1,
                        ampm : false,
                        slotOrder: ['month', 'day', 'year','hour','minute']
                    }
                },{
                    xtype: 'datetimepickerfield',
                    name : '12hr',
                    label: '12 Hr Time',
                    value: new Date(),
                    format : 'h:i:A',
                    picker: {
                        yearFrom: 1980,
                        minuteInterval : 1,
                        ampm : true,
                        slotOrder: ['hour','minute','ampm']
                    }
                },{
                    xtype: 'datetimepickerfield',
                    name : '24hr',
                    label: '24 Hr Time',
                    value: new Date(),
                    format : 'H:i',
                    picker: {
                        yearFrom: 1980,
                        minuteInterval : 1,
                        slotOrder: ['hour','minute']
                    }
                }]
            }]
        });
    }
});