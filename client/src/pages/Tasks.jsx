import CrudPage from "../components/CrudPage";
import { tasksAPI } from "../services/api";

export default function Tasks() {
  return (
    <CrudPage
      title="Tasks"
      description="Track construction tasks and assignments"
      api={tasksAPI}
      fields={[
        {
          name: "title",
          label: "Task Title",
        },
        {
          name: "project",
          label: "Project",
        },
        {
          name: "assignedTo",
          label: "Assigned To",
        },
        {
          name: "dueDate",
          label: "Due Date",
          type: "date",
        },
        {
          name: "priority",
          label: "Priority",
          type: "select",
          defaultValue: "Medium",
          options: ["Low", "Medium", "High"],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          defaultValue: "Pending",
          options: [
            "Pending",
            "In Progress",
            "Completed",
          ],
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
          label: "Task",
        },
        {
          key: "project",
          label: "Project",
        },
        {
          key: "assignedTo",
          label: "Assigned To",
        },
        {
          key: "priority",
          label: "Priority",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "dueDate",
          label: "Due Date",
          render: (row) =>
            row.dueDate
              ? new Date(
                  row.dueDate
                ).toLocaleDateString()
              : "-",
        },
      ]}
    />
  );
}