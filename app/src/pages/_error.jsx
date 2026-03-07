import Error from "next/error";

const CustomErrorComponent = ({ statusCode }) => {
  return <Error statusCode={statusCode} />;
};

export default CustomErrorComponent;
