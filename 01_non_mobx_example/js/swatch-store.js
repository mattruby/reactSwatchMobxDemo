/** @namespace Swatch */
(function () {
	"use strict";

	window.Swatch = {};

	Swatch.SwatchStore = function (swatchJSONData) {
		_.assign(this, {
			title: swatchJSONData.title,
			swatches: _.map(swatchJSONData.swatches, function (swatchData) {
				return new Swatch.SwatchModel(swatchData);
			}),
			getSelectedSwatch: function () {
				return _.find(this.swatches, 'selected');
			},
			setSelectedSwatch: _.bind(function (materialId) {
				this.getSelectedSwatch().selected = false;
				_.find(this.swatches, {materialId: materialId}).selected = true;
				this.listenableActions.swatchDataChanged.dispatch();
			}, this)
		});

		// Actions for others to listen to
		this.listenableActions = {
			swatchDataChanged: function () {
				var sig = new signals.Signal();
				sig.memorize = true;
				return sig;
			}()
		};
		this.listenableActions.swatchDataChanged.dispatch();

	};

	Swatch.SwatchModel = function (swatchData) {
		_.assign(this, swatchData);
	};

}());