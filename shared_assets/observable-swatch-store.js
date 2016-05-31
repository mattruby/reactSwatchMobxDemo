/** @namespace Swatch */
(function () {
	"use strict";

	window.Swatch = {};

	Swatch.SwatchStore = function (swatchJSONData) {

		mobx.extendObservable(this, {
			title: swatchJSONData.title,
			swatches: _.map(swatchJSONData.swatches, function (swatchData) {
				return new Swatch.SwatchModel(swatchData);
			}),
			selectedSwatch: function () {
				return _.find(this.swatches, 'selected');
			}
		});

		this.setSelectedSwatch = mobx.action(_.bind(function setSelectedSwatch (materialId) {
			this.selectedSwatch.selected = false;
			_.find(this.swatches, {materialId: materialId}).selected = true;
		}, this));

	};

	Swatch.SwatchModel = function (swatchData) {
		_.assign(this, swatchData);
		mobx.extendObservable(this, {selected: swatchData.selected});
	};

}());