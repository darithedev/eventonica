import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import dateFormat from '../helpers/dateFormat.js'

const EventForm = ({ onSaveEvent, editingEvent, onUpdateEvent, setIsNewEvent, setEditingEvent }) => {
  const [event, setEvent] = useState(
    editingEvent || {
      event_name: "",
      category: "",
      date: "",
      is_favorite: false,
    }
  );

  const handleEventNameChange = (event) => {
    const event_name = event.target.value;
    setEvent((eventName) => ({ ...eventName, event_name }));
  };

  const handleCategoryNameChange = (event) => {
    const category = event.target.value;
    setEvent((categoryName) => ({ ...categoryName, category }));
  };

  const handleDateTimeChange = (event) => {
    const date = event.target.value;
    setEvent((dt) => ({ ...dt, date }));
  };

  const clearForm = () => {
    setEvent({ event_name: "", category: "", date: "", is_favorite: false, });
  };

  const postEvent = (newEvent) => {
    return fetch("http://localhost:8080/api/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onSaveEvent(data);
        clearForm();
      });
  };

  const putEvent = (toEditEvent) => {
    return fetch(`http://localhost:8080/api/event/${toEditEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(toEditEvent)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        onUpdateEvent(data);
        clearForm();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (event.id) {
      putEvent(event);
    } else {
      postEvent(event);
    }
    setIsNewEvent(false);
    setEditingEvent(null);
  };

  return (
    <Form 
      className="form-event"
      onSubmit={handleSubmit}
    >

      <Form.Group>
        <Form.Label>Event Name</Form.Label>
        <input
          type="text"
          id="add-event-name"
          placeholder="An Example Event"
          required
          value={event.event_name}
          onChange={handleEventNameChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Category</Form.Label>
        <input
          type="text"
          id="add-event-category"
          placeholder="Example"
          required
          value={event.category}
          onChange={handleCategoryNameChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Set Event Date and Time</Form.Label>
        <Form.Control
          type="datetime-local"
          required
          value={dateFormat(event.date)}
          onChange={handleDateTimeChange}
        />
      </Form.Group>

      <Form.Group>
        <Button type="submit" variant="outline-success">
          {event.id ? "Edit Event" : "Add Event"}
        </Button>
        {event.id ? (
          <Button type="button" variant="outline-warning" onClick={clearForm}>
            Cancel
          </Button>
        ) : null}
      </Form.Group>
    </Form>
  )
}

export default EventForm;