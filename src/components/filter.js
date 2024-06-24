import React, { useState } from 'react';
import { Card, Col, FloatingLabel, Form, Row, Button } from 'react-bootstrap';

const Filter = () => {
  const [formData, setFormData] = useState({
    email: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    days: [],
    speciality: '',
    program: '',
    clinic: '',
    clinician: '',
    appointmentType: '',
    appointmentMethod: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        days: checked
          ? [...prevData.days, value]
          : prevData.days.filter((day) => day !== value)
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleReset = () => {
    setFormData({
      email: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',
      days: [],
      speciality: '',
      program: '',
      clinic: '',
      clinician: '',
      appointmentType: '',
      appointmentMethod: ''
    });
  };

  const handleSearch = () => {
    console.log(formData);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title className='mb-3'>Filter</Card.Title>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingStartDate" label="Start Date">
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingEndDate" label="End Date">
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingStartTime" label="Start Time">
              <Form.Select
                aria-label="Start Time select"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, '0') + ':00'}>
                    {i.toString().padStart(2, '0') + ':00'}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
          <Col md>
            <FloatingLabel controlId="floatingEndTime" label="End Time">
              <Form.Select
                aria-label="End Time select"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={i.toString().padStart(2, '0') + ':00'}>
                    {i.toString().padStart(2, '0') + ':00'}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <Form.Group controlId="formDays" className="mb-3">
              <Form.Label>Days</Form.Label>
              <div>
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <Form.Check
                    inline
                    key={day}
                    type="checkbox"
                    label={day}
                    value={day}
                    name="days"
                    checked={formData.days.includes(day)}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingSpeciality" label="Speciality">
              <Form.Select
                aria-label="Speciality select"
                name="speciality"
                value={formData.speciality}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Neurology">Neurology</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingProgram" label="Program">
              <Form.Select
                aria-label="Program select"
                name="program"
                value={formData.program}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="Program1">Program1</option>
                <option value="Program2">Program2</option>
                <option value="Program3">Program3</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingClinic" label="Clinic">
              <Form.Select
                aria-label="Clinic select"
                name="clinic"
                value={formData.clinic}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="Clinic1">Clinic1</option>
                <option value="Clinic2">Clinic2</option>
                <option value="Clinic3">Clinic3</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingClinician" label="Clinician">
              <Form.Select
                aria-label="Clinician select"
                name="clinician"
                value={formData.clinician}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="Clinician1">Clinician1</option>
                <option value="Clinician2">Clinician2</option>
                <option value="Clinician3">Clinician3</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingAppointmentType" label="Appointment Type">
              <Form.Select
                aria-label="Appointment Type select"
                name="appointmentType"
                value={formData.appointmentType}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
                <option value="Type3">Type3</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="g-2 mb-3">
          <Col md>
            <FloatingLabel controlId="floatingAppointmentMethod" label="Appointment Method">
              <Form.Select
                aria-label="Appointment Method select"
                name="appointmentMethod"
                value={formData.appointmentMethod}
                onChange={handleChange}
              >
                <option>Select</option>
                <option value="Method1">Method1</option>
                <option value="Method2">Method2</option>
                <option value="Method3">Method3</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="mt-3 justify-content-end">
          <Col md="auto">
            <Button variant="secondary" onClick={handleReset} className="me-2">
              Reset
            </Button>
            <Button variant="primary" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Filter;
