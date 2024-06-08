import { doesRowExist } from "../../../utils/arrayUtils";
import styled from "styled-components";

const FiltersContainer = styled.div`
  min-height: 100px;
  background-color: white;
  transition: all 0.4s ease;
  border: 1px solid black;
`;

export interface IRow {
  label: string;
  direction: "asc" | "desc";
}

interface Props {
  rows: IRow[];
  setRows: (r: IRow[]) => void;
}

const Rows: React.FC<Props> = ({ rows, setRows }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("dragging");
    const fieldType = e.dataTransfer.getData("fieldType");
    const newRow: IRow = {
      label: fieldType,
      direction: "asc",
    };

    const isExisting = doesRowExist(rows, "label", fieldType);
    if (isExisting.found) {
      const copy = rows.filter((r) => r.label != fieldType);
      const afterElement = getDragAfterElement(
        document.getElementById("filtered-rows"),
        e.clientY
      );

      if (afterElement) {
        const pos = rows.findIndex((r) => (r.label = afterElement.innerHTML));
        copy.splice(pos, 0, newRow);
        console.log("setting rows to", copy);
        setRows(copy);
      }
    } else {
      const newRows = [...rows, newRow];
      setRows(newRows);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.border = "2px solid #009879";
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    fieldType: IRow
  ) => {
    e.dataTransfer.setData("fieldType", fieldType.label);
    e.currentTarget.style.border = "1px solid #009879";
    e.currentTarget.style.opacity = "0.8";
    e.currentTarget.classList.add("dragging");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // @ts-expect-error cannot be null
    e.currentTarget.style.border = null;
  };

  const getDragAfterElement = (container: HTMLDivElement, y: number) => {
    const draggableElements = [
      ...container.querySelectorAll(".draggable-item:not(.dragging)"),
    ];

    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };
  return (
    <>
      <div>Rows</div>
      <FiltersContainer
        className="filters-container"
        id="filtered-rows"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        {rows.map((r, i) => (
          <div
            draggable
            onDragStart={(e) => handleDragStart(e, r)}
            onDragLeave={(e) => handleDragLeave(e)}
            key={`row-${i}`}
            className="draggable-item"
          >
            {r.label}
          </div>
        ))}
      </FiltersContainer>
    </>
  );
};

export default Rows;
