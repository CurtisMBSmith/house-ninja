package ninja.household.data.model;

import java.time.Instant;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Task {

	@XmlElement
	private long id;
	
	@XmlElement
	private String description;
	
	@XmlElement
	private boolean complete;
	
	@XmlElement
	private Instant dueDate;
	
	public Task() { }
	
	public Task(long id, String desc, boolean complete, Instant dueDate) {
		this.id = id;
		this.description = desc;
		this.complete = complete;
		this.dueDate = dueDate;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isComplete() {
		return complete;
	}

	public void setComplete(boolean complete) {
		this.complete = complete;
	}

	public Instant getDueDate() {
		return dueDate;
	}

	public void setDueDate(Instant dueDate) {
		this.dueDate = dueDate;
	}
	
}
