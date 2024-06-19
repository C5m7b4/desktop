// import styled from "styled-components";

interface Props<T> {
  loading?: boolean;
  downloaded?: number;
  data: T[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Footer = <T, _>(props: Props<T>) => {
  const { loading, downloaded, data } = props;
  return (
    <div>
      {loading ? (
        <div>Loading data....</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div>{downloaded} bytes of data</div>
          <div>{data.length} records</div>
        </div>
      )}
    </div>
  );
};

export default Footer;
