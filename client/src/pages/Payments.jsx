import CrudPage from "../components/CrudPage";
import { paymentsAPI } from "../services/api";

export default function Payments() {
  return (
    <CrudPage
      title="Payments"
      description="Track client and project payments"
      api={paymentsAPI}
      fields={[
        {
          name: "project",
          label: "Project",
        },
        {
          name: "client",
          label: "Client",
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
        },
        {
          name: "paymentDate",
          label: "Payment Date",
          type: "date",
        },
        {
          name: "method",
          label: "Payment Method",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "Paid",
          options: ["Pending", "Paid", "Partial"],
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          fullWidth: true,
        },
      ]}
      columns={[
        {
          key: "project",
          label: "Project",
        },
        {
          key: "client",
          label: "Client",
        },
        {
          key: "amount",
          label: "Amount",
          render: (row) =>
            `₹${Number(row.amount || 0).toLocaleString()}`,
        },
        {
          key: "paymentDate",
          label: "Date",
          render: (row) =>
            row.paymentDate
              ? new Date(
                  row.paymentDate
                ).toLocaleDateString()
              : "-",
        },
        {
          key: "method",
          label: "Method",
        },
        {
          key: "status",
          label: "Status",
        },
      ]}
    />
  );
}