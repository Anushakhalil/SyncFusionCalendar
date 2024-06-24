import React, { useState, useEffect } from 'react';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject, ViewsDirective, ViewDirective, ResourcesDirective, ResourceDirective } from '@syncfusion/ej2-react-schedule';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import './App.css';
import CustomPopup from './AppointmentBookingPopup';
import Filter from './components/filter';
const isDynamicsEnvironment = typeof Xrm !== 'undefined';

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [events, setEvents] = useState([]);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [formData, setFormData] = useState({
    resource: '',
    fromTime: '',
    appointmentDate: '',
    toTime: '',
  });

  const [filteredEvents, setFilteredEvents] = useState([]);
  const handleOpenRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearch = () => {
    console.log('Search Data:', formData);
    const filtered = events.filter((event) => {
      const eventDate = event.StartTime.toISOString().split('T')[0];
      return (
        event.Subject.includes(formData.resource) &&
        eventDate === formData.appointmentDate &&
        event.StartTime.toLocaleTimeString() === formData.fromTime &&
        event.EndTime.toLocaleTimeString() === formData.toTime
      );
    });
    setFilteredEvents(filtered);
  };

  const [ownerData] = useState([
    { OwnerText: 'Anusha Khalil', Id: "a0ba1d19-90a7-ed11-aad0-6045bd038a21", OwnerColor: '#ffaa00' }
  ]);


  useEffect(() => {
    let Xrm;
    if (isDynamicsEnvironment) {
      Xrm = window.Xrm;
    } else {
      Xrm = import('./mockXrm').then(module => module.default);
    }

    const fetchData = async () => {
      const resourceTimeslots = `<fetch>
            <entity name="mzk_resourcetimeslot">
              <attribute name="mzk_resourcetimeslotid" />
              <attribute name="mzk_name" />
              <attribute name="createdon" />
              <attribute name="mzk_from" />
              <attribute name="mzk_to" />
              <attribute name="mzk_appointmenttype" />
              <attribute name="mzk_slottype" />
              <order attribute="mzk_name" descending="false" />
              <filter type="or">
                <condition attribute="mzk_slottype" operator="eq" value="275380000" />
                <condition attribute="mzk_slottype" operator="eq" value="275380002" /> 
              </filter>
              <link-entity name="mzk_resourceworkhour" from="mzk_resourceworkhourid" to="mzk_resourceworkhour" alias="wh">
                <link-entity name="mzk_resourcecalendar" from="mzk_resourcecalendarid" to="mzk_resourcecalendar" alias="rc">
                  <attribute name="mzk_resource" />
                  <attribute name="mzk_organizationalunit" />
                  <filter type="and">
                    <condition attribute="mzk_resource" operator="in">
                      <value>a0ba1d19-90a7-ed11-aad0-6045bd038a21</value>
                    </condition>
                    <condition attribute="mzk_organizationalunit" operator="in">
                      <value>fab2051b-ac73-ec11-8941-000d3a34a532</value>
                      <value>e7a38f39-ac73-ec11-8941-000d3a34a532</value>
                      <value>b8a7505f-ac73-ec11-8941-000d3a34a532</value>
                    </condition>
                  </filter>
                </link-entity>
              </link-entity>
            </entity>
          </fetch>`;

      try {
        const ResourceTimeslotsResponse = await Xrm.WebApi.retrieveMultipleRecords(
          "mzk_resourcetimeslot",
          `?fetchXml=${encodeURIComponent(resourceTimeslots)}`
        );

        const eventsData = ResourceTimeslotsResponse.entities.map(event => ({
          Id: event.mzk_resourcetimeslotid,
          Subject: event.mzk_name,
          StartTime: new Date(event.mzk_from),
          EndTime: new Date(event.mzk_to),
          OwnerId: "a0ba1d19-90a7-ed11-aad0-6045bd038a21"
        }));

        setEventsData(eventsData);
      } catch (error) {
        console.error("Error fetching resource timeslots:", error);
      }
    };

    fetchData();
  }, []);
  
  // const data = [
  //   { Id: 1, Subject: 'Explosion of Betelgeuse Star', StartTime: new Date(2024, 5, 24, 2, 30), EndTime: new Date(2024, 5, 24, 3, 0), OwnerId: 2 },
  //   { Id: 2, Subject: 'Thule Air Crash Report', StartTime: new Date(2024, 5, 23, 3, 30), EndTime: new Date(2024, 5, 23, 4, 30), OwnerId: 1 },
  //   { Id: 3, Subject: 'Blue Moon Eclipse', StartTime: new Date(2024, 5, 24, 5, 30), EndTime: new Date(2024, 5, 24, 5, 45), OwnerId: 3 },
  //   { Id: 4, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 23, 6, 0), EndTime: new Date(2024, 5, 23, 6, 30), OwnerId: 1 },
  //   { Id: 5, Subject: 'Blue Moon Eclipse', StartTime: new Date(2024, 5, 24, 4, 0), EndTime: new Date(2024, 5, 24, 5, 0), OwnerId: 2 },
  //   { Id: 6, Subject: 'Explosion of Betelgeuse Star', StartTime: new Date(2024, 5, 25, 2, 30), EndTime: new Date(2024, 5, 24, 3, 0), OwnerId: 2 },
  //   { Id: 7, Subject: 'Thule Air Crash Report', StartTime: new Date(2024, 5, 26, 3, 30), EndTime: new Date(2024, 5, 26, 4, 30), OwnerId: 3 },
  //   { Id: 8, Subject: 'Blue Moon Eclipse', StartTime: new Date(2024, 5, 25, 1, 0), EndTime: new Date(2024, 5, 25, 1, 45), OwnerId: 2 },
  //   { Id: 9, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 24, 1, 0), EndTime: new Date(2024, 5, 24, 2, 0), OwnerId: 1 },
  //   { Id: 10, Subject: 'Blue Moon Eclipse', StartTime: new Date(2024, 5, 23, 1, 45), EndTime: new Date(2024, 5, 23, 2, 0), OwnerId: 2 },
  //   { Id: 11, Subject: 'Explosion of Betelgeuse Star', StartTime: new Date(2024, 5, 27, 2, 30), EndTime: new Date(2024, 5, 27, 3, 0), OwnerId: 3 },
  //   { Id: 12, Subject: 'Thule Air Crash Report', StartTime: new Date(2024, 5, 27, 3, 30), EndTime: new Date(2024, 5, 27, 4, 30), OwnerId: 3 },
  //   { Id: 13, Subject: 'Blue Moon Eclipse', StartTime: new Date(2024, 5, 27, 1, 0), EndTime: new Date(2024, 5, 27, 1, 45), OwnerId: 1 },
  //   { Id: 14, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 28, 1, 0), EndTime: new Date(2024, 5, 28, 1, 45), OwnerId: 1 },
  //   { Id: 15, Subject: 'Blue Moon Eclipse', StartTime: new Date(2024, 5, 27, 4, 45), EndTime: new Date(2024, 5, 27, 5, 0), OwnerId: 2 },
  //   { Id: 16, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 28, 1, 0), EndTime: new Date(2024, 5, 28, 1, 45), OwnerId: 1 },
  //   { Id: 17, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 23, 12, 0), EndTime: new Date(2024, 5, 23, 12, 45), OwnerId: 2 },
  //   { Id: 18, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 23, 1, 0), EndTime: new Date(2024, 5, 23, 1, 45), OwnerId: 3 },
  //   { Id: 19, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 23, 12, 0), EndTime: new Date(2024, 5, 23, 12, 45), OwnerId: 2 },
  //   { Id: 20, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 27, 2, 45), EndTime: new Date(2024, 5, 27, 3, 0), OwnerId: 2 },
  //   { Id: 21, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 29, 2, 45), EndTime: new Date(2024, 5, 29, 3, 0), OwnerId: 1 },
  //   { Id: 22, Subject: 'Meteor Showers in 2018', StartTime: new Date(2024, 5, 28, 2, 45), EndTime: new Date(2024, 5, 28, 3, 0), OwnerId: 3 }
  // ];

  const eventSettings = { dataSource: eventsData};
  const timeScale = { enable: true, interval: 60, slotCount: 6 };
  const group = { resources: ['Owners'] };

  const onPopupOpen = (args) => {
    // if (args.type === 'Editor' && !args.target.classList.contains('e-appointment')) {
    //   args.cancel = false;
    // }
    if (args.type === 'Editor' && args.data.Id) {
      args.cancel = true;
      setSelectedEvent(args.data);
    }
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <Row className="mt-3 justify-content-end">
        <Col>
          <Button variant="secondary" onClick={handleOpenRemoveModal} className="me-2 m-2">
            Remove
          </Button>
          <Button variant="secondary" onClick={() => console.log('Block Slot')} className="me-2 m-2">
            Block
          </Button>
        </Col>
      </Row>
      <div className="row">
        <div className="col-md-3">
          <Filter />
        </div>
        <div className="col-md-9">
      <ScheduleComponent
        height="550px"
        eventSettings={eventSettings}
        timeScale={timeScale}
        group={group}
        popupOpen={onPopupOpen}
        showQuickInfo={false}
        // enableAdaptiveUI={true}
        >
        <ViewsDirective>
          <ViewDirective option='Day' />
          <ViewDirective option='Week' />
          <ViewDirective option='WorkWeek' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <ResourcesDirective>
          <ResourceDirective
            field='OwnerId'
            title='Owner'
            name='Owners'
            allowMultiple={true}
            dataSource={ownerData}
            textField='OwnerText'
            idField='Id'
            colorField='OwnerColor'
          />
        </ResourcesDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
      </div>
      </div>
      {selectedEvent && <CustomPopup event={selectedEvent} onClose={closePopup} />}

    {/* Remove Slot Modal */}
      <Modal show={showRemoveModal} onHide={handleCloseRemoveModal}>
      <Modal.Header closeButton>
        <Modal.Title>Remove Slot</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="resource">
                <Form.Label>Resource</Form.Label>
                <Form.Control as="select" name="resource" value={formData.resource} onChange={handleInputChange}>
                  <option value="">Select Resource</option>
                  {/* Add options dynamically based on available resources */}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fromTime">
                <Form.Label>From Time</Form.Label>
                <Form.Control as="select" name="fromTime" value={formData.fromTime} onChange={handleInputChange}>
                  {/* Populate time options here */}
                  <option value="08:00 AM">08:00 AM</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="appointmentDate">
                <Form.Label>Appointment Date</Form.Label>
                <Form.Control type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleInputChange} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="toTime">
                <Form.Label>To Time</Form.Label>
                <Form.Control as="select" name="toTime" value={formData.toTime} onChange={handleInputChange}>
                  {/* Populate time options here */}
                  <option value="08:00 PM">08:00 PM</option>
                  <option value="09:00 PM">09:00 PM</option>
                  <option value="10:00 PM">10:00 PM</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleCloseRemoveModal} className="me-2">Cancel</Button>
              <Button variant="primary" onClick={handleSearch}>Search</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <table className="table">
                <thead>
                  <tr>
                    <th><Form.Check type="checkbox" /></th>
                    <th>Day</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Resource</th>
                    <th>Appointment Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr key={event.Id}>
                      <td><Form.Check type="checkbox" /></td>
                      <td>{event.Subject}</td>
                      <td>{event.StartTime.toLocaleDateString()}</td>
                      <td>{event.StartTime.toLocaleTimeString()}</td>
                      <td>{event.EndTime.toLocaleTimeString()}</td>
                      <td>{/* Resource name here */}</td>
                      <td>{/* Appointment type here */}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  </>
  );
};
export default App;
