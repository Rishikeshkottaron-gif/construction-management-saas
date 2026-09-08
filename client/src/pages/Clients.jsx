import CrudPage from "../components/CrudPage";
import { clientsAPI } from "../services/api";

export default function Clients() {
  return (
    <CrudPage
      title="Clients"
      description="Manage construction clients"
      api={clientsAPI}
      fields={[
        {
          name: "name",
          label: "Client Name",
          placeholder: "Client name",
        },
        {
          name: "company",
          label: "Company",
          placeholder: "Company name",
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
          label: "Client",
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