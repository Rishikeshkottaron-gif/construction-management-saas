import CrudPage from "../components/CrudPage";
import { expensesAPI } from "../services/api";

export default function Expenses() {
  return (
    <CrudPage
      title="Expenses"
      description="Track construction project expenses"
      api={expensesAPI}
      fields={[
        {
          name: "title",
          label: "Expense",
        },
        {
          name: "project",
          label: "Project",
        },
        {
          name: "category",
          label: "Category",
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
        },
        {
          name: "date",
          label: "Date",
          type: "date",
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
          key: "title",
          label: "Expense",
        },
        {
          key: "project",
          label: "Project",
        },
        {
          key: "category",
          label: "Category",
        },
        {
          key: "amount",
          label: "Amount",
          render: (row) =>
            `₹${Number(row.amount || 0).toLocaleString()}`,
        },
        {
          key: "date",
          label: "Date",
          render: (row) =>
            row.date
              ? new Date(
                  row.date
                ).toLocaleDateString()
              : "-",
        },
      ]}
    />
  );
}