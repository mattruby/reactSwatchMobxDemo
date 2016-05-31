/** @namespace Swatch */
(function () {
	"use strict";

	Swatch.ViewerFullRenderer = mobxReact.observer(React.createClass({
		displayName: 'ViewerFullRenderer',
		render: function () {
			var store = this.props.store;
			return React.DOM.div({
					className: 'swatch-viewer'
				},
				React.createElement(mobxDevtools.default),
				React.DOM.h1(null, store.title),
				React.createElement(Swatch.selectedSwatchRenderer, {selectedSwatch: store.selectedSwatch}),
				React.createElement(Swatch.swatchGroupRenderer, {swatches: store.swatches})
			);

		}
	}));

	Swatch.selectedSwatchRenderer = mobxReact.observer(React.createClass({
		displayName: 'selectedSwatchRenderer',
		render: function () {
			var selectedSwatch = this.props.selectedSwatch;
			return React.DOM.div({
					className: 'selected-swatch-container'
				},
				React.DOM.img({
					height: 260,
					width: 260,
					alt: selectedSwatch.name,
					className: 'selected-swatch-image',
					src: selectedSwatch.image + '?wid=260&hei=260'
				}),

				React.DOM.strong({
					className: 'selected-swatch-name'
				}, selectedSwatch.name)
			);
		}
	}));

	Swatch.swatchGroupRenderer = mobxReact.observer(React.createClass({
		displayName: 'swatchGroupRenderer',
		render: function () {

			var renderedSwatches = this.props.swatches.map(function (swatch) {
				return React.createElement(Swatch.swatchThumbnailRenderer,
					{key: swatch.materialId, swatch: swatch});
			}, this);

			return React.DOM.div({
					className: 'swatch-container'
				},
				renderedSwatches
			);
		}
	}));

	Swatch.swatchThumbnailRenderer = mobxReact.observer(React.createClass({
		displayName: 'swatchThumbnailRenderer',
		render: function () {
			var swatch = this.props.swatch;

			var className = 'swatch' + (swatch.selected ? ' selected' : '');

			return React.DOM.div({
					className: className,
					key: swatch.materialId,
					onClick: this.swatchClickHandler
				},
				React.DOM.img({
					height: 31,
					width: 31,
					alt: swatch.name,
					src: swatch.image + '?wid=31&hei=31'
				})
			);
		},
		swatchClickHandler: function () {
			// props.setSelectedSwatchSignal.dispatch(props.materialId)
			console.log('swatch id: ' + this.props.swatch.materialId);
			store.setSelectedSwatch(this.props.swatch.materialId);
		}
	}));

}());