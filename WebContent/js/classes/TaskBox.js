TaskBox = React.createClass({
  loadTasks: function() {
    $.ajax({
      url: "rs/rs/tasks/all/",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []}
  },

  componentDidMount: function() {
    this.loadTasks();
  },

  render: function() {
    return (
      <div className="taskBox" >
        <h1>Tasks</h1>
        <TaskList data={this.state.data} />
      </div>
    );
  }
  // handleTaskSubmit: function(task) {
  //   // TODO: Update task list.
  // };
});