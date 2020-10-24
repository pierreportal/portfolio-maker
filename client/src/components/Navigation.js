import React from "react";
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AddElementButton from "./UIElements/AddElementButton";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect } from "react";
import { updateRouteToDB, addNewRouteToDB } from "../api";

export default function Navigation(props) {
  const { testUserSetting } = props;
  const { routes } = testUserSetting;
  const history = useHistory();
  const [stateRoutes, setStateRoute] = useState(routes);

  const [dragging, setDragging] = useState(false);

  const addNewRoute = (routeLabel) => {
    const newRoute = {
      path: `/${routeLabel.toLowerCase().split(" ").join("-")}`,
      feedName: routeLabel.toLowerCase(),
      templateName: routeLabel.toLowerCase(),
      label: routeLabel,
    };
    addNewRouteToDB(newRoute);
    setStateRoute([...stateRoutes, newRoute]);
    history.push(newRoute.path);
  };

  const deleteRoute = (routeToDelete) => {
    const newRouteList = stateRoutes.filter(
      (r) => r.path !== routeToDelete.path
    );
    setStateRoute(newRouteList);
    history.push("/");
  };

  const links = () =>
    stateRoutes.map((x, i) => {
      return (
        //
        <Draggable key={x.path} draggableId={x.label} index={i}>
          {(provided) => (
            <div
              className="draggable-item"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <li
                key={x.path}
                className="row align-item-center"
                style={{ minWidth: "8rem" }}
              >
                <NavLink activeClassName="active" exact to={x.path}>
                  {x.label}
                </NavLink>
                {x.path !== "/" && (
                  <div
                    onClick={() => deleteRoute(x)}
                    className="remove-element-button-cross"
                  >
                    +
                  </div>
                )}
              </li>
            </div>
          )}
        </Draggable>
        //
      );
    });
  const handleDragEnd = (result) => {
    setDragging(false);
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (
      destination.draggableId === source.draggableId &&
      destination.index === source.index
    )
      return;
    const elem = stateRoutes.find((r) => r.label === draggableId);
    const newRouteOrdering = stateRoutes;
    newRouteOrdering.splice(source.index, 1);
    newRouteOrdering.splice(destination.index, 0, elem);
    updateRouteToDB(newRouteOrdering);
    return setStateRoute(newRouteOrdering);
  };

  useEffect(() => console.log(stateRoutes), [stateRoutes]);

  const handleDragging = () => {
    setDragging(true);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragging}>
        <ul className={`draggable-container ${dragging ? "dragging" : ""}`}>
          <Droppable droppableId="navigation-droppable-element">
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {links()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      </DragDropContext>

      <AddElementButton
        options={["label"]}
        action={addNewRoute}
        placeHolder={"Add new route"}
      />
    </>
  );
}
