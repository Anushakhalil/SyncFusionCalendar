const mockXrm = {
    WebApi: {
      retrieveMultipleRecords: async (entityLogicalName, fetchXml) => {
        console.log(`Mock retrieveMultipleRecords called with entity: ${entityLogicalName}, fetchXml: ${fetchXml}`);
        return { entities: [] }; // Return an empty array or mock data
      }
    }
  };
  
  export default mockXrm;
  