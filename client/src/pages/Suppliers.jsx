import CrudPage from "../components/CrudPage";
import { suppliersAPI } from "../services/api";

export default function Suppliers() {
  return (
    <CrudPage
      title="Suppliers"
      description="Manage material and service suppliers"
      api={suppliersAPI}
      fields={[
        {
          name: "name",
          label: "Contact Name",
        },
        {
          name: "company",
          label: "Company",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
        },
        {
          name: "phone",
          label: "Phone",
        },
        {
          name: "address",
          label: "Address",
          type: "textarea",
          fullWidth: true,
        },
      ]}
      columns={[
        {
          key: "name",
          label: "Contact",
        },
        {
          key: "company",
          label: "Company",
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "phone",
          label: "Phone",
        },
        {
          key: "address",
          label: "Address",
        },
      ]}
    />
  );
}
