import CrudPage from "../components/CrudPage";
import { materialsAPI } from "../services/api";

export default function Materials() {
  return (
    <CrudPage
      title="Materials"
      description="Manage construction materials and inventory"
      api={materialsAPI}
      fields={[
        {
          name: "name",
          label: "Material Name",
        },
        {
          name: "category",
          label: "Category",
        },
        {
          name: "quantity",
          label: "Quantity",
          type: "number",
        },
        {
          name: "unit",
          label: "Unit",
          placeholder: "kg, pcs, bags",
        },
        {
          name: "price",
          label: "Price",
          type: "number",
        },
        {
          name: "supplier",
          label: "Supplier",
        },
      ]}
      columns={[
        {
          key: "name",
          label: "Material",
        },
        {
          key: "category",
          label: "Category",
        },
        {
          key: "quantity",
          label: "Quantity",
        },
        {
          key: "unit",
          label: "Unit",
        },
        {
          key: "price",
          label: "Price",
          render: (row) =>
            `₹${Number(row.price || 0).toLocaleString()}`,
        },
        {
          key: "supplier",
          label: "Supplier",
        },
      ]}
    />
  );
}