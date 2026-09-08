import { useEffect, useState } from "react";

export default function CrudPage({
  title,
  description,
  api,
  fields,
  columns,
}) {
  const createEmptyForm = () => {
    const result = {};

    fields.forEach((field) => {
      result[field.name] = field.defaultValue ?? "";
    });

    return result;
  };

  const [records, setRecords] = useState([]);
  const [form, setForm] = useState(createEmptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);

      const response = await api.getAll();

      setRecords(response.data);
    } catch (error) {
      console.error(error);
      alert(`Unable to load ${title.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        await api.update(editingId, form);
      } else {
        await api.create(form);
      }

      setForm(createEmptyForm());
      setEditingId(null);

      await load();
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.error ||
          `Unable to save ${title.toLowerCase()}.`
      );
    }
  };

  const edit = (record) => {
    const nextForm = {};

    fields.forEach((field) => {
      let value = record[field.name] ?? "";

      if (
        field.type === "date" &&
        value
      ) {
        value = String(value).substring(0, 10);
      }

      nextForm[field.name] = value;
    });

    setForm(nextForm);
    setEditingId(record._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this record?")) {
      return;
    }

    try {
      await api.remove(id);

      await load();
    } catch (error) {
      console.error(error);
      alert("Unable to delete record.");
    }
  };

  return (
    <div>
      <div className="page-heading">
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <section className="panel form-panel">
        <div className="panel-header">
          <div>
            <h2>
              {editingId
                ? `Edit ${title.slice(0, -1)}`
                : `Add ${title.slice(0, -1)}`}
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {fields.map((field) => (
              <label
                key={field.name}
                className={
                  field.fullWidth ? "full-width" : ""
                }
              >
                {field.label}

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select...
                    </option>

                    {field.options.map((option) => (
                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                  />
                )}
              </label>
            ))}
          </div>

          <div className="form-actions">
            <button
              className="primary-button"
              type="submit"
            >
              {editingId ? "Update" : "Add"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setEditingId(null);
                  setForm(createEmptyForm());
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <h2>{title}</h2>
            <p>{records.length} records</p>
          </div>
        </div>

        {loading ? (
          <div className="loading">
            Loading...
          </div>
        ) : records.length === 0 ? (
          <div className="empty-state compact">
            No records available.
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>
                      {column.label}
                    </th>
                  ))}

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    {columns.map((column) => (
                      <td key={column.key}>
                        {column.render
                          ? column.render(record)
                          : record[column.key] || "-"}
                      </td>
                    ))}

                    <td>
                      <div className="action-buttons">
                        <button
                          className="small-button"
                          onClick={() => edit(record)}
                        >
                          Edit
                        </button>

                        <button
                          className="small-button danger"
                          onClick={() =>
                            remove(record._id)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}