import React, { useState, useEffect } from 'react';
import './AppointmentBookingPopup.css';

const CustomPopup = ({ event, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  
  const [patient, setPatient] = useState(event.patient || '');
  const [episodeOfCare, setEpisodeOfCare] = useState(event.episodeOfCare || '');
  const [appointmentType, setAppointmentType] = useState(event.appointmentType || '');
  const [organizationUnit, setOrganizationUnit] = useState(event.organizationUnit || '');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const formatDateToLocalInput = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num);
  
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  useEffect(() => {
    setStartTime(event.StartTime);
    setEndTime(event.EndTime);
  }, [event]);

  const patients = [
    { id: 1, name: 'Jacob' },
    { id: 2, name: 'Selena' },
    { id: 3, name: 'Edmand' }
  ];

  useEffect(() => {
    if (searchQuery) {
      const filtered = patients.filter((patient) => 
        patient.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients([]);
    }
  }, [searchQuery]);

  const handlePatientSelect = (patient) => {
    setSearchQuery(patient.name);
    setPatient(patient.name);
    setFilteredPatients([]);
  };

  const createAppointment = () => {
    onClose();
  };

  return (
    <div className="custom-popup e-popup e-control e-lib e-device e-popup-open">
      <div className="custom-popup-content e-content">
        <span className="custom-popup-close e-close" onClick={onClose}>&times;</span>
        <h2 className="e-title" style={{ width: '100%' }}>Book Appointment</h2>
        
        <div className="form-group">
          <label className="e-label">Patient</label>
          <div className="dropdown-wrapper">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search Patient"
              className="custom-popup-input e-input"
            />
            {filteredPatients.length > 0 && (
              <ul className="dropdown">
                {filteredPatients.map((patient) => (
                  <li key={patient.id} onMouseDown={() => handlePatientSelect(patient)}>
                    {patient.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="form-group">
          <label className="e-label">Episode of Care</label>
          <select value={episodeOfCare} onChange={(e) => setEpisodeOfCare(e.target.value)} className="custom-popup-input e-input">
            <option value="">Select Episode of Care</option>
            <option value="episode1">Episode 1</option>
          </select>
        </div>

        <div className="form-group">
          <label className="e-label">Start Time</label>
          <input type="datetime-local" value={formatDateToLocalInput(startTime)} disabled className="custom-popup-input e-input" />
        </div>

        <div className="form-group">
          <label className="e-label">End Time</label>
          <input type="datetime-local" value={formatDateToLocalInput(endTime)} disabled className="custom-popup-input e-input" />
        </div>

        <div className="form-group">
          <label className="e-label">Organization Unit</label>
          <select value={organizationUnit} onChange={(e) => setOrganizationUnit(e.target.value)} className="custom-popup-input e-input">
            <option value="">Select Organization Unit</option>
            <option value="unit1">Organization 1</option>
            <option value="unit2">Organization 2</option>
          </select>
        </div>

        <div className="form-group">
          <label className="e-label">Appointment Type</label>
          <select value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)} className="custom-popup-input e-input">
            <option value="">Select Appointment Type</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            <option value="type3">Type 3</option>
          </select>
        </div>

        <button className="e-btn e-primary" onClick={createAppointment}>Save</button>
      </div>
    </div>
  );
};

export default CustomPopup;
