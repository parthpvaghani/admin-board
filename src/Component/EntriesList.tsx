import React from "react";
import { Unit } from "./Mock/types";
import { useNavigate } from "react-router-dom";
import { RootState } from "../Redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { selectEntry, deleteEntry } from "../Redux/entriesSlice";

const EntriesList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.entries.entries);

  const handleEntryAdd = () => {
    navigate("/add");
  }

  const handleEntrySelect = (entryId: string) => {
    dispatch(selectEntry(entryId));
    navigate(`/edit/${entryId}`);
  };

  const handleEntryDelete = (entryId: string) => {
    dispatch(deleteEntry(entryId));
  };

  return (
    <div style={{ margin: "0 50px"}}>
      <div className="d-flex mb-4">
        <button
          className="btn btn-primary"
          onClick={handleEntryAdd}
        >
          Add
        </button>
      </div>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Enabled</th>
            <th>Type</th>
            <th>Width</th>
            <th>Height</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Match Size</th>
            <th>Group</th>
            <th>Description</th>
            <th>Summary</th>
            <th>Order</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry: any) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{entry.enabled ? 'Yes' : 'No'}</td>
              <td>{entry.type}</td>
              <td>{entry.width}</td>
              <td>{entry.height}</td>
              <td>{Unit[entry.unit]}</td>
              <td>{entry.rate}</td>
              <td>{entry.matchSize ? 'Yes' : 'No'}</td>
              <td>{entry.group}</td>
              <td>{entry.description}</td>
              <td>{entry.summary}</td>
              <td>{entry.order}</td>
              <td className="d-flex">
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleEntrySelect(entry.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleEntryDelete(entry.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntriesList;

