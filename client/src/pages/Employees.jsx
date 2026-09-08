import CrudPage from "../components/CrudPage";
import { employeesAPI } from "../services/api";

export default function Employees() {
  return (
    <CrudPage
      title="Employees"
      description="Manage company employees and workforce"
      api={employeesAPI}
      fields={[
        {
          name: "name",
          label: "Employee Name",
          placeholder: "Employee name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "employee@example.com",
        },
        {
          name: "phone",
          label: "Phone",
          placeholder: "9876543210",
        },
        {
          name: "role",
          label: "Role",
          placeholder: "Engineer",
        },
        {
          name: "department",
          label: "Department",
          placeholder: "Construction",
        },
        {
          name: "salary",
          label: "Salary",
          type: "number",
          defaultValue: 0,
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "Active",
          options: ["Active", "Inactive"],
        },
      ]}
      columns={[
        {
          key: "name",
          label: "Employee",
        },
        {
          key: "role",
          label: "Role",
        },
        {
          key: "department",
          label: "Department",
        },
        {
          key: "phone",
          label: "Phone",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "salary",
          label: "Salary",
          render: (row) =>
            `₹${Number(row.salary || 0).toLocaleString()}`,
        },
      ]}
    />
  );
}