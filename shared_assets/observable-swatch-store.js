/** @namespace Swatch */
(function () {
	"use strict";

	window.Swatch = {};

	Swatch.SwatchStore = function (swatchJSONData) {

		mobx.extendObservable(this, {
			title: swatchJSONData.title,
			swatches: _.map(swatchJSONData.swatches, function (swatchData) {
				return mobx.extendObservable(swatchData, {selected: swatchData.selected});
			}),
			selectedSwatch: function () {
				return _.find(this.swatches, 'selected');
			}
		});

		this.setSelectedSwatch = mobx.action('setSelectedSwatch', _.bind(function (materialId) {
			this.selectedSwatch.selected = false;
			_.find(this.swatches, {materialId: materialId}).selected = true;
		}, this));

	};

}());