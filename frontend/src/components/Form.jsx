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
    //console.log(iscurrent);
    setStudent((favorite) => ({ ...favorite, is_favorite }));
  };
}

  return (
    <Form 
      className="form-event"
      onSubmit="handleSubmit"
    >

    </Form>
  )

export default EventForm;