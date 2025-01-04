import ShowDetailsRowDemo from "../tables/ShowDetailsRow";

const ShowDetailsTableDemo = ({ Show_Row_Form, default_data , icon = null,style }) => {
  return <ShowDetailsRowDemo DialogForm={Show_Row_Form} default_data={default_data} icon={icon} style={style}/>;
};

export default ShowDetailsTableDemo;
