import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../Redux/rootReducer';
import { saveChanges } from '../Redux/entriesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { PriceTemplateItemReadDto } from './Mock/types';

const EntryEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedEntry = useSelector((state: RootState) => state.entries.selectedEntry);

  const [editedEntry, setEditedEntry] = useState<PriceTemplateItemReadDto | null>(null);
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    setEditedEntry(selectedEntry);
  }, [selectedEntry]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedEntry) {
      const { name, value } = e.target;
      setEditedEntry((prevState: any) => ({
        ...prevState,
        [name]: value,
      }));
      
      if (isFormSubmitted) {
        setValidationErrors((prevErrors: any) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (editedEntry) {
      const { name, value } = e.target;
      setEditedEntry((prevState: any) => ({
        ...prevState,
        [name]: name === 'matchSize' ? value === 'true' : value,
      }));
      if (isFormSubmitted) {
        setValidationErrors((prevErrors: any) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }
  };

  const validateForm = () => {
    const errors: any = {};
    if (!editedEntry?.type) {
      errors.type = 'Type is required';
    }
    if (!editedEntry?.description) {
      errors.description = 'Description is required';
    }
    if (!editedEntry?.group) {
      errors.group = 'Group is required';
    }
    if (!editedEntry?.rate) {
      errors.rate = 'Rate is required';
    }
    if (!editedEntry?.width) {
      errors.width = 'Width is required';
    }
    if (!editedEntry?.height) {
      errors.height = 'Height is required';
    }
    if (!editedEntry?.unit) {
      errors.unit = 'Unit is required';
    }
    if (!editedEntry?.summary) {
      errors.summary = 'Summary is required';
    }
    if (!editedEntry?.order) {
      errors.order = 'Order is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = () => {
    setIsFormSubmitted(true);
    const isValid = validateForm();
    if (editedEntry && isValid) {
      dispatch(saveChanges(editedEntry));
      navigate('/');
    }
  };

  const handleCancelChanges = () => {
    navigate('/');
    setEditedEntry(null);
  };

  return (
    <div className="container">
      <h2>Edit Entry</h2>
      {selectedEntry && editedEntry && (
        <form>
          <div className="form-group">
            <label>Type:</label>
            <input
              type="text"
              className="form-control"
              name="type"
              value={editedEntry.type}
              onChange={handleInputChange}
            />
            {validationErrors.type && <p className="error">{validationErrors.type}</p>}
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={editedEntry.description}
              onChange={handleInputChange}
            />
            {validationErrors.description && <p className="error">{validationErrors.description}</p>}
          </div>
          <div className="form-group">
            <label>Group:</label>
            <input
              type="text"
              className="form-control"
              name="group"
              value={editedEntry.group}
              onChange={handleInputChange}
            />
            {validationErrors.group && <p className="error">{validationErrors.group}</p>}
          </div>
          <div className="form-group">
            <label>Rate:</label>
            <input
              type="number"
              className="form-control"
              name="rate"
              value={editedEntry.rate}
              onChange={handleInputChange}
            />
            {validationErrors.rate && <p className="error">{validationErrors.rate}</p>}
          </div>
          <div className="form-group">
            <label>Dimensions:</label>
            <div className="row">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  name="width"
                  value={editedEntry.width}
                  onChange={handleInputChange}
                  placeholder="Width"
                />
                {validationErrors.width && <p className="error">{validationErrors.width}</p>}
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  name="height"
                  value={editedEntry.height}
                  onChange={handleInputChange}
                  placeholder="Height"
                />
                {validationErrors.height && <p className="error">{validationErrors.height}</p>}
              </div>
            </div>
          </div>
          <div className="form-group">
            <label>Unit:</label>
            <select
              className="form-control"
              name="unit"
              value={editedEntry.unit}
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
            {validationErrors.unit && <p className="error">{validationErrors.unit}</p>}
          </div>
          <div className="form-group">
            <label>Match Size:</label>
            <select
              className="form-control"
              value={editedEntry.matchSize.toString()} // Convert boolean to string
              name="matchSize"
              onChange={handleSelectChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            {validationErrors.matchSize && <p className="error">{validationErrors.matchSize}</p>}
          </div>
          <div className="form-group">
            <label>Summary:</label>
            <input
              type="text"
              className="form-control"
              name="summary"
              value={editedEntry.summary}
              onChange={handleInputChange}
            />
            {validationErrors.summary && <p className="error">{validationErrors.summary}</p>}
          </div>
          <div className="form-group">
            <label>Order:</label>
            <input
              type="number"
              className="form-control"
              name="order"
              value={editedEntry.order}
              onChange={handleInputChange}
            />
            {validationErrors.order && <p className="error">{validationErrors.order}</p>}
          </div>
          <div className="d-flex">
            <button type="button" className="btn btn-primary mr-3" onClick={handleSaveChanges}>
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelChanges}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EntryEdit;
