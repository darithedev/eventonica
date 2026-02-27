import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const Event = ({ event, toUpdate, toDelete, onEdit }) => {
    const onUpdate = (toUpdateEvent) => {
        toUpdate(toUpdateEvent);
    }

    const onDelete = (toDeleteEvent) => {
        toDelete(toDeleteEvent);
    }

    const patchFavorite = (isFavorite) => {
    return fetch(`http://localhost:8080/api/event/${isFavorite.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isFavorite)
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        toUpdate(data);
      });
  };

  const handleFavoriteToggle = () => {
    const is_favorite = {
        ...event,
         is_favorite: !event.is_favorite
    };

    patchFavorite(is_favorite);
  };

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {event.event_name}
                </Card.Title>
                <Button onClick={() => handleFavoriteToggle()}>
                    {event.is_favorite 
                        ? (<ioicons.IoHeartSharp/>) 
                        : (<ioicons.IoHeartOutline/>)
                    }
                </Button>
                <Card.Text>
                    {new Date(event.date).toLocaleString("en-US", {
                        dateStyle: "full",
                        timeStyle: "long"
                    })}
                </Card.Text>
                <Card.Text>#{event.category}</Card.Text>
                <Button
                    variant="outline-danger"
                    onClick={()=> {
                        onDelete(event);
                    }}
                    style={{ padding: "0.6em", marginRight: "0.9em" }}
                >
                    <ioicons.IoTrash />
                </Button>
                <Button
                    variant="outline-info"
                    onClick={onEdit}
                    style={{ padding: "0.6em" }}
                >
                    {" "}
                    <ioicons.IoSync />
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Event;