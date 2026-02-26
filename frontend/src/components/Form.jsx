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
}

  return (
    <Form 
      className="form-event"
      onSubmit="handleSubmit"
    >

    </Form>
  )

export default EventForm;