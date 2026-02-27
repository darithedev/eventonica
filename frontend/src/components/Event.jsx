import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import * as ioicons from "react-icons/io5";

const Event = ({ event, toUpdate, toDelete }) => {
    const onUpdate = (toUpdateEvent) => {
        toUpdate(toUpdateEvent);
    }

    return (
        <Card>
        
        </Card>
    );
};

export default Event;