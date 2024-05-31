import React from "react";
import Branch from "./Branch";

export interface TableProps<T> {
  data: T[];
}

const Tree =
  <T,>(): React.FC<TableProps<T>> =>
  (props: TableProps<T>) => {
    const { data } = props;
    return (
      <div>
        {data.map((item) => (
          <Branch key={item.id} item={item} level={0} />
        ))}
      </div>
    );
  };

export default Tree;
