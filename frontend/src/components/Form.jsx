import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const EventForm = ({ onSaveEvent, editingEvent, onUpdateEvent }) => {
  const [event, setEvent] = useState(
    editingEvent || {
      event_name: "",
      category: "",
      date: "",
      is_favorite: false,
    }
  );

  // Handles put or patch requests
  const [method, setMethod] = useState("none");

  const handleEventNameChange = (event) => {
    const name = event.target.value;
    setEvent((eventName) => ({ ...eventName, name }));
  };

  const handleCategoryNameChange = (event) => {
    const name = event.target.value;
    setEvent((categoryName) => ({ ...categoryName, name }));
  };

  const handleDateTimeChange = (event) => {
    const dateTime = event.target.value;
    setEvent((dt) => ({ ...dt, dateTime }));
  };

  const handleFavoriteToggle = (event) => {
    const is_favorite = event.target.checked;
    setEvent((favorite) => ({ ...favorite, is_favorite }));
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
    setHandle("put");
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

  const patchFavorite = (isFavorite) => {
    setHandle("patch");
    return fetch(`http://localhost:8080/api/event/${isFavorite.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isFavorite)
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
      if (method === "patch") {
        patchFavorite(event);
      } else putEvent(event);
    } else {
      postEvent(event);
    }
  };
}

  return (
    <Form 
      className="form-event"
      onSubmit={handleSubmit}
    >

    </Form>
  )

export default EventForm;