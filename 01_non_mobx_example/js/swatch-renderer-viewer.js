/** @namespace Swatch */
(function () {
	"use strict";

		Swatch.ViewerFullRenderer = React.createClass({
			displayName: 'ViewerFullRenderer',
			componentWillMount: function () {
				var self = this;
				var store = this.props.store;
				this.props.store.listenableActions.swatchDataChanged.add(function () {
					self.setState({
						title: store.title,
						selectedSwatch: store.getSelectedSwatch(),
						swatches: store.swatches
					});
				});
			},
			render: function () {
				var state = this.state;
				return React.DOM.div({
						className: 'swatch-viewer'
					},
					React.DOM.h1(null, state.title),
					React.createElement(Swatch.selectedSwatchRenderer, {selectedSwatch: state.selectedSwatch}),
					React.createElement(Swatch.swatchGroupRenderer, {
						swatches: state.swatches,
						setSelectedSwatch: this.props.store.actions.swatchSelected
					})
				);

			}
		});

		Swatch.selectedSwatchRenderer = React.createClass({
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
		});

		Swatch.swatchGroupRenderer = React.createClass({
			displayName: 'swatchGroupRenderer',
			render: function () {

				var renderedSwatches = this.props.swatches.map(function (swatch) {
					return React.createElement(Swatch.swatchThumbnailRenderer,
						{
							key: swatch.materialId,
							swatch: swatch,
							setSelectedSwatch: this.props.setSelectedSwatch
						});
				}, this);

				return React.DOM.div({
						className: 'swatch-container'
					},
					renderedSwatches
				);
			}
		});

		Swatch.swatchThumbnailRenderer = React.createClass({
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
				console.log('swatch id: ' + this.props.swatch.materialId);
				this.props.setSelectedSwatch.dispatch(this.props.swatch.materialId);
			}
		});

}());