import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Redux/rootReducer';
import { addEntry } from '../Redux/entriesSlice';
import { useDispatch, useSelector } from 'react-redux';

const EntryAdd = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const entries = useSelector((state: RootState) => state.entries.entries);

  const [validationErrors, setValidationErrors] = useState<any>({});

  const [newEntry, setNewEntry] = useState<any>({
    id: entries?.length + 1,
    enabled: true,
    type: '',
    description: '',
    group: '',
    rate: '',
    width: '',
    height: '',
    unit: '',
    matchSize: '',
    summary: '',
    order: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry: any) => ({
      ...prevEntry,
      [name]: value,
    }));

  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEntry((prevEntry: any) => ({
      ...prevEntry,
      [name]: value,
    }));

  };

  const validateForm = () => {
    const errors: any = {};
    if (!newEntry.type) {
      errors.type = 'Type is required';
    }
    else if (!newEntry.description) {
      errors.description = 'Description is required';
    }
    else if (!newEntry.group) {
      errors.group = 'Group is required';
    }
    else if (!newEntry.rate) {
      errors.rate = 'Rate is required';
    }
    else if (!newEntry.width) {
      errors.width = 'Width is required';
    }
    else if (!newEntry.height) {
      errors.height = 'Height is required';
    }
    else if (!newEntry.unit) {
      errors.unit = 'Unit is required';
    }
  
    else if (!newEntry.summary) {
      errors.summary = 'Summary is required';
    }
    else if (!newEntry.order) {
      errors.order = 'Order is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddEntry = () => {
    const isValid = validateForm();
    if (isValid) {
    dispatch(addEntry(newEntry));
    navigate('/');
  }}

  function getOrdinalNumber(number : number) {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    const remainder = number % 100;
    const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
    return number + suffix;
  }
  return (
    <div className="container">
      <h2>Add New Entry - <span>{ getOrdinalNumber(entries?.length  + 1)}</span></h2>
      <form>
        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            className="form-control"
            name="type"
            value={newEntry.type}
            onChange={handleInputChange}
          />
        </div>
        {validationErrors.type && <div className="error">{validationErrors.type}</div>}
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={newEntry.description}
            onChange={handleInputChange}
          />
        </div>
        {validationErrors.description && <div className="error">{validationErrors.description}</div>}
        <div className="form-group">
          <label>Group:</label>
          <input
            type="text"
            className="form-control"
            name="group"
            value={newEntry.group}
            onChange={handleInputChange}
          />
        </div>
        {validationErrors.group && <div className="error">{validationErrors.group}</div>}
        <div className="form-group">
          <label>Rate:</label>
          <input
            type="number"
            className="form-control"
            name="rate"
            value={newEntry.rate}
            onChange={handleInputChange}
          />
        </div>
        {validationErrors.rate && <div className="error">{validationErrors.rate}</div>}
        <div className="form-group">
          <label>Dimensions:</label>
          <div className="row">
            <div className="col">
              <input
                type="number"
                className="form-control"
                name="width"
                value={newEntry.width}
                onChange={handleInputChange}
                placeholder="Width"
              />
            </div>
            <div className="col">
              <input
                type="number"
                className="form-control"
                name="height"
                value={newEntry.height}
                onChange={handleInputChange}
                placeholder="Height"
              />
            </div>
          </div>
        </div>
        {validationErrors.width && <div className="error">{validationErrors.width }</div>}
        {validationErrors.height && <div className="error">{validationErrors.height}</div>}
        <div className="form-group">
          <label>Unit:</label>
          <select
            className="form-control"
            name="unit"
            value={newEntry.unit}
            onChange={handleSelectChange}
          >
            <option value="">Select Unit</option>
            <option value="0">0 (None)</option>
            <option value="1">1 (Each)</option>
            <option value="2">2 (M2)</option>
            <option value="4">4 (WxD)</option>
            <option value="8">8 (DxH)</option>
            <option value="16">16 (WxH)</option>
          </select>
        </div>
        {validationErrors.unit && <div className="error">{validationErrors.unit}</div>}
        <div className="form-group">
          <label>Match Size:</label>
          <select
            className="form-control"
            value={newEntry.matchSize}
            name="matchSize"
            onChange={handleSelectChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="form-group">
          <label>Summary:</label>
          <input
            type="text"
            className="form-control"
            name="summary"
            value={newEntry.summary}
            onChange={handleInputChange}
          />
        </div>
        {validationErrors.summary && <div className="error">{validationErrors.summary}</div>}
        <div className="form-group">
          <label>Order:</label>
          <input
            type="number"
            className="form-control"
            name="order"
            value={newEntry.order}
            onChange={handleInputChange}
          />
        </div>
        {validationErrors.order && <div className="error">{validationErrors.order}</div>}
        <div className="d-flex">
          <button type="button" className="btn btn-primary mr-3" onClick={handleAddEntry}>
            Add Entry
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EntryAdd;
