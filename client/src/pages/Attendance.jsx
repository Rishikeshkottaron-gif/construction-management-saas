import { useEffect, useState } from "react";
import {
  employeesAPI,
  attendanceAPI,
} from "../services/api";

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // --------------------------------------------------
  // LOAD EMPLOYEES
  // --------------------------------------------------

  const loadEmployees = async () => {
    try {
      const response = await employeesAPI.getAll();

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.employees || [];

      setEmployees(data);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to load employees. Make sure the backend is running."
      );
    }
  };

  // --------------------------------------------------
  // LOAD ATTENDANCE
  // --------------------------------------------------

  const loadAttendance = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await attendanceAPI.getByDate(date);

      const records = Array.isArray(response.data)
        ? response.data
        : response.data.attendance || [];

      const attendanceMap = {};

      records.forEach((record) => {
        const employeeId =
          record.employee?._id || record.employee;

        attendanceMap[employeeId] = {
          status: record.status || "Present",
          dayType: record.dayType || "Full Day",
          notes: record.notes || "",
          id: record._id,
        };
      });

      setAttendance(attendanceMap);
    } catch (err) {
      console.error(err);

      setError("Unable to load attendance.");
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // INITIAL LOAD
  // --------------------------------------------------

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [date]);

  // --------------------------------------------------
  // CHANGE STATUS
  // --------------------------------------------------

  const updateAttendance = (
    employeeId,
    field,
    value
  ) => {
    setAttendance((previous) => ({
      ...previous,

      [employeeId]: {
        status:
          previous[employeeId]?.status || "Present",

        dayType:
          previous[employeeId]?.dayType || "Full Day",

        notes:
          previous[employeeId]?.notes || "",

        ...previous[employeeId],

        [field]: value,
      },
    }));
  };

  // --------------------------------------------------
  // SAVE
  // --------------------------------------------------

  const saveAttendance = async (employee) => {
    const employeeId = employee._id;

    const record = attendance[employeeId] || {
      status: "Present",
      dayType: "Full Day",
      notes: "",
    };

    try {
      setSaving(employeeId);
      setError("");
      setSuccess("");

      await attendanceAPI.create({
        employee: employeeId,
        date,
        status: record.status,
        dayType: record.dayType,
        notes: record.notes,
      });

      setSuccess(
        `Attendance saved for ${
          employee.name || employee.fullName || "employee"
        }.`
      );

      await loadAttendance();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to save attendance."
      );
    } finally {
      setSaving(null);
    }
  };

  // --------------------------------------------------
  // SAVE ALL
  // --------------------------------------------------

  const saveAllAttendance = async () => {
    try {
      setError("");
      setSuccess("");
      setSaving("all");

      for (const employee of employees) {
        const employeeId = employee._id;

        const record =
          attendance[employeeId] || {
            status: "Present",
            dayType: "Full Day",
            notes: "",
          };

        await attendanceAPI.create({
          employee: employeeId,
          date,
          status: record.status,
          dayType: record.dayType,
          notes: record.notes,
        });
      }

      setSuccess(
        "Attendance saved successfully for all employees."
      );

      await loadAttendance();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to save attendance."
      );
    } finally {
      setSaving(null);
    }
  };

  // --------------------------------------------------
  // COUNTS
  // --------------------------------------------------

  const presentCount = employees.filter(
    (employee) =>
      attendance[employee._id]?.status === "Present"
  ).length;

  const absentCount = employees.filter(
    (employee) =>
      attendance[employee._id]?.status === "Absent"
  ).length;

  const halfDayCount = employees.filter(
    (employee) =>
      attendance[employee._id]?.status === "Present" &&
      attendance[employee._id]?.dayType === "Half Day"
  ).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Attendance</h1>

          <p>
            Record daily employee attendance
          </p>
        </div>

        <div>
          <button
            className="primary-button"
            onClick={saveAllAttendance}
            disabled={
              saving === "all" ||
              employees.length === 0
            }
          >
            {saving === "all"
              ? "Saving..."
              : "Save All Attendance"}
          </button>
        </div>
      </div>

      {/* DATE */}

      <div className="attendance-toolbar">
        <div>
          <label>Attendance Date</label>

          <input
            type="date"
            value={date}
            onChange={(event) =>
              setDate(event.target.value)
            }
          />
        </div>

        <div className="attendance-summary">
          <div className="attendance-stat">
            <strong>{employees.length}</strong>
            <span>Total Employees</span>
          </div>

          <div className="attendance-stat present">
            <strong>{presentCount}</strong>
            <span>Present</span>
          </div>

          <div className="attendance-stat absent">
            <strong>{absentCount}</strong>
            <span>Absent</span>
          </div>

          <div className="attendance-stat half">
            <strong>{halfDayCount}</strong>
            <span>Half Day</span>
          </div>
        </div>
      </div>

      {/* MESSAGES */}

      {error && (
        <div className="alert error">
          {error}
        </div>
      )}

      {success && (
        <div className="alert success">
          {success}
        </div>
      )}

      {/* TABLE */}

      <div className="card">
        <div className="card-header">
          <div>
            <h2>Employee Attendance</h2>

            <p>
              {date}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="empty-state">
            Loading attendance...
          </div>
        ) : employees.length === 0 ? (
          <div className="empty-state">
            <h3>No employees found</h3>

            <p>
              Add employees from the Employees page
              first. They will automatically appear
              here.
            </p>
          </div>
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Day Type</th>
                  <th>Notes</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => {
                  const employeeId =
                    employee._id;

                  const record =
                    attendance[employeeId] || {
                      status: "Present",
                      dayType: "Full Day",
                      notes: "",
                    };

                  return (
                    <tr key={employeeId}>
                      <td>
                        <div className="employee-cell">
                          <div className="employee-avatar">
                            {(
                              employee.name ||
                              employee.fullName ||
                              "E"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {employee.name ||
                                employee.fullName ||
                                "Unnamed Employee"}
                            </strong>

                            <small>
                              {employee.email || ""}
                            </small>
                          </div>
                        </div>
                      </td>

                      <td>
                        {employee.role ||
                          employee.position ||
                          "-"}
                      </td>

                      <td>
                        <select
                          value={record.status}
                          onChange={(event) =>
                            updateAttendance(
                              employeeId,
                              "status",
                              event.target.value
                            )
                          }
                          className={
                            record.status ===
                            "Present"
                              ? "status-present"
                              : "status-absent"
                          }
                        >
                          <option value="Present">
                            Present
                          </option>

                          <option value="Absent">
                            Absent
                          </option>
                        </select>
                      </td>

                      <td>
                        <select
                          value={record.dayType}
                          onChange={(event) =>
                            updateAttendance(
                              employeeId,
                              "dayType",
                              event.target.value
                            )
                          }
                        >
                          <option value="Full Day">
                            Full Day
                          </option>

                          <option value="Half Day">
                            Half Day
                          </option>
                        </select>
                      </td>

                      <td>
                        <input
                          type="text"
                          placeholder="Optional note"
                          value={
                            record.notes || ""
                          }
                          onChange={(event) =>
                            updateAttendance(
                              employeeId,
                              "notes",
                              event.target.value
                            )
                          }
                        />
                      </td>

                      <td>
                        <button
                          className="save-button"
                          onClick={() =>
                            saveAttendance(employee)
                          }
                          disabled={
                            saving === employeeId
                          }
                        >
                          {saving === employeeId
                            ? "Saving..."
                            : "Save"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;