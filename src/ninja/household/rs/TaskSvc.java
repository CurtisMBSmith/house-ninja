package ninja.household.rs;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import ninja.household.data.model.Task;

@Path("/tasks/")
public class TaskSvc {

	// TODO: Remove once database is in place
	private final Map<Long, Task> tasksByIdMap;
	private final AtomicLong idCounter = new AtomicLong(3L);

	public TaskSvc() {
		tasksByIdMap = new HashMap<>();
		tasksByIdMap.put(1l, new Task(1l, "Feed the cats", false, Instant.now()));
		tasksByIdMap.put(2l, new Task(2l, "Take out the trash", false, Instant.now().plus(2, ChronoUnit.HOURS)));
	}

	@GET
	@Path("/all/")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Task> retrieveAllTasks() {
		return tasksByIdMap.values();
	}

	@PUT
	@Path("/createOrUpdate")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Task createOrUpdate(final Task task) {
		if (task.getId() == null) {
			task.setId(idCounter.getAndIncrement());
		}

		tasksByIdMap.put(task.getId(), task);
		return task;
	}
}
