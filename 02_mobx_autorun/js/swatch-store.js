/** @namespace Swatch */
(function () {
	"use strict";

	window.Swatch = {};

	Swatch.SwatchStore = function (swatchJSONData) {

		mobx.extendObservable(this,
			swatchJSONData,
			{
				selectedSwatch: function () {
					return _.find(this.swatches, 'selected');
				},
				setSelectedSwatch: function (materialId) {
					// Note the automatic transaction
					this.selectedSwatch.selected = false;
					_.find(this.swatches, {materialId: materialId}).selected = true;
				}
			});

	};

}());