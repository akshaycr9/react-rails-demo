var Event = React.createClass({
	propTypes: {
		name: React.PropTypes.string,
		event_date: React.PropTypes.string,
		place: React.PropTypes.string,
		description: React.PropTypes.string
	},
	getInitialState: function() {
		return { edit: false };
	},
	renderRecord: function() {
		var event = this.props.event;
		return (
			<tr>
				<td>{event.name}</td>
				<td>{event.event_date}</td>
				<td>{event.place}</td>
				<td>{event.description}</td>
				<td>
					<a className="btn btn-primary btn-xs" onClick={this.handleToggle}>
					Edit
					</a>
					<a className="btn btn-danger btn-xs" onClick={this.handleDelete}>
					Delete
					</a>
				</td>
			</tr>
		)
	},
	renderForm: function() {
		return(
			<tr>
				<td>
					<input name="name"
					defaultValue={this.props.event.name}
					className="form-control"
					type="text"
					ref="name" />
				</td>
				<td>
					<input name="event_date"
					defaultValue={this.props.event.event_date}
					className="form-control"
					type="date"
					ref="event_date" />
				</td>
				<td>
					<input name="place"
					defaultValue={this.props.event.place}
					className="form-control"
					type="text"
					ref="place" />
				</td>
				<td>
					<input name="description"
					defaultValue={this.props.event.description}
					className="form-control"
					type="text"
					ref="description" />
				</td>
				<td>
					<a className="btn btn-success btn-sm" onClick={this.handleUpdate}>
					Save
					</a>
					<a className="btn btn-default btn-sm" onClick={this.handleToggle}>
					Cancel
					</a>
				</td>
			</tr>
		)
	},
	handleDelete: function(e) {
		e.preventDefault();
		$.ajax({
			url: '/api/events/' + this.props.event.id,
			method: "DELETE",
			success: function(data) {
				this.props.handleDeleteRecord(this.props.event);
			}.bind(this),
			error: function(xhr, status, error) {
				alert("Cannot delete record: ", error)
			}
		})
	},
	handleUpdate: function(e) {
		e.preventDefault();
		if (this.validRecord()){
			var event_data = {
				name: this.recordValue("name"),
				description: this.recordValue("description"),
				place: this.recordValue("place"),
				event_date: this.recordValue("event_date")
			};
			$.ajax({
				url: "/api/events/" + this.props.event.id,
				method: "PUT",
				data: { event: event_data },
				success: function(data) {
					this.props.handleUpdateRecord(this.props.event, data);
					this.setState({ edit: false });
				}.bind(this),
				error: function(xhr, status, error) {
					alert("Cannot update record: ", error)
				}
			});
		} else {
			alert("Please fill all fields");
		}
	},
	validRecord: function() {
		if (this.recordValue("name") && this.recordValue("place") && this.recordValue("event_date") && this.recordValue("description")) {
			return true
		} else {
			return false
		}
	},
	recordValue: function(field) {
		return ReactDOM.findDOMNode(this.refs[field]).value;
	},
	handleToggle: function(e) {
		e.preventDefault();
		this.setState({ edit: !this.state.edit });
	},
	render: function() {
		if (this.state.edit) {
			return (this.renderForm());
		} else {
			return (this.renderRecord());
		}
	}
});