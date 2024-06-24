import { useState, useRef } from "react";
import { IRow } from "../dropTargets/Rows";
import { IValue } from "../dropTargets/Values";
import styled from "styled-components";
import HeaderContext from "../contextMenus/HeaderContext";
import AliasModal from "../modals/AliasModal";

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  background-color: ${(props) => props.theme.colors.table.excel};
  color: ${(props) => props.theme.colors.table.thText};
  padding: 3px 8px;
`;

const TableHeaderCell = styled.div<{ $width: number; $align: string }>`
  width: ${(props) => props.$width}px;
  text-align: ${(props) => props.$align};
`;

interface Props {
  rows: IRow[];
  values: IValue[];
  calculateWidth: () => number;
  setValues: (c: IValue[]) => void;
}

function THead(props: Props) {
  const [showHeaderContextMenu, setShowHeaderContextMenu] = useState(false);
  const [showAliasContextMenu, setShowAliasContextMenu] = useState(false);
  const [points, setPoints] = useState({ x: 0, y: 0 });
  const [column, setColumn] = useState("");
  const [aliasValue, setAliasValue] = useState("");
  const { rows, values, setValues, calculateWidth } = props;

  const headerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement>,
    c: string
  ) => {
    e.preventDefault();
    if (headerRef.current) {
      const parentWindow =
        headerRef.current.parentElement?.parentElement?.parentElement
          ?.parentElement?.parentElement?.parentElement?.parentElement
          ?.parentElement;
      if (parentWindow) {
        const parentBox = parentWindow.getBoundingClientRect();
        setPoints({ x: e.pageX - parentBox.left, y: e.pageY - parentBox.top });
        setColumn(c);
        setShowHeaderContextMenu(true);
      } else {
        console.warn("could not find the parent element");
      }
    }
  };

  const getColumn = (c: string) => {
    return values.filter((v) => v.label === c)[0];
  };

  const handleAliasClick = (c: string) => {
    setShowHeaderContextMenu(false);
    setShowAliasContextMenu(true);
    setColumn(c);
  };

  const onAliasValueChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAliasValue(e.target.value);
  };

  const handleConfirmAlias = () => {
    const selectedValue = getColumn(column);
    const copy = [...values];
    const pos = values.findIndex((v) => v.label === column);
    copy.splice(pos, 1, { ...selectedValue, alias: aliasValue });
    setValues(copy);
    setShowAliasContextMenu(false);
    setShowHeaderContextMenu(false);
    setAliasValue("");
  };

  const getAggregatorName = (a: string) => {
    const value = values.filter((v) => v.label === a)[0];
    return value.aggregator;
  };

  return (
    <div ref={headerRef}>
      {showHeaderContextMenu ? (
        <HeaderContext
          top={points.y}
          left={points.x}
          column={column}
          handleAliasClick={handleAliasClick}
          values={values}
          setValues={setValues}
          close={() => {
            setShowHeaderContextMenu(false);
          }}
          showHeaderContextMenu={showHeaderContextMenu}
        />
      ) : null}
      {showAliasContextMenu ? (
        <AliasModal
          isShowing={showAliasContextMenu}
          hide={() => {
            setShowAliasContextMenu(false);
          }}
          title={"Set Alias"}
          column={getColumn(column)}
          value={aliasValue}
          onChange={onAliasValueChanged}
          confirm={handleConfirmAlias}
        />
      ) : null}
      <TableHeader className="seudo-table-header">
        {rows.map((r, i) => {
          if (i === 0) {
            return (
              <TableHeaderCell
                onContextMenu={(e) => {
                  e.preventDefault();
                  setShowHeaderContextMenu(false);
                }}
                $align={"left"}
                $width={calculateWidth()}
                key={`th-${i}`}
              >
                {r.label}
              </TableHeaderCell>
            );
          }
        })}
        {values.map((v, i) => {
          return (
            <TableHeaderCell
              $align={"right"}
              $width={calculateWidth() as number}
              key={`th-v${i}`}
              onContextMenu={(e) => {
                handleContextMenu(e, v.label);
              }}
            >
              {v.alias && v.alias.length > 0
                ? v.alias
                : `${getAggregatorName(v.label)} of ${v.label}`}
            </TableHeaderCell>
          );
        })}
      </TableHeader>
    </div>
  );
}

export default THead;
