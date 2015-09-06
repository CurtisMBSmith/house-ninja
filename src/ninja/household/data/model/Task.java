package ninja.household.data.model;

import java.time.Instant;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Task {

	@XmlElement
	private Long id;

	@XmlElement(nillable = false)
	private String description;

	@XmlElement
	private boolean complete;

	@XmlElement(nillable = false)
	private Instant dueDate;

	public Task() { }

	public Task(final long id, final String desc, final boolean complete, final Instant dueDate) {
		this.id = id;
		this.description = desc;
		this.complete = complete;
		this.dueDate = dueDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(final String description) {
		this.description = description;
	}

	public boolean isComplete() {
		return complete;
	}

	public void setComplete(final boolean complete) {
		this.complete = complete;
	}

	public Instant getDueDate() {
		return dueDate;
	}

	public void setDueDate(final Instant dueDate) {
		this.dueDate = dueDate;
	}

}
