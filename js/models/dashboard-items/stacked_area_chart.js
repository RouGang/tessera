ds.register_dashboard_item('stacked_area_chart', {

  display_name: 'Stacked Area Chart',
  icon: 'fa fa-area-chart',
  category: 'chart',

  constructor: function(data) {
    'use strict'

    var self = limivorous.observable()
                         .extend(ds.models.item, {item_type: 'stacked_area_chart'})
                         .extend(ds.models.chart)
                         .property('stack_mode', {init: 'stack'})
                         .build()
    if (data) {
      if (data.stack_mode) {
        self.stack_mode = data.stack_mode
      }
    }
    ds.models.chart.init(self, data)
    ds.models.item.init(self, data)

    self.toJSON = function() {
      return ds.models.chart.json(self, ds.models.item.json(self, {
        stack_mode: self.stack_mode
      }))
    }

    return self
  },

  data_handler: function(query, item) {
    ds.log.logger('tessera.items.stacked_area_chart').debug('data_handler(): '
                                                           + query.name + '/' + item.item_id)
    ds.charts.stacked_area_chart($('#' + item.item_id + ' .ds-graph-holder'), item, query)
  },

  template: ds.templates.models.stacked_area_chart,

  interactive_properties: [
    {
      id: 'stack_mode',
      type: 'select',
      edit_options: {
        source: ds.charts.STACK_MODES
      }
    }
  ].concat(ds.models.chart.interactive_properties,
           ds.models.item.interactive_properties)

})
