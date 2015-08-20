Task = React.createClass({
  // loadTasks: function() {
  //   $.ajax({
  //     url: this.props.urlbase + 
  //   });
  // },

  render: function() {
    var formattedDate = new Date(this.props.data.dueDate.epochSecond * 1000);
    return (
      <form className="taskForm">
        <input type="hidden" ref="id" value={this.props.data.id} />
        <input type="text" ref="description" value={this.props.data.description} />
        <input type="datetime-local" ref="due" value={formattedDate} />
        <input type="checkbox" ref="complete" value={this.props.data.complete} />
      </form>
    );
  }
});