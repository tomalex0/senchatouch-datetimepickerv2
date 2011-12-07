/**
This is a specialized field which shows a {@link Ext.ux.picker.DateTime} when tapped. If it has a predefined value, 
or a value is selected in the {@link Ext.ux.picker.DateTime}, it will be displayed like a normal {@link Ext.field.Text} 
(but not selectable/changable).

    Ext.create('Ext.field.DateTimePicker', {
        label: 'Birthday',
        value: new Date()
    });
    
{@link Ext.field.DateTimePicker} fields are very simple to implement, and have no required configurations.

## Examples

It can be very useful to set a default {@link #value} configuration on {@link Ext.field.DateTimePicker} fields. In 
this example, we set the {@link #value} to be the current date. You can also use the {@link #setValue} method to 
update the value at any time.

    @example preview
    Ext.create('Ext.form.Panel', {
        fullscreen: true,
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'datepickerfield',
                        label: 'Birthday',
                        name: 'birthday',
                        value: new Date()
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    { xtype: 'spacer' },
                    {
                        text: 'setValue',
                        handler: function() {
                            var datePickerField = Ext.ComponentQuery.query('datepickerfield')[0];

                            var randomNumber = function(from, to) {
                                return Math.floor(Math.random() * (to - from + 1) + from);
                            };

                            datePickerField.setValue({
                                month: randomNumber(0, 11),
                                day  : randomNumber(0, 28),
                                year : randomNumber(1980, 2011)
                            });
                        }
                    },
                    { xtype: 'spacer' }
                ]
            }
        ]
    });

When you need to retrieve the date from the {@link Ext.field.DateTimePicker}, you can either use the {@link #getValue} or 
{@link #getFormattedValue} methods:

    @example preview
    Ext.create('Ext.form.Panel', {
        fullscreen: true,
        items: [
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'datepickerfield',
                        label: 'Birthday',
                        name: 'birthday',
                        value: new Date()
                    }
                ]
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                items: [
                    {
                        text: 'getValue',
                        handler: function() {
                            var datePickerField = Ext.ComponentQuery.query('datepickerfield')[0];
                            Ext.Msg.alert(null, datePickerField.getValue());
                        }
                    },
                    { xtype: 'spacer' },
                    {
                        text: 'getFormattedValue',
                        handler: function() {
                            var datePickerField = Ext.ComponentQuery.query('datepickerfield')[0];
                            Ext.Msg.alert(null, datePickerField.getFormattedValue());
                        }
                    }
                ]
            }
        ]
    });


 */
Ext.define('Ext.ux.field.DateTimePicker', {
    extend: 'Ext.field.Text',
    alternateClassName: 'Ext.form.DateTimePicker',
    alias : 'widget.datetimepickerfield',
    requires: [
        'Ext.ux.picker.DateTime',
        'Ext.DateExtras'
    ],

    /**
     * @event change
     * Fires when a date is selected
     * @param {Ext.field.DateTimePicker} this
     * @param {Date} date The new date
     */

    config: {
        ui: 'select',

        /**
         * @cfg {Object/Ext.ux.picker.DateTime} picker
         * An object that is used when creating the internal {@link Ext.ux.picker.DateTime} component or a direct instance of {@link Ext.ux.picker.DateTime}
         * Defaults to true
         * @accessor
         */
        picker: true,

        /**
         * @cfg
         * @hide
         * @accessor
         */
        clearIcon: false,

        /**
         * @cfg {Object/Date} value
         * Default value for the field and the internal {@link Ext.ux.picker.DateTime} component. Accepts an object of 'year',
         * 'month' and 'day' values, all of which should be numbers, or a {@link Date}.
         *
         * Example: {year: 1989, day: 1, month: 5} = 1st May 1989 or new Date()
         * @accessor
         */

        /**
         * @cfg {Boolean} destroyPickerOnHide
         * Whether or not to destroy the picker widget on hide. This save memory if it's not used frequently,
         * but increase delay time on the next show due to re-instantiation. Defaults to false
         * @accessor
         */
        destroyPickerOnHide: false,

        /**
         * @cfg {Number} tabIndex
         * @hide
         */
        tabIndex: -1,
        
        format : 'm/d/Y h:i:A',

        /**
         * @cfg
         * @hide
         */
        component: {
            useMask: true
        }
    },

    initialize: function() {
        this.callParent(arguments);

        this.getComponent().on({
            scope: this,

            masktap: 'onMaskTap'
        });
    },

    applyValue: function(value) {
        if (!Ext.isDate(value) && !Ext.isObject(value)) {
            value = null;
        }

        if (Ext.isObject(value)) {
            value = new Date(value.year, value.month - 1, value.day,value.hour,value.minute);
        }
        
        return value;
    },

    // @inherit
    updateValue: function(newValue) {
        var picker = this.getPicker();
        
        if (this.initialized && picker) {
            picker.setValue(newValue);
        }
        
        this.getComponent().setValue((Ext.isDate(newValue)) ? Ext.Date.format(newValue, this.getFormat()) : newValue);

        this._value = newValue;
    },

    getValue: function() {
        return this._value;
    },

    /**
     * Returns the value of the field, which will be a {@link Date} unless the <tt>format</tt> parameter is true.
     * @param {Boolean} format True to format the value with <tt>Ext.util.Format.defaultDateFormat</tt>
     */
    getFormattedValue: function(format) {
        var value = this.getValue();
        return (Ext.isDate(value)) ? Ext.Date.format(value, format || "m/d/Y h:i:A") : value;
    },

    applyPicker: function(config) {
        if (!this.initialized) {
            //if this field has not been initialized yet, we don't want to create the picker
            //as it will not be shown immeditely. We will hold this off until the first time
            //it needs to be shown
            return null;
        }

        return Ext.factory(config, Ext.ux.picker.DateTime, this.getPicker());
    },

    updatePicker: function(newPicker) {
        if (newPicker) {
            newPicker.on({
                scope: this,

                change: 'onPickerChange',
                hide  : 'onPickerHide'
            });

            newPicker.hide();
        }
    },

    /**
     * @private
     * Listener to the tap event of the mask element. Shows the internal {@link #datePicker} component when the button has been tapped.
     */
    onMaskTap: function() {
        if (this.getDisabled()) {
            return false;
        }

        var picker = this.getPicker(),
            initialConfig = this.getInitialConfig();
        
        if (!picker) {
            picker = this.applyPicker(initialConfig.picker);
            this.updatePicker(picker);
            picker.setValue(initialConfig.value || this.getValue());
            this._picker = picker;
        }
        this.fireEvent('pickershow',picker,this);
        picker.show();

        return false;
    },

    /**
     * Called when the picker changes its value
     * @param {Ext.ux.picker.DateTime} picker The date picker
     * @param {Object} value The new value from the date picker
     * @private
     */
    onPickerChange: function(picker, value) {
        var me = this;
        me.setValue(value);
        me.fireAction('change', [me, me.getValue()], 'doChange');
    },

    doChange: Ext.emptyFn,

    /**
     * Destroys the picker when it is hidden, if
     * {@link Ext.field.DateTimePicker#destroyPickerOnHide destroyPickerOnHide} is set to true
     * @private
     */
    onPickerHide: function() {
        var picker = this.getPicker();

        if (this.getDestroyPickerOnHide() && picker) {
            picker.destroy();
            this.setPicker(null);
        }
    },

    reset: function() {
        this.setValue(this.originalValue);
    },

    // @private
    onDestroy: function() {
        var picker = this.getPicker();
        if (picker) {
            picker.destroy();
        }

        this.callParent(arguments);
    }
}, function() {
    //<deprecated product=touch since=2.0>
    this.override({
        getValue: function(format) {
            if (format) {
                //<debug warn>
                Ext.Logger.deprecate("format argument of the getValue method is deprecated, please use getFormattedValue instead", this);
                //</debug>
                return this.getFormattedValue(format);
            }
            return this.callOverridden();
        }
    });
    //</deprecated>
});