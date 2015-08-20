TaskList = React.createClass({
  render: function() {
    var tasks = this.props.data.map(function(task) {
      return (
        <Task data={task} />
      );
    });
    return (
      <div className="taskList" >
        {tasks}
      </div>
    );
  }
});