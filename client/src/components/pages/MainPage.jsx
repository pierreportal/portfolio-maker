import React, { useState, useEffect } from "react";
import {
  getTemplate,
  getFeed,
  addNewModuleToDB,
  updateModuleOrderingToDB,
} from "../../api";
import {
  generateComponent,
  styledTemplateModule,
} from "../../component-generator";
// import startedKidTemplateData from "../../starterKitData.json";
import AddElementButtonDropDown from "../UIElements/AddElementButtonDropDown";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const newDefaultModules = {
  heading: {
    id: 2,
    type: "sectionTitle",
    label: "Section Title",
    content: "Latest Work",
    params: { level: "1" },
    collection: "main",
  },
  text: {
    id: 6,
    type: "textComponent",
    label: "Text Paragraph",
    content:
      "this is an example of long text Charles-Pierre Baudelaire war ein französischer Schriftsteller und einer der bedeutendsten Lyriker der französischen Sprache. Er ist vor allem durch seine Gedichtsammlung Les Fleurs du Mal bekannt geworden und gilt als wichtiger Wegbereiter der literarischen",
    collection: "main",
  },
};

export default function MainPage(props) {
  const { isLoggedin, user, testUserSetting, feedName, templateName } = props;
  // GET COMPONENTS
  const [modularTemplate, setModularTemplate] = useState([]);
  const [templateFromDB, setTemplateFromDB] = useState([]);
  const [feedFromDB, setFeedFromDB] = useState({ posts: [] });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    getFeed(feedName).then((data) => setFeedFromDB({ posts: data }));
  }, []);

  useEffect(() => {
    getTemplate(templateName).then(
      (data) => data && setTemplateFromDB(data.modules)
    );
  }, [feedFromDB]);

  useEffect(() => console.log(templateFromDB), [templateFromDB]);

  const buildTemplate = (modules) => {
    const list =
      modules &&
      modules.map((module, i) => {
        return (
          <div key={(i + Math.random()).toString()}>
            {generateComponent(
              i,
              isLoggedin,
              styledTemplateModule(module),
              feedFromDB,
              testUserSetting,
              user
            )}
          </div>
        );
      });
    setModularTemplate(list);
  };

  useEffect(() => buildTemplate(templateFromDB), [templateFromDB]);
  // END GET COMPONENTS
  const addModule = (module) => {
    console.log(module);
    setTemplateFromDB([
      ...templateFromDB,
      newDefaultModules[module.toLowerCase()],
    ]);
    addNewModuleToDB(templateName, module);
  };

  const draggableModularTemplate = () =>
    modularTemplate.map((x, i) => {
      console.log("x: ", x);
      return (
        <Draggable key={x.key} draggableId={x.key} index={i}>
          {(provided) => (
            <div
              className="draggable-item"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {x}
            </div>
          )}
        </Draggable>
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

    // const elem = stateRoutes.find((r) => r.label === draggableId);

    // const newRouteOrdering = stateRoutes;
    // newRouteOrdering.splice(source.index, 1);
    // newRouteOrdering.splice(destination.index, 0, elem);
    // updateRouteToDB(newRouteOrdering);
    // return setStateRoute(newRouteOrdering);
  };

  const handleDragging = () => {
    setDragging(true);
  };

  return (
    <>
      {modularTemplate.length ? (
        //

        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragging}>
          <Droppable droppableId="mainPage-droppable-element">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {draggableModularTemplate()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        //
        <div>Start right here</div>
      )}
      <AddElementButtonDropDown
        action={addModule}
        options={["Heading", "Feed", "Columns", "Text"]}
      />
    </>
  );
}
