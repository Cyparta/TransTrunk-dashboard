import EditRowDemo from "@/components/tables/EditRow";

const EditTableDemo = ({ Edit_Row_Form, default_data , icon = null }) => {
  return <EditRowDemo DialogForm={Edit_Row_Form} default_data={default_data} icon={icon} />;
};

export default EditTableDemo;
